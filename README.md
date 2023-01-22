# Wolfie.app
Wolfie.app is a pet companion Next.JS web application.

## Table of Contents
* [Official website](#official-website)
* [License](#license)
* [Authors](#authors)
* [Support](#support)
* [About the project](#about-the-project)
* [Technologies](#technologies)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Mobile](#mobile)
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Stages for Wolfie.app development:](#stages-for-wolfieapp-development-)
* [Technical stack](#technical-stack)
* [Why this is third iteration of the web project?](#why-this-is-third-iteration-of-the-web-project-)
    - [First Iteration — Proof of concept](#first-iteration---proof-of-concept)
    - [Second Iteration — First version of the application](#second-iteration---first-version-of-the-application)
    - [Third Iteration — Final version of the application](#third-iteration---final-version-of-the-application)

## Official website
* [Stable build](https://wolfie.app)
* [Development build](https://next.wolfie.app)
* [Doggo Open API](https://api.wolfie.app)

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Authors
* [**Amadeusz Blanik**](https://blanik.me) - Frontend, Mobile and Backend

## Support
If you want to support me, you can do it by buying me a tea:
[revolut](https://revolut.me/blanik)
or contributing to the project!

## About the project
I become lucky dog dad of Standard Schnauzer in 2022. Shortly, started to look for application to deal with my standard
dog things like taking care of her health, weight, feeding and heat.
It took out that there's no such an application. So, I thought that I can create one. I am a software developer, so why
not?
I believe in open-source and I want to share my work with the world. I hope that this application will be useful for
other dog owners.

Also, it was wonderful opportunity to learn more about SwiftUI, Nest.JS and great playground for testing some new technologies.

## Technologies
#### Frontend
* [Next.JS](https://nextjs.org/)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Styled Components](https://styled-components.com/)
* [TypeScript](https://www.typescriptlang.org/)

#### Backend
* [NestJS](https://nestjs.com/)
* [NodeJS](https://nodejs.org/en/)
* [TypeScript](https://www.typescriptlang.org/)
* [TypeORM](https://typeorm.io/#/)

#### Mobile
* [SwiftUI](https://developer.apple.com/xcode/swiftui/)

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
* [✅] Create a Next.JS application for the web application - On this stage it was more important to create quick and
  dirty prototype than to create a clean code.
* [✅] Publish early version of mobile application to the App Store
* [💻] Create a custom built-in UI library for the web application
* [💻] Create a clean-code version of the web application

**Legend:**

* [✅] - Done
- [💻] - In progress
- [ ] - Not started

### Summary
* Web application: Beta
* BME-UI: Beta
* Mobile application: Stable
* API: Stable

## Technical stack
- Next.JS 13 — Decided not to use new App directory structure, because it is still in beta and I don't want to deal with
  it. Also it's not fully supported by third party libraries yet.
- React 18
- Styled Components 5
- TypeScript 4.9
- bme-ui - Custom built-in UI library for the web application. It is still in development, but it is already used in
  this project.
- Redux - Best state management and data flow library for React.
- Jest / React Testing Library - Sadly need to skip for now, because of lack of time. I will come back to it later.

## Why this is third iteration of the web project?
#### First Iteration — Proof of concept
Tech stack:
* Angular 13
* Angular Material
* RxJS
* NgRX
* TypeScript

I wanted to create proof of concept as soon as possible. The code quality and tech stack was not important at this
stage. Angular was a good choice because of Angular Material, RxJS and NgRX it's allowed me to create working
application in two evenings. At this stage it was very simple application with:

* Dog profile
* Dog weight
* Dog vaccination

#### Second Iteration — First version of the application
Tech stack:
* Next.JS 12
* Styled components
* React Query
* TypeScript

Wolfie was and always will be my after hours projects. Due to lack of time I wanted to create something that will be
easy to maintain and extend. I decided to use Next.JS because of it's great support for SSR and TypeScript. I also
wanted to use React Query to handle data fetching and caching. I was not sure if I will use it, but I am quite content
that I did. At this stage it was mobile first (or even mobile only) web application. It quickly took out that I need
more time to keep finest code quality. Also there was Next.JS 13 behind the corner, so I decided to drop this version in
near future (as well I dropped code quality). Mobile version was a way more important at this stage.

At this stage I redesigned application features to:

* Dog profile
* Dog weight
* HealthLog (dog vaccination, regulation of breeding, external parasites, etc.)

#### Third Iteration — Final version of the application
* Next.JS 13
* Styled components
* Redux
* TypeScript

Best leisure time it's coding time or time with my dog (Wolfie.app was both!). During my Christmas break I decided to
rewrite application from scratch. I wanted to use Next.JS 13 app directory. Shortly it took out that app directory is
not ready for production. Mostly, due to lack of support by third party packages. This time code quality was important.
Sadly, I had to drop writing tests due to longer development time.

I decided to drop React Query and replace it with Redux. I tried to convince myself to React Queries for a long time,
but I was not happy with it. I wanted to have more control over data fetching and caching. I also wanted to have more
control over data flow. I decided to use Redux Toolkit to handle data flow. I am quite content with this decision.
