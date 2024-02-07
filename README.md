# Getting Started

## Windows Users

If using a Windows Machine, it is recommended to use Windows Subsytem for Linux. This ensures better compatibility with tools and environments, smoother operation of the development workflow, and a more consistent experience. Instructions for installing WSL can be found [here](https://learn.microsoft.com/en-us/windows/wsl/install).

## Clone Repository

In WSL or on the terminal for Mac and Linux, clone this repository using the following command:

```bash
git clone git@github.com:craigtkhill/final-year-team-project.git
```

Change directory to the cloned repository:

```bash
cd final-year-team-project
```

## Install Bun and Next.js

Install the Bun package manager following the instructions [here](https://bun.sh/docs/installation).

If Next.js is not installed, you can install it using the bun package manager. Run the following command in your project directory:

```bash
bun add next
```

## Start Development

Then, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Running Tests

To run your tests, execute the following command in your project directory:

```bash
bun test
```

Bun will automatically find and execute all test files in your project, displaying the results in the terminal.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
