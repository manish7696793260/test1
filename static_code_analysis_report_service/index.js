
const dotenv = require('dotenv');
const express = require('express');
dotenv.config({ path: './.env' });
const staticCodeAnalysisReport = require('static_code_analysis_report');
const CONSTANTS = require('./CONSTANTS');

const app = express();
app.use(express.json());

app.post('/generate-report', async (req, res) => {
	try {
		console.log('Received request to generate report', req.body.key);

		const key = req.body.key;
		console.log('Key is coming:', key);

		const report = await staticCodeAnalysisReport.generateReport(key);

		if (report.success) {
			res.status(200).json(report);
		} else {
			res.status(500).json(report);
		}
	} catch (error) {
		console.error('Error generating report:::', error);

		res.status(500).json({ success: false, message: error });
	}
});

// Start the Express server on port 7071
const PORT = CONSTANTS.PORT;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
