# EEE Learning Platform

An interactive Electrical and Electronics Engineering learning platform featuring experiments, quizzes, and educational resources.

## Prerequisites

Before you begin, make sure you have the following installed:

-   [Node.js](https://nodejs.org/) (version 16 or newer recommended)

## Installation

### 1. Install pnpm

pnpm is a fast, disk space efficient package manager. Here's how to install it:

#### Recommended: Install pnpm v10 (Latest)

```bash
npm install -g pnpm@latest-10
```

#### Windows

```bash
# Using npm
npm install -g pnpm

# Using PowerShell Install Script
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

#### macOS/Linux

```bash
# Using npm
npm install -g pnpm

# Using curl
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

#### Using Chocolatey (Windows)

```bash
choco install pnpm
```

#### Using Homebrew (macOS)

```bash
brew install pnpm
```

### 2. Clone the repository (if applicable)

```bash
git clone [repository-url]
cd eeelearningplatform
```

### 3. Install dependencies

Navigate to the project directory and run:

```bash
pnpm install
```

## Running the Application

### Development Mode

To run the application in development mode with hot-reload:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

To build the application for production:

```bash
pnpm build
```

### Start Production Server

To start the production server after building:

```bash
pnpm start
```

## Features

-   Interactive EEE experiments
-   Quizzes and assessments
-   User progress tracking
-   Dark mode
-   Responsive design

## Technologies

-   Next.js
-   React
-   Tailwind CSS
-   Radix UI components
-   Three.js for 3D visualizations
-   NextAuth.js for authentication

## Project Structure

-   `/app`: Next.js app directory containing pages and API routes
-   `/components`: Reusable UI components
-   `/public`: Static assets
-   `/styles`: Global styles
-   `/lib`: Utility functions and helpers
-   `/hooks`: Custom React hooks
