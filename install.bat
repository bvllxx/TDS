@echo off

:: Ruta del archivo .yml (actualízala con la ruta correcta)
set YAML_FILE=venv.yml

:: Crear el entorno virtual 'venv' desde el archivo .yml
conda env create -n venv -f %YAML_FILE%

:: Verificar que el entorno se haya creado correctamente
if %errorlevel% equ 0 (
    echo Entorno virtual 'venv' creado exitosamente.
) else (
    echo Error al crear el entorno virtual.
)

pause
