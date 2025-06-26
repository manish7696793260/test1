#!/bin/bash

cd /etc/systemd/system

cat << EOF > usdev-vs-static-code-analysis-report.service
[Unit]
Description=usdev-vs-static-code-analysis-report-service

[Service]
User=root
WorkingDirectory=/data/usdev-vs-static-code-analysis-report/static_code_analysis_report_service
ExecStart=/bin/bash /data/usdev-vs-static-code-analysis-report/static_code_analysis_report_service/usdev-vs-static-code-analysis-report-script.sh
Restart=always

[Install]
WantedBy=multi-user.target
EOF

sleep 10

sudo systemctl daemon-reload

sleep 5

sudo systemctl start usdev-vs-static-code-analysis-report.service

sleep 5

sudo systemctl enable usdev-vs-static-code-analysis-report.service

