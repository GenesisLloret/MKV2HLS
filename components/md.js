async function generateMetadata(v, ffmpeg, fs) {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(v, async function (err, metadata) {
            if (err) {
                reject(err)
            } else {
                var videoTracks = []
                var audioTracks = []
                var subtitleTracks = []
                for (const stream of metadata.streams) {
                    if (stream.codec_type === 'video' && stream.codec_name !== 'mjpeg') {
                        videoTracks.push({
                            width: stream.width,
                            height: stream.height,
                            display_aspect_ratio: stream.display_aspect_ratio,
                            r_frame_rate: stream.r_frame_rate
                        })
                    } else if (stream.codec_type === 'audio') {
                        const audioTrack = {
                            codec_name: stream.codec_name,
                            language: stream.tags?.language,
                            channels: stream.channels,
                            sample_rate: stream.sample_rate,
                            title: stream.tags?.title
                        }
                        audioTracks.push(audioTrack)
                    } else if (stream.codec_type === 'subtitle') {
                        const subtitleTrack = {
                            codec_name: stream.codec_name,
                            language: stream.tags?.language,
                            title: stream.tags?.title
                        }
                        subtitleTracks.push(subtitleTrack)
                    }
                }
                const data = {
                    videoTracks,
                    audioTracks,
                    subtitleTracks
                }
                const jsonData = JSON.stringify(data, null, 2)
                try {
                    fs.writeFile('metadata.json', jsonData, 'utf8', function (err) {
                        if (err) {reject(err)}
                        else {resolve ("Generado correctamente")}
                    })
                } catch (err) {
                    console.error(err)
                    reject(err)
                }
            }
        })
    })
}
module.exports = { generateMetadata }