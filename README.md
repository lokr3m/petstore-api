# Petstore API Tests

API tests for the [Swagger Petstore API](https://petstore.swagger.io) using Jest

## Setup

```bash
npm install
npm test
```

## Endpoints Covered

- `POST /pet`
- `GET /pet/{petId}`
- `PUT /pet`
- `DELETE /pet/{petId}`
- `GET /pet/findByStatus`
- `POST /store/order`
- `GET /store/order/{orderId}`
- `DELETE /store/order/{orderId}`

## Test Scenarios

- **Functional:** Create, read, update, and delete a pet; create and fetch a store order.
- **Negative:** Verify 404 responses after deleting a pet or order.
