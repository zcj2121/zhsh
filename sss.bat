@echo off
start http://zhsh.hrbfz.gov.cn/api/push/timepush
ping -n 30 127.0.0.1>nul
taskkill /f /im iexplore.exe
exit