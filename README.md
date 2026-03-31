# Petstore API Tests

Automated API tests for the [Swagger Petstore API](https://petstore.swagger.io) using Jest

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
- **Edge Case:** Query multiple statuses with `findByStatus`.

## Observations

- The Petstore API is a shared public service; test data may persist between runs. Tests use timestamp-based IDs and clean up created entities where possible.
- Tests require outbound network access to `https://petstore.swagger.io/v2`.