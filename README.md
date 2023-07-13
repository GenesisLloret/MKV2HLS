# MKV2HLS

Este es un proyecto de Node.js desarrollado con el objetivo de generar videos de reproducción bajo demanda.
Proporciona pasando un video, un fichero metadata de las pistas que tiene el original y renderiza __SOLAMENTE LAS PISTAS DE AUDIO Y VIDEO__

En un futuro, se creará una versión 2, donde incluya también los subtitulos.

---

## Requisitos previos a su uso

Antes de ejecutar la aplicación, asegúrate de tener instalado correctamente FFMPEG en su sistema, ya que utiliza la libreria `fluent-ffmpeg`, puedes consultar todo sobre esta librería en [este enlace](https://www.npmjs.com/package/fluent-ffmpeg).

---

## Instalación

0. Instalación de [FFMPEG](https://ffmpeg.org/) y en caso de tener una GPU de NVIDIA, también debe de instalar [CUDA ToolKit](https://developer.nvidia.com/cuda-toolkit), puedes aprender mas en [Developer NVIDIA FFMPEG ](https://developer.nvidia.com/ffmpeg)

1. Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/GenesisLloret/MKV2HLS.git
   ```

2. Navega hasta el directorio del proyecto:

   ```bash
   cd https://github.com/GenesisLloret/MKV2HLS.git
   ```

3. Instala las dependencias utilizando npm:

   ```bash
   npm install
   ```

---

## Configuración

Si usted no tiene instalado CUDA, o no quiere usar la GPU, deve comentar todas las lineas que contenga:

```.inputOptions(['-hwaccel cuda'])```

El listado de ficheros que tienen este linea són:
```
./components
│
│  ┌────────┐
├──┤línea 17├──» generateAudioTracks.js 
│  └────────┘
│  ┌────────┐
└──┤línea 13├──» generateTracksVideoHls.js
   └────────┘

```

---

## Uso

Para ejecutar el proyecto, sigue los siguientes pasos:

1. Asegúrate de estar ubicado en el directorio raíz del proyecto.

2. Ejecuta el siguiente comando:

   ```bash
   node index.js <video.mkv>
   ```

   Esto iniciará la conversión del video

