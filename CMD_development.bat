@echo off

echo ----------------
echo 1 - call npm run start
echo 2 - call npm run lint
echo 3 - call npm run lint-fix
echo 4 - call npm run test
echo ----------------

set /P input="ENTER: "

if %input% == 1 (
	call npm run start
)

if %input% == 2 (
	call npm run lint
)

if %input% == 3 (
	call npm run lint-fix
)

if %input% == 4 (
	call npm run test
)

echo ----------------

echo FINISHED

pause
