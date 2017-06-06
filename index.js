const rp = require('request-promise')
const apiKey = process.env.API_KEY
const email = process.env.EMAIL

// https://api.cloudflare.com/#zone-list-zones
const getZoneId = name => {
  const options = {
    url: 'https://api.cloudflare.com/client/v4/zones',
    headers: {
      'X-Auth-Email': email,
      'X-Auth-Key': apiKey,
      'Content-Type': 'application/json'
    },
    qs: {
      name: name,
      status: 'active'
    },
    json: true
  }
  return rp.get(options)
    .then(result => {
      return result.result[0].id
    })
    .catch(err => {
      console.error(err)
    })
}

// https://api.cloudflare.com/#zone-purge-all-files
const purgeCache = (zoneId) => {
  const options = {
    url: 'https://api.cloudflare.com/client/v4/zones/' + zoneId + '/purge_cache',
    headers: {
      'X-Auth-Email': email,
      'X-Auth-Key': apiKey
    },
    json: {
      'purge_everything': true
    }
  }
  return rp.delete(options)
}

exports.handler = (event, context, callback) => {
  process.stdout.write('listing zones ... ')
  getZoneId(event.name)
    .then(zoneId => {
      process.stdout.write('done\n')
      process.stdout.write('purge all files ... ')
      return purgeCache(zoneId)
    })
    .then(response => {
      process.stdout.write('done\n')
    })
    .catch(err => {
      process.stdout.write('error\n')
      console.log(err)
    })
}
