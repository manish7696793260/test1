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
  subject: monit alert --  $EVENT -- qa-vitalsight-report
  message: $EVENT Service $SERVICE
                Date:        $DATE
                Action:      $ACTION
                Host:        $HOST
                Description: $DESCRIPTION

                
                To Check status of usqa-vs-secret-manager service: systemctl status usqa-vs-secret-manager-caching.service
                To Check status of monit service: systemctl status monit.service
                To Check status of usqa-vs-static-code-analysis-report service: systemctl status usqa-vs-static-code-analysis-report
                To Check status of qa-vs-report service: systemctl status qa-vs-report

                To start usqa-vs-secret-manager service: systemctl start usqa-vs-secret-manager-caching.service
                To start qa-vs-report service: systemctl start qa-vs-report
                To start monit.service service : systemctl start monit.service
                To start usqa-vs-static-code-analysis-report service: systemctl start usqa-vs-static-code-analysis-report              
 
           Your faithful employee,
           Monit }
#
## Check custom program status output.
#
   check program qa-vs-report with path "/bin/systemctl --quiet is-active qa-vs-report.service"
    start program = "/bin/systemctl --quiet start qa-vs-report.service" with timeout 30 seconds
    stop program  = "/bin/systemctl --quiet stop  qa-vs-report.service"
    if status != 0 then restart
    alert DevOps@firminiq.com with reminder on 2 cycle


  check program usqa-vs-secret-manager-caching with path "/bin/systemctl --quiet is-active usqa-vs-secret-manager-caching.service"
    start program = "/bin/systemctl --quiet start usqa-vs-secret-manager-caching.service" with timeout 30 seconds
    stop program  = "/bin/systemctl --quiet stop  usqa-vs-secret-manager-caching.service"
    if status != 0 then restart
    alert DevOps@firminiq.com with reminder on 2 cycle
#

  check program usqa-vs-static-code-analysis-report with path "/bin/systemctl --quiet is-active usqa-vs-static-code-analysis-report.service"
    start program = "/bin/systemctl --quiet start usqa-vs-static-code-analysis-report.service" with timeout 30 seconds
    stop program  = "/bin/systemctl --quiet stop  usqa-vs-static-code-analysis-report.service"
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
