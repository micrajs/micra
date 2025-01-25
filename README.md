<p align="center">
  <img src="https://github.com/micrajs/micra/blob/latest/docs/assets/micra-logo.png" />
</p>

<h1 align="center">Micra</h1>

<p align="center">
  <a href="https://github.com/micrajs/micra/blob/latest/docs">Documentation</a> •
  <a href="https://github.com/micrajs/micra/blob/latest/CONTRIBUTING.md">Contributing</a> •
  <a href="https://github.com/micrajs/micra/blob/latest/CODE_OF_CONDUCT.md">Code of Conduct</a>
</p>

<p align="center">
  <img alt="issues" src="https://img.shields.io/github/issues-search/micrajs/micra?color=%23F3626C&label=Issues&logo=github&query=is%3Aopen" />
  <img alt="prs" src="https://img.shields.io/github/issues-pr/micrajs/micra?color=%23F3626C&label=Pull%20requests&logo=github" />
</p>

## About

Micra's monorepo

## Development

### Code Quality

#### Linting

```bash
pnpm check
```

#### Auto Formatting

```bash
pnpm format
```

### Versioning

#### Creating a Changeset

Whenever a change is made to one of the packages, a changeset should be created. This can be done by running:

```bash
pnpm version:bump
```

### Scaffolding

This monorepo is setup with scaffolding capabilities. To scaffold, run:

```bash
pnpm generate {generator}
```

#### Scaffold an New Framework Specification

```bash
pnpm generate spec
```

#### Creating a Custom Generator

To create a custom generator, edit the `./turbo/generators/config.ts` file and add a new generator via the `plop.setGenerator` method. Under the hood, we use [Turborepo's gen](https://turbo.build/repo/docs/guides/generating-code) package which uses [Plop](https://plopjs.com/documentation/) to generate files. Take a look at their documentation to learn more about how to create custom generators. To write your code, make sure to check out the `./turbo/generators/utilities` folder for helper functions.

## Contributors

- [Olavo Amorim Santos](https://github.com/olavoasantos)
