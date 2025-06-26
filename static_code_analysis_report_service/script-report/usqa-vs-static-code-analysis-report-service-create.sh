#!/bin/bash

cd /etc/systemd/system

cat << EOF > usqa-vs-static-code-analysis-report.service
[Unit]
Description=usqa-vs-static-code-analysis-report-service

[Service]
User=root
WorkingDirectory=/data/usqa-vs-static-code-analysis-report/static_code_analysis_report_service
ExecStart=/bin/bash /data/usqa-vs-static-code-analysis-report/static_code_analysis_report_service/usqa-vs-static-code-analysis-report-script.sh
Restart=always

[Install]
WantedBy=multi-user.target
EOF

sleep 10

sudo systemctl daemon-reload

sleep 5

sudo systemctl start usqa-vs-static-code-analysis-report.service

sleep 5

sudo systemctl enable usqa-vs-static-code-analysis-report.service

