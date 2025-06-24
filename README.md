# Product Catalog

A full-stack product catalog application with a **backend** (Spring Boot) and **frontend** (React).  
The project is fully containerized with Docker and managed using a `Makefile`.

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

- Starts the backend at [http://localhost:8080](http://localhost:8080)
- Starts the frontend at [http://localhost:3000](http://localhost:3000)

---

### Build and Start the Project

```bash
make run-dev-build
```

- Rebuilds Docker images for backend and frontend before starting the services.

---

### Run Frontend Tests

```bash
make frontend-test
```

- Runs frontend tests in the container.

---

## Useful Links

- **Swagger docs:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **Swagger Admin Controller:** [http://localhost:8080/swagger-ui/index.html#/admin-controller](http://localhost:8080/swagger-ui/index.html#/admin-controller)
- **H2 Console:** [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
  - JDBC URL: `jdbc:h2:mem:testdb`

---

## PayPal Sandbox Test User

- Email: `sb-5kkrg43498490@personal.example.com`
- Password: `NwMQz#1}`

---

## Admin Endpoints

Admin routes are protected with HTTP Basic Auth.  
Use the following in-memory credentials:

- **Username:** `adminOGCS`
- **Password:** `adminOGCS123`

You can also use curl for admin actions:

### Create a New Product (POST)

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

---

## TODO

- Implement frontend admin page for product & category management (create, update, delete).

---
