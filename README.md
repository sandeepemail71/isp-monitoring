# isp-monitoring

## install speedtest-cli
https://serverspace.io/support/help/test-internet-connection-speed-ubuntu/


## to add scripts in crontab
```crontab -e
* * * * * /usr/bin/node /home/dev/isp-monitoring/pingScript.js >> /home/dev/isp-monitoring/ping.log 2>&1

0 * * * * /usr/bin/node /home/dev/isp-monitoring/speedtest.js >> /home/dev/isp-monitoring/speedtest.log 2>&1

0 0 1 * * rm /home/dev/isp-monitoring/ping.log

0 0 1 * * rm /home/dev/isp-monitoring/speedtest.log```