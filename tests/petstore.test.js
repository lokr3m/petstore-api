const request = require("supertest");

const api = request("https://petstore.swagger.io/v2");

const PET_ID = Date.now();
const ORDER_ID = PET_ID + 1;

const pet = {
  id: PET_ID,
  name: "Copilot Pup",
  status: "available",
  photoUrls: ["https://example.com/dog.jpg"],
};

describe("Pet lifecycle", () => {
  test("POST /pet creates a pet", async () => {
    const res = await api.post("/pet").send(pet);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(PET_ID);
    expect(res.body.name).toBe(pet.name);
  });

  test("GET /pet/{id} returns the created pet", async () => {
    const res = await api.get(`/pet/${PET_ID}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(PET_ID);
    expect(res.body.name).toBe(pet.name);
  });

  test("PUT /pet updates the pet name and status", async () => {
    const updatedPet = { ...pet, name: "Copilot Pup Updated", status: "sold" };
    const res = await api.put("/pet").send(updatedPet);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedPet.name);
    expect(res.body.status).toBe(updatedPet.status);
  });

  test("DELETE /pet/{id} deletes the pet", async () => {
    const res = await api.delete(`/pet/${PET_ID}`);

    expect(res.status).toBe(200);
  });

  test("GET /pet/{id} returns 404 after deletion (negative)", async () => {
    const res = await api.get(`/pet/${PET_ID}`);

    expect(res.status).toBe(404);
  });
});

describe("Pet search", () => {
  test("GET /pet/findByStatus handles multiple status values (edge case)", async () => {
    const res = await api.get("/pet/findByStatus").query({ status: ["available", "sold"] });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    res.body.slice(0, 5).forEach((petResult) => {
      if (petResult && petResult.status) {
        expect(["available", "sold"]).toContain(petResult.status);
      }
    });
  });
});

describe("Store order lifecycle", () => {
  const order = {
    id: ORDER_ID,
    petId: PET_ID,
    quantity: 1,
    shipDate: new Date().toISOString(),
    status: "placed",
    complete: false,
  };

  test("POST /store/order creates an order", async () => {
    const res = await api.post("/store/order").send(order);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(ORDER_ID);
  });

  test("GET /store/order/{id} returns the created order", async () => {
    const res = await api.get(`/store/order/${ORDER_ID}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(ORDER_ID);
  });

  test("DELETE /store/order/{id} deletes the order", async () => {
    const res = await api.delete(`/store/order/${ORDER_ID}`);

    expect(res.status).toBe(200);
  });

  test("GET /store/order/{id} returns 404 after deletion (negative)", async () => {
    const res = await api.get(`/store/order/${ORDER_ID}`);

    expect(res.status).toBe(404);
  });
});