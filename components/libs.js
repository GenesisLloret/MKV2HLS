const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const path = require('path')
const {generateMetadata} = require('./md.js')
const {readMetadata} = require('./reader.js')
const {generateTracksVideoHls} = require('./generateTracksVideoHls.js')
const {resolutions} = require('./resolutions.js')
const {generateAudioTracks} = require('./generateAudioTracks.js')

module.exports = {
  ffmpeg,
  fs,
  path,
  generateMetadata:generateMetadata,
  readMetadata:readMetadata,
  generateTracksVideoHls:generateTracksVideoHls,
  resolutions:resolutions,
  generateAudioTracks:generateAudioTracks,
}