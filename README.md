<div align="center">
  <img src="https://raw.githubusercontent.com/Neko250/ionic-agenda/master/src/assets/imgs/logo.png" width="25%">
</div>

<h1 align="center">ionic-agenda</h1>

<div align="center">

[![__status__](https://img.shields.io/website-up-down-green-red/https/neko250.github.io/ionic-agenda.svg?label=status)](https://neko250.github.io/ionic-agenda/)
[![__maintenance__](https://img.shields.io/maintenance/yes/2018.svg)](https://github.com/neko250/ionic-agenda)
[![__version__](https://img.shields.io/github/package-json/v/neko250/ionic-agenda.svg)](https://github.com/neko250/ionic-agenda)
[![__size__](https://img.shields.io/github/languages/code-size/neko250/ionic-agenda.svg)](https://github.com/neko250/ionic-agenda)
[![__dependencies__](https://img.shields.io/david/neko250/ionic-agenda.svg)](https://github.com/neko250/ionic-agenda/blob/master/package.json)

contact management [pwa](https://developers.google.com/web/progressive-web-apps/) made with :black_heart: and ionic

<sup>:es: __agenda__ stands for __phonebook__ in spanish :es:</sup>

</div>

<br>

## :hammer: dev setup

install [node](https://nodejs.org), then run:

```bash
# install ionic globally
npm i -g ionic

# clone the repo
git clone https://github.com/neko250/ionic-agenda
cd ionic-agenda/

# install dependencies
npm i
```

## :computer: run dev server

```bash
ionic s -c
```

you can preview the app using __ionic devapp__, get it on:

- [google play store](https://play.google.com/store/apps/details?id=io.ionic.devapp&hl=en)
- [apple app store](https://itunes.apple.com/us/app/ionic-devapp/id1233447133?ls=1&mt=8)

## :bookmark: versioning

> :warning: use __[semver](https://semver.org)__

update `package.json` version and `CHANGELOG.md`, then run:

```bash
git tag <major>.<minor>.<patch>
git push origin <major>.<minor>.<patch>
```

## :rocket: build and deploy

```bash
ionic build --prod
npm run deploy
```

## :newspaper: [changelog](https://github.com/Neko250/ionic-agenda/blob/master/CHANGELOG.md)
