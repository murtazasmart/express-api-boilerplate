# Boilerplate



# Git Workflow

Master branch is the main development branch. Do not commit directly to master branch.
Staging branch is for the staging environment which mimics production environment.

**TODO: figure out who, when and how to merge to staging branch**


Steps to contribute:

- Clone a local repo or if already cloned pull latest version with `git pull`
- Create a new feature branch for the work you're doing `git checkout -b feature-branch-name`
- Develop, Add, Commit as much as you like 😎 
- Once your feature is complete and all tests are passed, you can push your branch to bitbucket with `git push -u origin feature-branch-name`
- Goto bitbucket and create a new pull request to merge your feature branch
- Add a team member to review your pull request and ask to merge.

# Getting Started

- Install dependencies
```
npm install
```

- Build 
```
npm run build
```

# Folder Structure

| Name | Description |
| ------------------------ | ----------------------------------------------------------------- |
| **dist**                 | Contains the distributable from the TypeScript build.             |
| **src**                  | Contains source code that will be compiled to the dist dir   |                
| **test**                 | Contains tests                                                    |
| tsconfig.json            | Config settings for compiling TypeScript                          |
| tslint.json              | Config settings for TSLint code style checking                    |                          


# Linting

TSLint with recommended rules are used

- Run tslint 
```
npm run tslint
```
- Fix errors automatically 
```
npm run tslint:fix
```
## Rules

Uses [recommended rules](https://palantir.github.io/tslint/rules/) by TSLint.

- Use camelCase when naming objects, functions, and instances
- Use PascalCase only when naming constructors or classes.
- A base filename should exactly match the name of its default export.
- Use camelCase when you export-default a function. Your filename should be identical to your function’s name.
- Use PascalCase when you export a constructor / class / singleton / function library / bare object.
- Acronyms and initialisms should always be all capitalized, or all lowercased.

Adapted from [airbnb-styleguide](https://github.com/airbnb/javascript#naming-conventions)
