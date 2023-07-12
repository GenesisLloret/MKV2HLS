const { 
    ffmpeg,
    fs, 
    path, 
    generateMetadata, 
    readMetadata, 
    generateTracksVideoHls, 
    generateAudioTracks, 
    resolutions 
} = require('./components/libs.js')
const vid = process.argv[2]

generateMetadata(vid, ffmpeg, fs)
    .then(metadata => {
        console.log(metadata)
        return readMetadata(fs)
    })
    .then(rmd => {
        console.log(rmd)
        const audioTracks = JSON.parse(rmd).audioTracks
        return generateAudioTracks(vid, ffmpeg, path, fs, audioTracks)
    })
    .then(m3u8AudioContent => {
        console.log("Successfully generated HLS files for all audio tracks.")
        return generateTracksVideoHls(vid, ffmpeg, path, fs, resolutions)
            .then(m3u8VideoContent => [m3u8AudioContent, m3u8VideoContent])
    })
    .then(([m3u8AudioContent, m3u8VideoContent]) => {
        console.log("Successfully generated HLS files for all resolutions.")
        const m3u8Content = '#EXTM3U\n#EXT-X-VERSION:3\n' + m3u8AudioContent + m3u8VideoContent
        fs.writeFileSync(path.join(path.basename(vid, path.extname(vid)), 'index.m3u8'), m3u8Content)
    })
    .catch(error => console.error("Error generating HLS files: ", error))
