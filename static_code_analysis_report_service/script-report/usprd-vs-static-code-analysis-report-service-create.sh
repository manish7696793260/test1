#!/bin/bash

cd /etc/systemd/system

cat << EOF > usprd-vs-static-code-analysis-report.service
[Unit]
Description=usprd-vs-static-code-analysis-report-service

[Service]
User=root
WorkingDirectory=/data/usprd-vs-static-code-analysis-report/static_code_analysis_report_service
ExecStart=/bin/bash /data/usprd-vs-static-code-analysis-report/static_code_analysis_report_service/usprd-vs-static-code-analysis-report-script.sh
Restart=always

[Install]
WantedBy=multi-user.target
EOF

sleep 10

sudo systemctl daemon-reload

sleep 5

sudo systemctl start usprd-vs-static-code-analysis-report.service

sleep 5

sudo systemctl enable usprd-vs-static-code-analysis-report.service

