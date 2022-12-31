import test from "node:test";
import assert from "node:assert";
import { promisify } from "node:util";

// each callback passed to "test" receives the context (t)
test("Hero Integration Test Suite", async (t) => {
  const testPort = 9009;
  process.env.PORT = testPort;

  const { server } = await import("../../src/index.js");
  const testServerAddress = `http://localhost:${testPort}/heroes`;

  await t.test("it sould create a hero", async (t) => {
    const data = {
      name: "Batman",
      age: 50,
      power: "rich",
    };

    const request = await fetch(testServerAddress, {
      method: "POST",
      body: JSON.stringify(data),
    });

    assert.deepStrictEqual(
      request.headers.get("content-type"),
      "application/json",
      "it should return a valid content-type header"
    );

    assert.strictEqual(
      request.status,
      201,
      'it should return "created" status code'
    );

    const result = await request.json();
    assert.deepStrictEqual(
      result.success,
      "User created with success!!",
      "it should return a valid response"
    );
    assert.ok(result.id.length > 30, "it should be a valid uuid");
  });

  await t.test("it should list created heros", async (t) => {
    const request = await fetch(testServerAddress);

    assert.strictEqual(
      request.status,
      200,
      'it should return "ok" status code'
    );

    const result = await request.json();
    assert.ok(result.results.length > 0, "it should return heroes");
  });

  // We use 'bind' to ensure that internal 'this' context for
  // server.close method won't be missed
  await promisify(server.close.bind(server))();
});
