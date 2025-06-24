# Product Catalog

A full-stack product catalog application with a **backend** (Spring Boot), **frontend** (React with Vite). The project is containerized with Docker and managed using a `Makefile`.

---

## Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Make](https://www.gnu.org/software/make/)

---

## Quick Start

### Start Development Environment

```bash
make run-dev
```

### This will:

- Start the backend on http://localhost:8080
- Start the frontend on http://localhost:3000

### Build and Start the Project

```bash
make run-dev-build
```

- This will rebuild the Docker images for the backend and frontend before starting the services.

### Then container is running

```bash
make frontend-test
```

- This will run frontend tests

## Links

### Swagger docs

- http://localhost:8080/swagger-ui.html

### H-2 console

- http://localhost:8080/h2-console
  - JDBC_URL: jdbc:h2:mem:testdb

### PayPal Sandbox user for checking payment in app

- sb-5kkrg43498490@personal.example.com
- NwMQz#1}
