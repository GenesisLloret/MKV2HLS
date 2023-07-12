async function generateAudioTracks(videoInput, ffmpeg, path, fs, audioTracks) {
    const videoName = path.basename(videoInput, path.extname(videoInput));
    let m3u8AudioContent = '';

    for (let i = 0; i < audioTracks.length; i++) {
      
        const audioDirectory = path.join(videoName, `audio${i}`);
        if (!fs.existsSync(videoName)) {
            fs.mkdirSync(videoName, { recursive: true });
        }
        if (!fs.existsSync(audioDirectory)) {
            fs.mkdirSync(audioDirectory);
        }
        await new Promise((resolve, reject) => {
            const command = ffmpeg()
                .input(videoInput)
                .inputOptions(['-hwaccel cuda'])
                .outputOptions([
                    `-map 0:a:${i}`,
                    '-vn',
                    '-acodec aac', 
                    '-ac 2',
                    '-f hls',
                    '-hls_time 2',
                    '-hls_list_size 0',
                    '-hls_segment_filename', path.join(audioDirectory, `audio${i}_%d.ts`),
                    '-hls_playlist_type', 'vod',
                ])
                .output(path.join(audioDirectory, `index.m3u8`))
                .on('error', reject)
                .on('end', resolve)
                .on('progress', (progress) => {console.log(`Progreso Audio ${i} ${audioTracks[i].language.toUpperCase()}: ${progress.percent}%`)})

            command.run();
        });
        m3u8AudioContent += `#EXT-X-MEDIA:TYPE=AUDIO,GROUP-ID="audio",NAME="${audioTracks[i].language.toUpperCase()}",URI="./audio${i}/index.m3u8",DEFAULT=${i === 0 ? 'YES' : 'NO'}\n`;
    }

    return m3u8AudioContent;
}

module.exports = { generateAudioTracks };
