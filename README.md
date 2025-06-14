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
- Start the PostgreSQL database (if configured)

### Build and Start the Project

```bash
make run-dev
```

- This will rebuild the Docker images for the backend and frontend before starting the services.
