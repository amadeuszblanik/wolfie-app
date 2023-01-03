# Wolfie.app

_THIS APPLICATION IS IN DEVELOPMENT._

Wolfie.app is a pet companion Next.JS web application.

## Official website
* [Stable build](https://wolfie.app)
* [Development build](https://next.wolfie.app)
* [Doggo Open API](https://api.wolfie.app)


## License
[MIT](https://choosealicense.com/licenses/mit/)

## About the project
I become lucky dog dad of Standard Schnauzer in 2022. Shortly, started to look for application to deal with my standard dog things like taking care of her health, weight, feeding and heat.
It took out that there's no such an application. So, I thought that I can create one. I am a software developer, so why not?
I believe in open-source and I want to share my work with the world. I hope that this application will be useful for other dog owners.

Also, it was wonderful opportunity to learn more about SwiftUI and great playground for testing some new technologies.

I am open to any suggestions and ideas. If you have any, please contact me:
- [LinkedIn](https://www.linkedin.com/in/amadeuszblanik/)
- [Email](mailto:amadeusz@blanik.me)

## Installation
Use the package manager [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com) to install all dependencies.

For npm:
```bash
npm install
```

For yarn:
```bash
yarn install
```

## Usage
* `npm run dev` or `yarn dev` - starts the application in development mode.
* `npm run build` or `yarn build` - builds the application.
* `npm run start` or `yarn start` - starts the application in production mode.
* `npm run lint` or `yarn lint` - runs linter.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Stages for Wolfie.app development:
* [✅] Create a Nest.JS application for the API - Due to security reasons, I decided to not publish the API repository.
* [✅] Create a proof of concept web application based on Angular
* [✅] Decide about final technology stack
* [✅] Create a Next.JS application for the web application - On this stage it was more important to create quick and dirty prototype than to create a clean code.
* [✅] Publish early version of mobile application to the App Store
* [💻] Create a custom built-in UI library for the web application
* [ ] Create a clean-code version of the web application 

**Legend:**
* [✅] - Done
- [💻] - In progress
- [ ] - Not started

## Technical stack
- Next.JS 13 — Decided not to use new App directory structure, because it is still in beta and I don't want to deal with it. Also don't have time to deal with new React Server Components.
- React 18
- Styled Components 5 - Due to lack of time some components might not be fully rendered on server side, but it is not a big deal for now. I will refactor it later in the new bne-ui library version.
- TypeScript 4.9
- bme-ui - Custom built-in UI library for the web application. It is still in development, but it is already used in this project. Not published yet on NPM, but it will be soon.
- Redux / React Queries - Still not sure which one to use. I will decide later.
- Jest / React Testing Library - For unit testing. Might be skipped for now due to lack of time.
