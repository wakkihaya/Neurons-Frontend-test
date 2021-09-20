# Neurons Front-end Developer Coding Test

Specifications is in [SPECIFICATION.md](https://github.com/wakkihaya/Neurons-Frontend-test/blob/main/SPECIFICATION.md)

**You can access the app from [here](https://confident-hamilton-d23c79.netlify.app/).**

Demo GIF:
![Demo GIF](./demo.gif)

## Task board

All tasks are managed a Github project.

See:
https://github.com/wakkihaya/Neurons-Frontend-test/projects/1

## How to run

1. `yarn` to install all dependencies
2. `yarn start` to run the application, accessed by http://localhost:1234
3. `yarn storybook` to run storybook with components, accessed by http://localhost:6006
4. `yarn test` to test components.

## Tech stacks

- Typescript
- ReactJS
- SCSS/SASS
- Storybook
- Percel ( ~~CREATE-REACT-APP~~)
- Jest
- Prettier

- Netlify

## Architecture

The source directory has the architecture like this.

- `components`

  Common components applying Atomic design. Detail is in [this Wiki](https://github.com/wakkihaya/Neurons-Frontend-test/wiki/Atomic-Design-Patterns).

- `hooks`

  Managing APIs and helper functions.

- `models`

  Type declaration of common objects.

- `pages`

  Rendering Cast page and Episode page using `components`

- `styles`

  Common styles.

---

## Questionnaire

Please fill out this questionnaire and commit your answers to the repo

> - What is your preferred ReactJS stack today for building a modern SaaS application? What libraries and frameworks would be incl. And why?

I often use NextJS or React&Parcel for frontend development because it's easy and faster to build the initial environment. In particular, I would use NextJS with Vercel for a faster development. For backend, I use NestJS(or ExpressJS) with GraphQL (or RestAPI) because it can be written in TS/JS. Sometimes, I use Firebase as a BaaS because it has useful features, such as auth, DB, and functions, to develop speedy.

> - How would you approach an application where multiple products and multiple teams working across the application?

An application should have documents with important contents below so that all teams understand how it works with less time.

- How to run code
- Tech stacks
- The architecture including infrastructure, DB, frontend, and backend.
- Design specifications such as color code.

> - Design / UI Component system, How would you deal with that? Build one, use a framework (e.g Ant, Materiale UI, etc. ) and why your approach?

First of all, UI design should be unified in the phase of designing on Figma, etc. So, teams centered by designers should pick the framework most developers are familiar with. In my case, I often use Material UI.

In terms of UI component system, a company should have a unified design. So, especially in case that multiple teams or products get involved, we are recommended to have a monorepo to use the unified components. That's why atomic design, which I used for the project this time, is useful to manage components and do speedy development.

> - How to ensure good quality and high performance code?

To achieve good quality and high performance, I think we need to do at least four things.

First thing is to make code commits and PRs clear so other developers in a team can understand what you did or what your strategies were. Specifically, commits should be conducted frequently as you do something divided by `fix`, `update`, `refactor`, `add`. PRs should be created frequently as well.

Second thing is to refactor codes frequently. We can use Prettier and ESLint and so on for code formatter. We should write codes with the same format in a team.

Third thing is to do code reviews between developers. Code reviews help us know great strategies as well as understand how the app works. Even if you're a beginner, by reviewing others' codes and being reviewed your codes, you will be able to write high performance code gradually.

Last thing is to write readable codes. For example, as written in [The Art of Readable Code](oreilly.com/library/view/the-art-of/9781449318482/), we can write comment-out in codes for a difficult logic/function to understand.

> - Why is testing important, how would you embed it in a team and with what tools?

Testing is important because we can find out wrong points faster when we face problems. To achieve that, we should test for each function and component. Jest is known as a good testing library for JS/TS. Also, we can use Cypress, a framework for automating testing, and CI/CD such as Github Actions.
