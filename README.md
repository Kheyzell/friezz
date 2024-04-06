# Friezz 
**Quizz for friends**

Friezz is a fun app for making questionnaires with friends. You create quizzes, answer questions, guess your friends' answers, and see who knows who best. It's a game to get to know each other and share stories.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Contribute](#contribute)
- [Structure](#structure)
- [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Docker (to run the app in containers)
- Node.js
- PostgreSQL (only if not running in a docker container)

## Installation

Clone the repository:

``` bash
git clone https://github.com/kheyzell/Friezz.git
```

## Running the Project

There are three ways to run the project:

### Running the App in Docker Containers (easy way)

To run the entire application, including the frontend, backend, and database, in Docker containers, use the following command:

``` bash
npm run docker:watch
```


This command will start all services and watch for changes in the code for development purposes.

---

### Running the Database in Docker and the Client and Server Locally

If you prefer to run the database in a Docker container while running the client and server locally, follow these steps:

1. Start the PostgreSQL database and pgAdmin in Docker containers:

``` bash
npm run docker:start-db
```

2. Install the necessary packages:

``` bash
npm install
```

3. Create a `.env` file in the `./apps/server` folder with the following configuration:

``` plaintext
NODE_ENV=development

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_DATABASE=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=letmein
DATABASE_LOGGING=true
```

4. Start the client and server locally:

``` bash
npm start
```

---

### Running Everything Locally

To run the entire application locally, follow these steps:

1. Download and install PostgreSQL.
2. Create a new database for the application.
3. Install the necessary packages:

``` bash
npm install
```

4. Create a `.env` file in the `./apps/server` folder with the following configuration:

``` plaintext
NODE_ENV=development

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_DATABASE=<database name>
DATABASE_USERNAME=<username>
DATABASE_PASSWORD=<password>
DATABASE_LOGGING=true
```

5. Start the application:

``` bash
npm start
```


## Contribute

You can contribute multiple ways (even without technical skills):
  - [Reporting Bugs](docs/CONTRIBUTING.md#reporting-bugs)
  - [Suggesting Enhancements](docs/CONTRIBUTING.md#suggesting-enhancements)
  - [Your First Code Contribution](docs/CONTRIBUTING.md#your-first-code-contribution)
  - [Improving The Documentation](docs/CONTRIBUTING.md#improving-the-documentation)

For more details see [Contribution guidelines for this project](docs/CONTRIBUTING.md)

## Structure
<big><pre style="font-size: 14px;">
    root // Root directory. Contains many configuration files and all other folders
    ├── [apps](apps) // Contains all the packages necessary for the app as a monorepo
    |   └── [client](apps/client) // Frontend package [React.js]
    |   └── [common](apps/common) // Shared types and functions between packages
    |   └── [server](apps/server) // Backend package [NestJS]
    ├── [database](database) // Database related files (contains the database schema dump)
    └── [docs](docs) // Documentation files
</pre></big>


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
