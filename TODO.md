# TODO

- [x] Apply auth in edit-image endpoints
- [x] Apply auth in edit-meme endpoints

- [x] Use normal json instead of stringified json
- [ ] Use hashing instead of uuid for api token in auth
- [x] Change externalKey


- [x] Add a ratelimiter using https://github.com/animir/node-rate-limiter-flexible
- [ ] Update ratelimiter to consume user key intead of using ip
- [ ] Add a cron job to wipe out all canvasData every one week (prevent DB from using too much space)
- [x] Disable x-powered-by header
- [x] Use xss portection
- [ ] Add a request logger using discord webhook integration (Optional)
- [x] Use/Add cors, ~~helmet~~, and favicon
- [x] Test all endpoints if its all working with auth