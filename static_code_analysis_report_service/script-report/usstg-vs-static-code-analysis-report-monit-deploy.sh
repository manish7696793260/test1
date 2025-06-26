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
  subject: monit alert --  $EVENT -- stg-vitalsight-report
  message: $EVENT Service $SERVICE
                Date:        $DATE
                Action:      $ACTION
                Host:        $HOST
                Description: $DESCRIPTION

               
                To Check status of usstg-vs-secret-manager service: systemctl status usstg-vs-secret-manager-caching.service
                To Check status of monit service: systemctl status monit.service
                To Check status of usstg-vs-static-code-analysis-report service: systemctl status usstg-vs-static-code-analysis-report
                To Check status of stg-vs-report service: systemctl status stg-vs-report

                To start usstg-vs-secret-manager service: systemctl start usstg-vs-secret-manager-caching.service
                To start stg-vs-report service: systemctl start stg-vs-report
                To start monit.service service : systemctl start monit.service
                To start usstg-vs-static-code-analysis-report service: systemctl start usstg-vs-static-code-analysis-report

           Your faithful employee,
           Monit }
#
## Check custom program status output.
#
   check program stg-vs-report with path "/bin/systemctl --quiet is-active stg-vs-report.service"
    start program = "/bin/systemctl --quiet start stg-vs-report.service" with timeout 30 seconds
    stop program  = "/bin/systemctl --quiet stop  stg-vs-report.service"
    if status != 0 then restart
    alert awsalert.staging@ohiomron.com with reminder on 2 cycle

  check program usstg-vs-secret-manager-caching with path "/bin/systemctl --quiet is-active usstg-vs-secret-manager-caching.service"
    start program = "/bin/systemctl --quiet start usstg-vs-secret-manager-caching.service" with timeout 30 seconds
    stop program  = "/bin/systemctl --quiet stop  usstg-vs-secret-manager-caching.service"
    if status != 0 then restart
    alert awsalert.staging@ohiomron.com with reminder on 2 cycle
#

  check program usstg-vs-static-code-analysis-report with path "/bin/systemctl --quiet is-active usstg-vs-static-code-analysis-report.service"
    start program = "/bin/systemctl --quiet start usstg-vs-static-code-analysis-report.service" with timeout 30 seconds
    stop program  = "/bin/systemctl --quiet stop  usstg-vs-static-code-analysis-report.service"
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
