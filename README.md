# lambda-cloudflare-purge-cache

AWS Lambda function to purge Cloudflare cache for a zone.

Uses Node.js 6.10.2 runtime version.

The script first uses the list zones endpoint to get the zone identifier. Another request is then made to the purge all files endpoint.

## Local installation

1. Clone repo.
2. `cp .env-example .env`
3. Edit `.env` with your Cloudflare API key and email. If you are registered with Cloudflare, you can obtain your API key from the bottom of the "My Account" page, found here: [Go to My account](https://www.cloudflare.com/a/account).
4. `cp event.json-example event.json`
5. Edit `event.json` with the domain you wish to purge cache.
6. `npm install`
7. `source .env`
8. `npm run invoke`

## Cloudflare API documentation v4

* [List zones](https://api.cloudflare.com/#zone-list-zones)
* [Purge all files](https://api.cloudflare.com/#zone-purge-all-files)