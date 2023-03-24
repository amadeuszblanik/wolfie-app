# Wolfie.app
A Next.JS pet companion web application for dog owners.

## Table of Contents
1. [Official website](#official-website)
2. [License](#license)
3. [Authors](#authors)
4. [Support](#support)
5. [About the project](#about-the-project)
6. [Technologies](#technologies)
7. [Installation](#installation)
8. [Usage](#usage)
9. [Contributing](#contributing)
10. [Development stages](#development-stages)
11. [Summary](#summary)
12. [Technical Stack](#technical-stack)
13. [Web Project Iterations](#web-project-iterations)

## Official website
* [Stable build](https://wolfie.app)
* [Development build](https://next.wolfie.app)
* [Doggo Open API](https://api.wolfie.app)

## License
[GPL v3](https://github.com/amadeuszblanik/wolfie-app/blob/main/licence)

## Authors
* [**Amadeusz Blanik**](https://blanik.me) - Frontend, Mobile, and Backend

## Support
Support me by buying me a tea or contributing to the project:
[Revolut](https://revolut.me/blanik)

## About the project
After becoming a proud dog dad of a Standard Schnauzer in 2022, I searched for an application to help me manage standard dog care tasks such as health, weight, feeding, and heat tracking. Since I couldn't find a suitable app, I decided to create one as an open-source project, hoping it would be useful for other dog owners.

Additionally, this project provided a great opportunity to learn more about SwiftUI, Nest.JS, and test new technologies.

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

Feel free to contact me with suggestions or ideas:
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

## Development stages
* [✅] Create a Nest.JS application for the API (not published due to security reasons)
* [✅] Create a proof of concept web application based on Angular
* [✅] Decide on the final technology stack
* [✅] Create a Next.JS application for the web application (prioritizing a quick prototype over clean code)
* [✅] Publish early version of mobile application to the App Store
* [💻] Develop a custom built-in UI library for the web application
* [💻] Create a clean-code version of the web application

**Legend:**
* [✅] - Done
* [💻] - In progress
* [ ] - Not started

### Summary
* Web application: Beta
* BME-UI: Beta
* Mobile application: Stable
* API: Stable

## Technical Stack
- Next.JS 13 (avoided new App directory structure due to beta status and limited third-party library support)
- React 18
- Styled Components 5
- TypeScript 4.9
- bme-ui (custom built-in UI library for the web application, in development but already used in this project)
- Redux (state management and data flow library for React)
- Jest / React Testing Library (skipped for now due to time constraints, but will revisit later)

## Web Project Iterations
#### First Iteration — Proof of Concept
Tech stack:
* Angular 13
* Angular Material
* RxJS
* NgRX
* TypeScript

Focused on creating a proof of concept as quickly as possible. Code quality and tech stack were secondary concerns. Angular was chosen for its integration with Angular Material, RxJS, and NgRX, which allowed for rapid development. The initial application included:

* Dog profile
* Dog weight
* Dog vaccination

#### Second Iteration — First Version of the Application
Tech stack:
* Next.JS 12
* Styled components
* React Query
* TypeScript

Wolfie was designed as an after-hours project. The goal was to create an easy-to-maintain and extendable application. Next.JS was chosen for its SSR and TypeScript support. React Query was used for data fetching and caching. This iteration prioritized a mobile-first design. Due to limited time and the upcoming Next.JS 13 release, code quality was deprioritized. Features were redesigned to include:

* Dog profile
* Dog weight
* HealthLog (dog vaccination, breeding regulation, external parasites, etc.)

#### Third Iteration — Final Version of the Application
Tech stack:
* Next.JS 13
* Styled components
* Redux
* TypeScript

During a break, the application was rewritten from scratch. The initial plan was to use the Next.JS 13 app directory, but it was found to be unsuitable for production due to limited third-party package support. Code quality was prioritized, but tests were postponed due to development time. React Query was replaced with Redux to gain more control over data fetching, caching, and data flow. Redux Toolkit was used for managing data flow, and the switch has been satisfactory.
