#!/bin/bash

cd /etc/systemd/system

cat << EOF > usstg-vs-static-code-analysis-report.service
[Unit]
Description=usstg-vs-static-code-analysis-report-service

[Service]
User=root
WorkingDirectory=/data/usstg-vs-static-code-analysis-report/static_code_analysis_report_service
ExecStart=/bin/bash /data/usstg-vs-static-code-analysis-report/static_code_analysis_report_service/usstg-vs-static-code-analysis-report-script.sh
Restart=always

[Install]
WantedBy=multi-user.target
EOF

sleep 10

sudo systemctl daemon-reload

sleep 5

sudo systemctl start usstg-vs-static-code-analysis-report.service

sleep 5

sudo systemctl enable usstg-vs-static-code-analysis-report.service

