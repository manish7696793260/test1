#!/bin/bash

cd /etc/systemd/system

cat << EOF > usbeta-vs-static-code-analysis-report.service
[Unit]
Description=usbeta-vs-static-code-analysis-report-service

[Service]
User=root
WorkingDirectory=/data/usbeta-vs-static-code-analysis-report/static_code_analysis_report_service
ExecStart=/bin/bash /data/usbeta-vs-static-code-analysis-report/static_code_analysis_report_service/usbeta-vs-static-code-analysis-report-script.sh
Restart=always

[Install]
WantedBy=multi-user.target
EOF

sleep 10

sudo systemctl daemon-reload

sleep 5

sudo systemctl start usbeta-vs-static-code-analysis-report.service

sleep 5

sudo systemctl enable usbeta-vs-static-code-analysis-report.service

