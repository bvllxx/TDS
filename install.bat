@echo off

echo Descargando Node.js...
curl -O https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi

echo Instalando Node.js...
start /wait msiexec /i node-v20.10.0-x64.msi /quiet /qn /norestart

echo Version de node
call node -v

call conda env create -n venv -f venv.yml
call python manage.py makemigrations
call python manage.py migrate

cd app
call npm install

echo "Dependencias instaladas satisfactoriamente!"
pause
