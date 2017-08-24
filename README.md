# Settings App Demo

A simple [InfernoJS](https://github.com/infernojs/inferno) app that saves user preferences, unapologetically trying to look as similar as possible to the user settings section over at [Fancy.com](https://fancy.com/).

I created this version as an example solution to show those who already completed the full-stack developer interview assignment.

You know who you are ;-)

### Usage

```bash
$ yarn install
$ yarn start
```

### Production Build

Comes out at less than 182kb for the entire app, including `babel-polyfill` but excluding source maps.

Inferno is truly *tiny*.

```bash
$ yarn build
yarn build v0.27.5
$ webpack -p --progress --config webpack.config.production.js
Production Build!
Hash: c78f8f59370b83c21842                                                              
Version: webpack 3.4.1
Time: 10440ms
                               Asset       Size  Chunks             Chunk Names
      vendor.3489048790f51469a354.js     143 kB       0  [emitted]  vendor
        main.7174ea9c4a272fbb2aa3.js    36.2 kB       1  [emitted]  main
    manifest.056ba04bc24fbc656255.js    1.48 kB       2  [emitted]  manifest
  vendor.3489048790f51469a354.js.map    1.22 MB       0  [emitted]  vendor
    main.7174ea9c4a272fbb2aa3.js.map     147 kB       1  [emitted]  main
manifest.056ba04bc24fbc656255.js.map    14.2 kB       2  [emitted]  manifest
                          index.html    1.27 kB          [emitted]  
                       manifest.json  320 bytes          [emitted]
```
