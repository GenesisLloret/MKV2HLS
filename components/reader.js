async function readMetadata(fs) {
    return new Promise((resolve, reject) => {
        fs.readFile('metadata.json', 'utf8', function (err, data) {
            if (err) {reject(err)}
            else {resolve(data)}
        })
    })
}
module.exports = { readMetadata }