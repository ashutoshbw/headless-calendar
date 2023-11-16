# Contributing Guidelines

Thank you for considering contributing to Headless Calendar! We appreciate your time and effort.

## How Can I Contribute?

### Reporting Bugs

If you find a bug, please open an issue on the [issue tracker](https://github.com/ashutoshbw/headless-calendar/issues) and provide as much information as possible.

### Suggesting Enhancements

If you have an idea for an enhancement, please open an issue on the [issue tracker](https://github.com/ashutoshbw/headless-calendar/issues) and outline your proposal. We welcome your suggestions!

### Code Contributions

#### Prerequisites

1. Git
2. Node(any version starting with 21.0.0 or greater)
3. pnpm(any version starting with 8.10.5 or greater)

#### Process

1. Fork the repository and clone it to your local machine.
2. Create a new branch for your changes: `git checkout -b the-name-of-my-branch`(replacing `the-name-of-my-branch` with a suitable name)
3. Install dependencies: `pnpm install`
4. Make your changes and add tests if applicable.
5. Run the tests: `pnpm test`
6. Before committing changes, generate a changeset to document modifications for effective tracking and communication. To create a changeset, run the following command: `pnpm changeset`.
7. After creating the changeset, commit your changes with a descriptive message: `git commit -am 'Add some feature'`.
8. Push your changes to your fork: `git push origin the-name-of-my-branch`.
9. Open a pull request against our main branch.

Please ensure your code adheres to the existing style conventions and is accompanied by tests.

#### Pull Request Guidelines

- Ensure changes adhere to project style and conventions.
- Craft clear commit messages and summarize changes in the pull request description.
- Verify that all tests pass and introduce new tests if needed.
- Update relevant documentation if your change requires it.
- Make sure your pull request addresses a single concern. If you have multiple changes, please submit them as separate pull requests.
- Please be patient! We will do our best to review your pull request as soon as possible.

Please note that this project is released with a [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.

Thank you for your contributions!
