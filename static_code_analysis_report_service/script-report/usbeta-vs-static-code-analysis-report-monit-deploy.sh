#!/bin/bash

cd /etc/monit/

cat <<\EOF > monitrc
## Start Monit in the background (run as a daemon):
#
  set daemon 60            # check services at 1-minute intervals
#   with start delay 240    # optional: delay the first check by 4-minutes (by
#                           # default Monit check immediately after Monit start)
#
#
## Set syslog logging. If you want to log to a standalone log file instead,
## specify the full path to the log file
#
  set log /var/log/monit.log

  set idfile /var/lib/monit/id

  set statefile /var/lib/monit/state
#
set mailserver 127.0.0.1
  using TLSV1 with timeout 30 seconds
#
  set eventqueue
      basedir /var/lib/monit/events # set the base directory where events will be stored
      slots 100                     # optionally limit the queue size
#
set alert awsalert.staging@ohiomron.com
#
set mail-format {
  from: DevOps@firminiq.com
  subject: monit alert --  $EVENT -- beta-vitalsight-report
  message: $EVENT Service $SERVICE
                Date:        $DATE
                Action:      $ACTION
                Host:        $HOST
                Description: $DESCRIPTION
                
                To Check status of usbeta-vs-secret-manager service: systemctl status usbeta-vs-secret-manager-caching.service
                To Check status of monit service: systemctl status monit.service
                To Check status of usbeta-vs-static-code-analysis-report service: systemctl status usbeta-vs-static-code-analysis-report
                To Check status of beta-vs-report service: systemctl status beta-vs-report

                To start usbeta-vs-secret-manager service: systemctl start usbeta-vs-secret-manager-caching.service
                To start beta-vs-report service: systemctl start beta-vs-report
                To start monit.service service : systemctl start monit.service
                To start usbeta-vs-static-code-analysis-report service: systemctl start usbeta-vs-static-code-analysis-report                


           Your faithful employee,
           Monit }
#
## Check custom program status output.
# 

   check program beta-vs-report with path "/bin/systemctl --quiet is-active beta-vs-report.service"
    start program = "/bin/systemctl --quiet start beta-vs-report.service" with timeout 30 seconds
    stop program  = "/bin/systemctl --quiet stop  beta-vs-report.service"
    if status != 0 then restart
    alert awsalert.staging@ohiomron.com with reminder on 2 cycle


  check program usbeta-vs-secret-manager-caching with path "/bin/systemctl --quiet is-active usbeta-vs-secret-manager-caching.service"
    start program = "/bin/systemctl --quiet start usbeta-vs-secret-manager-caching.service" with timeout 30 seconds
    stop program  = "/bin/systemctl --quiet stop  usbeta-vs-secret-manager-caching.service"
    if status != 0 then restart
    alert DevOps@firminiq.com with reminder on 2 cycle
#

  check program usbeta-vs-static-code-analysis-report with path "/bin/systemctl --quiet is-active usbeta-vs-static-code-analysis-report.service"
    start program = "/bin/systemctl --quiet start usbeta-vs-static-code-analysis-report.service" with timeout 30 seconds
    stop program  = "/bin/systemctl --quiet stop  usbeta-vs-static-code-analysis-report.service"
    if status != 0 then restart
    alert awsalert@ohiomron.com with reminder on 2 cycle
#
#
   include /etc/monit/conf.d/*
   include /etc/monit/conf-enabled/*
#
EOF

monit -t

sleep 5

monit reload

systemctl restart monit.service

systemctl enable monit.service
