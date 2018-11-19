var appConfigDev = {
  apiLoc : 'https://staging-api.kyndor.com/', // Kyndor Dev server
  chatApiLoc : 'https://staging-chat.kyndor.com/', // Kyndor chat dev server name
  imgLoc : 'https://stagingkyndor.b-cdn.net/files/', // dev image location
}

var appConfigProd = {
  apiLoc : 'https://api.kyndor.com/', // Kyndor Prod server
  chatApiLoc : 'https://chat.kyndor.com/', // Kyndor chat Prod server name
  imgLoc : 'https://kyndor.b-cdn.net/files/' // prod image location
}

// var appConfig = appConfigDev // for dev
var appConfig = appConfigProd // for prod

module.exports = appConfig;
