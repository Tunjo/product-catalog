# Product Catalog

A full-stack product catalog application with a **backend** (Spring Boot), **frontend** (React). The project is containerized with Docker and managed using a `Makefile`.

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

### PayPal Sandbox user that can be used for PayPal payment

- sb-5kkrg43498490@personal.example.com
- NwMQz#1}

### Admin-controller
- http://localhost:8080/swagger-ui/index.html#/admin-controller
- On admin routes pls use in memory user credentials (that was part that have plan to make frontend admin part and protect product & category create, update and delete methods; TODO: make front part of admin page)
-   Username: adminOGCS
-   Password: adminOGCS123
- We can use also curl with credentials:
- Create a New Product (POST)

**Endpoint:**  
`POST /api/admin/products`

**Authentication:**  
HTTP Basic Auth (`adminOGCS` / `adminOGCS123`)

**Request Example:**
```sh
curl -X POST "http://localhost:8080/api/admin/products" \
  -u adminOGCS:adminOGCS123 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Orange",
    "description": "Some lazy description",
    "price": 10,
    "imageUrl": "",
    "quantity": 10,
    "category": {
      "id": 1,
      "name": "Food"
    }
  }'
```

