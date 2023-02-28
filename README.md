# <div align="center"><img  src="https://user-images.githubusercontent.com/58886915/166198400-c2134044-1198-4647-a8b6-da9c4a204c68.svg" width="40"/> </br>Pingvin Share</div>

Pingvin Share is self-hosted file sharing platform and an alternative for WeTransfer.

## ✨ Features

- Share files using a link
- Unlimited file size (restricted only by disk space)
- Set an expiration date for shares
- Secure shares with visitor limits and passwords
- Email recipients
- Integration with ClamAV for security scans

## 🐧 Get to know Pingvin Share

- [Demo](https://pingvin-share.dev.eliasschneider.com)
- [Review by DB Tech](https://www.youtube.com/watch?v=rWwNeZCOPJA)

<img src="https://user-images.githubusercontent.com/58886915/167101708-b85032ad-f5b1-480a-b8d7-ec0096ea2a43.png" width="700"/>

## ⌨️ Setup

> Note: Pingvin Share is in its early stages and may contain bugs.

### Installation with Docker (recommended)

1. Download the `docker-compose.yml` file
2. Run `docker-compose up -d`

The website is now listening available on `http://localhost:3000`, have fun with Pingvin Share 🐧!

### Stand-alone Installation

Required tools:

- [Node.js](https://nodejs.org/en/download/) >= 14
- [Git](https://git-scm.com/downloads)
- [pm2](https://pm2.keymetrics.io/) for running Pingvin Share in the background

```bash
git clone https://github.com/stonith404/pingvin-share
cd pingvin-share

# Checkout the latest version
git fetch --tags && git checkout $(git describe --tags `git rev-list --tags --max-count=1`)

# Start the backend
cd backend
npm install
npm run build
pm2 start --name="pingvin-share-backend" npm -- run prod

# Start the frontend
cd ../frontend
npm install
npm run build
pm2 start --name="pingvin-share-frontend" npm -- run start
```

The website is now listening available on `http://localhost:3000`, have fun with Pingvin Share 🐧!

### Integrations

#### ClamAV (Docker only)

ClamAV is used to scan shares for malicious files and remove them if found.

1. Add the ClamAV container to the Docker Compose stack (see `docker-compose.yml`) and start the container.
2. Docker will wait for ClamAV to start before starting Pingvin Share. This may take a minute or two.
3. The Pingvin Share logs should now log "ClamAV is active"

Please note that ClamAV needs a lot of [ressources](https://docs.clamav.net/manual/Installing/Docker.html#memory-ram-requirements).

### Additional resources

- [Synology NAS installation](https://mariushosting.com/how-to-install-pingvin-share-on-your-synology-nas/)

### Upgrade to a new version

As Pingvin Share is in early stage, see the release notes for breaking changes before upgrading.

#### Docker

```bash
docker compose pull
docker compose up -d
```

#### Stand-alone

1. Remove the running app
   ```
   pm2 delete pingvin-share-backend pingvin-share-frontend
   ```
2. Repeat the steps from the [installation guide](#stand-alone-installation) except the `git clone` step.

## 🖤 Contribute

You're very welcome to contribute to Pingvin Share! Follow the [contribution guide](/CONTRIBUTING.md) to get started.
