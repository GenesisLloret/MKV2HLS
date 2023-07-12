async function generateTracksVideoHls(videoTrackInput, ffmpeg, path, fs, resolutions ) {
    let renderableResolutions = await resolutions(fs)
    const videoName = path.basename(videoTrackInput, path.extname(videoTrackInput))
    let m3u8Content = '\n'
    for (const resolution of renderableResolutions) {
        const videoDirectory = path.join(__dirname, '..', videoName)
        if (!fs.existsSync(videoDirectory)) {fs.mkdirSync(videoDirectory)}
        const resolutionDirectory = path.join(videoDirectory, `${resolution}`)
        if (!fs.existsSync(resolutionDirectory)) {fs.mkdirSync(resolutionDirectory)}
        await new Promise((resolve, reject) => {
            const command = ffmpeg()
                .input(videoTrackInput)
                .inputOptions(['-hwaccel cuda'])
                .outputOptions([
                    `-map 0:v:0`,
                    '-threads 0',
                    '-muxdelay 0',
                    '-vf', `yadif,scale=-1:${resolution}`,
                    '-pix_fmt yuv420p',
                    '-movflags +faststart',
                    '-r 25',
                    '-g 60',
                    '-refs 1',
                    '-vcodec libx264',
                    '-profile:v baseline',
                    '-scodec copy',
                    '-an',
                    '-f hls',
                    '-hls_time 2',
                    '-hls_list_size 0',
                    '-hls_segment_filename', path.join(resolutionDirectory, `video%d.ts`),
                    '-hls_playlist_type', 'vod',
                ])
                .output(path.join(resolutionDirectory, `index.m3u8`))
                .on('error', reject)
                .on('end',()=>{ 
                    m3u8Content += `#EXT-X-MEDIA:TYPE=VIDEO,GROUP-ID="video",NAME="Video ${resolution}",URI="./${resolution}/index.m3u8"\n#EXT-X-STREAM-INF:PROGRAM-ID=1, CODECS="avc1.4d4015,mp4a.40.2",AUDIO="audio",SUBTITLES="subs",RESOLUTION=AUTOx${resolution}, TAG="${resolution}p"\n./${resolution}/index.m3u8\n`
                    resolve()
                })
                .on('progress', (progress) => {console.log(`Progreso ${resolution}: ${progress.percent}%`)})
            command.run();
        });
    }
    return m3u8Content;
}
module.exports = { generateTracksVideoHls };