# Getting Started

## Prerequisites

Before starting, ensure you have the following installed on your system:

- **Git**: Version control system. You can download and install it from [here](https://git-scm.com/downloads).
- Install a code editor like [Visual Studio Code](https://code.visualstudio.com/).
- **GitHub**: Create a GitHub account [here](https://github.com/)

## Windows Users

If using a Windows Machine, it is recommended to use Windows Subsystem for Linux (WSL).

1. **Install WSL**: Follow the instructions [here](https://learn.microsoft.com/en-us/windows/wsl/install) to install WSL.

## Clone Repository

Open a terminal (WSL for Windows, Terminal for Mac and Linux) and clone the repository using the following command:

```bash
git clone git@github.com:craigtkhill/final-year-team-project.git
```

Change directory to the cloned repository:

```bash
cd final-year-team-project
```

## Install Bun and Next.js

1. **Install Bun**: Follow the instructions [here](https://bun.sh/docs/installation) to install the Bun package manager.

2. **Install Next.js**: In the project directory (`final-year-team-project`) install Next.js using Bun:

   ```bash
   bun add next
   ```

## Start Development

To start the development server, run the following command in your project directory:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

The page auto-updates as you edit files.

# Git Workflow for Development and Deployment

This guide outlines the git workflow for working with two branches: `dev` and `main`. Changes made to the `main` branch are pushed into production and affect the live website, provided they pass all tests. The `dev` branch is used for local development and to push changes to a dev server for review on a separate, non-public server.

## Initial Setup

1. **Check out the `dev` Branch**

   ```bash
   git checkout dev
   ```

## Workflow for Local Development

1. **Make Changes to Your Code**

2. **Stage the Changes**

   ```bash
   git add .
   ```

3. **Commit the Changes**

   ```bash
   git commit -m "Descriptive message about the changes"
   ```

4. **Pull the Latest Changes from `dev`**

   ```bash
   git pull origin dev
   ```

5. **Push Changes to the Remote `dev` Branch**

   ```bash
   git push origin dev
   ```

6. **Check Changes on the Remote Development Server**
   - Do this using Vercel (details below)

## Workflow for Deployment to Production

1. **Check out the `main` Branch**

   ```bash
   git checkout main
   ```

2. **Pull the Latest Changes from `main`**

   ```bash
   git pull origin main
   ```

3. **Merge the `dev` Branch into `main`**

   ```bash
   git merge dev
   ```

4. **Push Changes to the Remote `main` Branch**

   ```bash
   git push origin main
   ```

5. **Check Changes on the Live Website**
   - Do this using Vercel

### 1. Signing Up for Vercel

1. **Visit Vercel Website:**
   - Go to [Vercel](https://vercel.com/) and sign up.

### 2. Viewing Deployment Status

#### For Production and Development

1. **Deployment Dashboard:**

   - In the Vercel dashboard, select your project to view its details.
   - You will see the "Deployments" tab where all deployments (both production and development) are listed.

2. **Branch Deployments:**

   - Vercel automatically deploys every branch of your repository.
   - Production branches (`main`) are highlighted separately.
   - Development branches will have preview URLs that you can share and test.
   - The free tier plan on Vercel allows only up to 2 team members to access the development server.

3. **Checking Status:**
   - Each deployment will have a status indicator (e.g., building, ready, error).
   - Click on any deployment to view detailed logs and status.

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
