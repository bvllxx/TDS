import os
import subprocess
import requests

def download_file(url, filename):
    response = requests.get(url)
    if response.status_code == 200:
        with open(filename, 'wb') as file:
            file.write(response.content)
            print(f"Descargado: {filename}")
    else:
        print(f"No se pudo descargar el archivo de {url}")

def install_django():
    conda_url = "https://repo.anaconda.com/archive/Anaconda3-2023.09-0-Windows-x86_64.exe"
    download_file(conda_url, "node_setup.msi")
    subprocess.run(["/InstallationType=JustMe", "/RegisterPython=0", "/S","/D=%UserProfile%\Anaconda3"])
    os.remove("node_setup.msi")  # Elimina el archivo MSI después de la instalación
    print("Node.js instalado correctamente")

def install_nodejs():
    nodejs_url = "https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi"
    download_file(nodejs_url, "node_setup.msi")
    subprocess.run(["msiexec", "/i", "node_setup.msi", "/quiet", "/qn", "/norestart"])
    os.remove("node_setup.msi")  # Elimina el archivo MSI después de la instalación
    print("Node.js instalado correctamente")

if __name__ == "__main__":
    # Descargar e instalar Django
    install_django()

    # Descargar e instalar Node.js
    install_nodejs()


""" echo Descargando Anaconda...
curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-Windows-x86_64.exe

echo Descargando Node.js...
curl -O https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi """