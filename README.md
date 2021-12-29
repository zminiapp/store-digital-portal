# SDP Zalo Miniapp

An opensource repository for the purpose of creating Zalo mini applications for stores in Vietnam.

In the context that the COVID-19 pandemic is still spreading and leaving great consequences in Vietnam, the main features of the SDP application are to make it easier for customers to make medical declarations and show certificates of vaccination, and also can conveniently access stores' information such as wifi, payment, promotion or menus.

## Tech Stack

ReactJs, Zalo Miniapp Framework, Less, ViteJs.

## Folder Structure

```bash
├── node_modules
├── src
│   ├── assets
│   ├── components
│   │   ├── app.jsx             # Main component
│   ├── constants
│   │   ├── api.ts              # API endpoints
│   │   ├── index.ts
│   │   ├── interfaces.ts
│   ├── css                     # Initial and utility css
│   ├── hooks                   # Custom hooks to reuse logic
│   ├── modules
│   │   ├── **
│   │       ├── service         # API handles
│   │       ├── views           # UI implementations
│   ├── pages                   # Config pages in the application
│   ├── static                  # Html static files
│   ├── utils
│   │     ├── http.ts           # Network request handles
│   │     ├── index.ts          # Utility functions
│   │     ├── zalo.ts           # Interaction with Zalo App
│   ├── app.js                  # Starting point of the application
│   ├── config.js               # Config via env file
│   ├── store.js                # Centralized store for application states
├── www                         # Build folder
├── .gitignore
├── .prettierrc.json
├── app-config.json             # Config of Zalo Miniapp
├── index.html
├── jsonconfig.json
├── package.json
├── package-lock.json
├── postcss.config.json
├── README.md
├── vite.config.js
├── zmp-cli.json                # ZMP cli options
```

## Installation

-   Install ZMP CLI

-   Clone this repository

-   Install node-modules with npm or yarn

-   Start or Deploy the project

```bash
  npm install -g zmp-cli

  git clone ...

  npm install | yarn

  npm run start | yarn start (to run the project in your local browser)

  zmp deploy (you need to create your own miniapp to run this command)
```

## Environment Variables

To run this project, you will need to add the following environment variable to your .env files (.env.development or .env.production), this is the api endpoint for tracking click events in the application.

`VITE_BASE_API_URL` = https://zalo.cloud/miniapp

## Features

-   Required users to declare health state the first time he/she visits the store every day.
-   Greeting messages.
-   Show logo and infos of the store.
-   Make health declaration via official government website and show vaccinations certificates through Zalo QR wallet.
-   Optional features: Chat directly with the store via Zalo OA, make payment through digital wallets.
-   Wifi access.
-   Promotions and menus.

These above features infos are easily customized through the app-config json file.

## Screenshots

![App Screenshot 1](https://stc-oa.zdn.vn/uploads/6354d988bc428b1e2125eea9216afb78.jpg)
![App Screenshot 2](https://stc-oa.zdn.vn/uploads/aa5756917c6708be48cfe4b0adc2f694.jpg)

## Demo

Scan this QR code below to use the demo app.

![App QR Code](https://stc-oa.zdn.vn/uploads/a4c7e19a47a0d1ab6b6c99a96e62ffe9.png)

## Acknowledgements

-   [Zalo Mini App](https://mini.zalo.me/)

## Used By

This project is used by the following companies:

-   Annam Gourmet
-   Guardiant Vietnam
-   Pad Thai Restaurant
-   En Restaurant
-   Viettel Post
-   Vietnam Star Automobile
-   Saiko Sushi Restaurant
-   Cơm Tấm Kiều Giang
-   And many other customers ...

## Feedback

If you have any feedback, please reach out to us at https://zalo.me/4318657068771012646.

## Authors

-   Zalo Cloud Developers Team.
