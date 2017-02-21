# How to contribute

## Develop

To get started developing the library:

- install dependencies with `npm install`

Then you can either:

- `npm test`: runs tests
- `npm test -- --watch`: runs tests, re-runs them on code changes
- `npm run coverage`: runs tests and calculates code coverage
- `npm run lint`: runs the code linter

## Commit Message Format

Each commit message consists of a **header** and an optional **body**,
separated by an empty line.

#### Header

Format: `[type]: subject`.

**type** must have one of the following values:

* **feat**: a new feature
* **fix**: a bug fix
* **docs**: documentation only changes
* **style**: changes that do not affect the meaning of the code (white-space,
  formatting, missing semi-colons, etc)
* **refactor**: a code change that neither fixes a bug nor adds a feature
* **perf**: a code change that improves performance
* **test**: adding missing tests
* **chore**: changes to the build process or auxiliary tools and libraries such
  as documentation generation

**subject** is a succinct description of the change and:

* uses the imperative, present tense: "change" not "changed" nor "changes"
* doesn't capitalize the first letter
* has no dot (.) at the end

#### Body

Just as in the **subject**, use the imperative, present tense: "change" not
"changed" nor "changes". The body should include the motivation for the change
and contrast this with previous behavior.

#### Example

```
[chore]: dev environment setup

Add linter, add base dependencies.
```
