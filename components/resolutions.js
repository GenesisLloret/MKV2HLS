async function resolutions(fs) {
    return new Promise((resolve, reject) => {
        let resolutions = [144, 240, 360, 480, 720, 1080, 1440, 2160, 4320]
        fs.readFile('metadata.json', 'utf8', (err, data) => {
            if (err) { resolve(false) }
            else {
                let metadata = JSON.parse(data)
                let originalResolution = metadata.videoTracks[0].height
                let resolucionesRenderizables = resolutions.filter(resolution => resolution <= originalResolution)
                if (!resolucionesRenderizables.includes(originalResolution)) { resolucionesRenderizables.push(originalResolution) }
                resolve(resolucionesRenderizables)
            }
        })
    })
}
module.exports = { resolutions }