@echo off

echo ----------------
echo 1 - call npm run apiServer
echo ----------------

set /P input="ENTER: "

if %input% == 1 (
	call npm run apiServer
)

echo ----------------

echo FINISHED

pause
