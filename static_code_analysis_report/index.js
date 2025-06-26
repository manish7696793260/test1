const { readFileSync, unlinkSync } = require('fs');
const CONSTANTS = require('./CONSTANTS');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { SESv2Client, SendEmailCommand: SendEmailCommandV2 } = require('@aws-sdk/client-sesv2');
const MailComposer = require('nodemailer/lib/mail-composer');
const sesV2 = new SESv2Client(CONSTANTS.CLIENT_CONFIG);
const s3Client = new S3Client(CONSTANTS.CLIENT_CONFIG);
const puppeteer = require('puppeteer');

const readFileFromS3 = async (bucketName, key) => {
	const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
	const response = await s3Client.send(command);

	// Convert the S3 object stream to a string
	const streamToString = (stream) =>
	  new Promise((resolve, reject) => {
			const chunks = [];
			stream.on('data', (chunk) => chunks.push(chunk));
			stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
			stream.on('error', reject);
	  });

	return streamToString(response.Body);
};

const getDateTime = () => {
	const now = new Date();
	const year = now.getFullYear();
	let month = now.getMonth() + 1;
	let day = now.getDate();
	let hour = now.getHours();
	let minute = now.getMinutes();
	let second = now.getSeconds();
	if (month.toString().length === 1) {
		month = CONSTANTS.ZERO + month;
	}
	if (day.toString().length === 1) {
		day = CONSTANTS.ZERO + day;
	}
	if (hour.toString().length === 1) {
		hour = CONSTANTS.ZERO + hour;
	}
	if (minute.toString().length === 1) {
		minute = CONSTANTS.ZERO + minute;
	}
	if (second.toString().length === 1) {
		second = CONSTANTS.ZERO + second;
	}
	const dateTime = year + CONSTANTS.HYPHEN + month + CONSTANTS.HYPHEN + day + CONSTANTS.HYPHEN + hour + 'h' + minute + 'm' + second + 's';
	return dateTime;
};

const { JSDOM } = require('jsdom');

const streamToBuffer = async (stream) => {
	return new Promise((resolve, reject) => {
		const chunks = [];
		stream.on('data', (chunk) => chunks.push(chunk));
		stream.on('error', reject);
		stream.on('end', () => resolve(Buffer.concat(chunks)));
	});
};

const getDate = (date) => {
	const fullDate = new Date(date);
	const options = { month: 'long', day: 'numeric', year: 'numeric' };
	return fullDate.toLocaleDateString('en-US', options);
};

const getEmailSubjectAndContent = async (errorInEslint, repoName) => {
	try {
		const getObjectParams = {
			Bucket: CONSTANTS.S3_BUCKET,
			Key: errorInEslint ? CONSTANTS.ERROR_S3_PATH : CONSTANTS.INFO_S3_PATH
		};

		const { Body } = await s3Client.send(new GetObjectCommand(getObjectParams));
		const bodyBuffer = await streamToBuffer(Body);
		const s3Data = bodyBuffer.toString('utf-8');

		const dom = new JSDOM(s3Data);
		const document = dom.window.document;

		const currentRegion = process.env.AWS_REGION || CONSTANTS.DEFAULT_REGION_CODE;
		const region = CONSTANTS.SUPPORTED_REGION[`${currentRegion}`] || CONSTANTS.DEFAULT_REGION;

		const subjectText = `${region} - ${CONSTANTS.ENV} - ${CONSTANTS.PROJECT} - ${repoName}`;

		const h2Element = document.querySelector('h2');
		let subject = h2Element ? h2Element.textContent.trim() : `${CONSTANTS.STATIC_CODE_ANALYSIS_REPORT}${CONSTANTS.FOR}${repoName}`;
		const subjectElement = document.querySelector('#subject');
		if (subjectElement) {
			if (errorInEslint) {
				subjectElement.textContent = `${region}-${CONSTANTS.ENV}-${CONSTANTS.ALERT_TYPE}-${CONSTANTS.PROJECT}-${repoName} - ${CONSTANTS.STATIC_CODE_ANALYSIS_REPORT_ERROR}`;
			} else {
				subjectElement.textContent = `${region}-${CONSTANTS.ENV}-${CONSTANTS.INFO_TYPE}-${CONSTANTS.PROJECT}-${repoName} - ${CONSTANTS.STATIC_CODE_ANALYSIS_REPORT}`;
			}
			subject = subjectElement.textContent;
		}

		const informationElement = document.querySelector('#information');
		if (informationElement) {
			informationElement.textContent = subjectText;
		}
		const dateElement = document.querySelector('#date');
		if (dateElement) {
			dateElement.textContent = getDate(Date.now());
		}

		const content = document.documentElement.outerHTML;

		return { subject, content };
	} catch (error) {
		console.error('Error extracting subject and content from HTML:', error);
		throw error;
	}
};

