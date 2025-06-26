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
set alert DevOps@firminiq.com
#
set mail-format {
  from: DevOps@firminiq.com
  subject: monit alert --  $EVENT -- dev-vitalsight-report
  message: $EVENT Service $SERVICE
                Date:        $DATE
                Action:      $ACTION
                Host:        $HOST
                Description: $DESCRIPTION

                To Check status of usdev-vs-secret-manager service: systemctl status usdev-vs-secret-manager-caching.service
                To Check status of monit service: systemctl status monit.service
                To Check status of usdev-vs-static-code-analysis-report service: systemctl status usdev-vs-static-code-analysis-report
                To Check status of dev-vs-report service: systemctl status dev-vs-report                

                To start usdev-vs-secret-manager service: systemctl start usdev-vs-secret-manager-caching.service
                To start dev-vs-report service: systemctl start dev-vs-report
                To start monit.service service : systemctl start monit.service
                To start usdev-vs-static-code-analysis-report service: systemctl start usdev-vs-static-code-analysis-report

           Your faithful employee,
           Monit }
#
## Check custom program status output.
#
   check program dev-vs-report with path "/bin/systemctl --quiet is-active dev-vs-report.service"
    start program = "/bin/systemctl --quiet start dev-vs-report.service" with timeout 30 seconds
    stop program  = "/bin/systemctl --quiet stop  dev-vs-report.service"
    if status != 0 then restart
    alert DevOps@firminiq.com with reminder on 2 cycle


  check program usdev-vs-secret-manager-caching with path "/bin/systemctl --quiet is-active usdev-vs-secret-manager-caching.service"
    start program = "/bin/systemctl --quiet start usdev-vs-secret-manager-caching.service" with timeout 30 seconds
    stop program  = "/bin/systemctl --quiet stop  usdev-vs-secret-manager-caching.service"
    if status != 0 then restart
    alert DevOps@firminiq.com with reminder on 2 cycle
#

  check program usdev-vs-static-code-analysis-report with path "/bin/systemctl --quiet is-active usdev-vs-static-code-analysis-report.service"
    start program = "/bin/systemctl --quiet start usdev-vs-static-code-analysis-report.service" with timeout 30 seconds
    stop program  = "/bin/systemctl --quiet stop  usdev-vs-static-code-analysis-report.service"
    if status != 0 then restart
    alert DevOps@firminiq.com with reminder on 2 cycle
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