const sendEmail = async (errorInEslint, pdfName, repoName, fileName) => {
	try {
		console.log('Sending email with lint report...');
		const { subject, content } = await getEmailSubjectAndContent(errorInEslint, repoName);

		const mailOptions = {
			from: CONSTANTS.SENDER_EMAIL,
			subject: subject,
			html: content,
			to: CONSTANTS.RECIPIENT_EMAIL,
			cc: CONSTANTS.CC_EMAILS,
			attachments: [
				{
					filename: `${CONSTANTS.STATIC_CODE_ANALYSIS_REPORT}${CONSTANTS.HYPHEN}${repoName}${CONSTANTS.HYPHEN}${getDate(Date.now())}.pdf`,
					path: fileName,
					cid: pdfName
				}
			]
		};

		const rawData = await new MailComposer(mailOptions).compile().build();

		const params = {
			Destination: {
				ToAddresses: [CONSTANTS.RECIPIENT_EMAIL],
				CcAddresses: CONSTANTS.CC_EMAILS
			},
			Content: { Raw: { Data: rawData } },
			FromEmailAddress: CONSTANTS.SENDER_EMAIL,
			ReplyToAddresses: [CONSTANTS.SENDER_EMAIL]
		};
		const sendEmailCommand = new SendEmailCommandV2(params);
		const mailSent = await sesV2.send(sendEmailCommand);
		console.log('Email sent:', mailSent.MessageId);
	} catch (error) {
		console.error(CONSTANTS.ERROR_CODES.SEND_EMAIL_ERROR, error);
		throw error;
	}
};

const generateReport = async (s3Key) => {
	try {
		const currentDate = getDateTime();
		let lintHtmlReport;
		let pdfName = `${CONSTANTS.PDF_NAME}-${currentDate}.pdf`;
		let repoName;
		if (s3Key) {
			lintHtmlReport = await readFileFromS3(CONSTANTS.S3_BUCKET, s3Key);
			repoName = s3Key.split('/')[2];
			pdfName = `${repoName} ${CONSTANTS.REPORT}-${currentDate}.pdf`;
		} else {
			lintHtmlReport = readFileSync(CONSTANTS.STATIC_CODE_REPORT_HTML_PATH, 'utf8');
			repoName = CONSTANTS.REPO_NAME;
		}
		if (!lintHtmlReport) {
			return {
				success: false,
				message: CONSTANTS.ERROR_MESSAGE.NO_FILE_FOUND
			};
		}

		const browser = await puppeteer.launch({
			args: ['--no-sandbox'],
			headless: 'new'
		});
		const page = await browser.newPage();

		await page.setContent(lintHtmlReport, {
			waitUntil: 'load'
		});
		let errorInEslint = false;
		const h1 = await page.evaluateHandle(() =>
			document.querySelector('h1')
		);
		const resultHandle = await page.evaluateHandle(body => body.innerHTML, h1);
		const res = await resultHandle.jsonValue();

		if (res.includes('error')) {
			errorInEslint = true;
		}
		const fileName = `${Date.now()}.pdf`;
		await page.pdf({
			path: fileName,
			format: 'A3',
			printBackground: true
		});

		// Wait for PDF generation to complete before closing the browser
		await browser.close();
		const data = readFileSync(fileName);
		const params = {
			Bucket: CONSTANTS.S3_BUCKET,
			Key: `${CONSTANTS.STATIC_CODE_REPORT}/${repoName}/${pdfName}`,
			Body: data,
			ContentType: 'application/pdf'
		};
		const command = new PutObjectCommand(params);
		await s3Client.send(command);
		if (errorInEslint || +CONSTANTS.ALWAYS_SEND === 1) {
    		await sendEmail(errorInEslint, pdfName, repoName, fileName);
		}
		unlinkSync(fileName);

		return {
			success: true
		};
	} catch (error) {
		console.error(CONSTANTS.ERROR_CODES.UPLOAD_TO_S3_ERROR, error);

		return {
			success: false,
			message: error
		};
	}
};

exports.generateReport = generateReport;
