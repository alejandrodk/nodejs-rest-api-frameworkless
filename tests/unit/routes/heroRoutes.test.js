import test from "node:test";
import assert from "node:assert";
import EventEmitter from "node:events";

const callTracker = new assert.CallTracker();
process.on("exit", () => callTracker.verify());

import routes from "../../../src/routes/heroRoutes.js";

test("Hero Routes - endpoints test suite", async (t) => {
  await t.test("it should call /heroes:get route", async () => {
    const mockedResult = [
      {
        id: "3df68760-11ca-47d5-bde7-a2b7da7027f6",
        name: "Batman",
        age: 50,
        power: "rich",
      },
    ];

    const heroServiceMock = { find: async () => mockedResult };
    const requestMock = {};
    const responseMock = {
      write: callTracker.calls((arg) => {
        const expected = JSON.stringify({
          results: mockedResult,
        });
        assert.strictEqual(
          arg,
          expected,
          "write should be called with the correct payload"
        );
      }),
      end: callTracker.calls((arg) => {
        assert.strictEqual(
          arg,
          undefined,
          "end should be called without params"
        );
      }),
    };

    const endpoints = routes({ heroService: heroServiceMock });
    const route = endpoints["/heroes:get"];
    await route(requestMock, responseMock);
  });

  await t.test("it should call /heroes:post route", async () => {
    const expectedPayload = {
      id: "3df68760-11ca-47d5-bde7-a2b7da7027f6",
      name: "Batman",
      age: 50,
      power: "rich",
    };
    const heroServiceMock = { create: async (_) => expectedPayload.id };
    const requestMock = new EventEmitter();

    process.nextTick(() => {
      requestMock.emit("data", JSON.stringify(expectedPayload));
    });

    const responseMock = {
      writeHead: callTracker.calls((arg) => {
        assert.strictEqual(arg, 201, "it should send the right status code");
      }),
      write: callTracker.calls((arg) => {
        const expected = JSON.stringify({
          id: expectedPayload.id,
          success: "User created with success!!",
        });

        assert.strictEqual(
          arg,
          expected,
          "write should be called with the correct payload"
        );
      }),
      end: callTracker.calls((arg) => {
        assert.strictEqual(
          arg,
          undefined,
          "end should be called without params"
        );
      }),
    };

    const endpoints = routes({ heroService: heroServiceMock });
    const route = endpoints["/heroes:post"];
    await route(requestMock, responseMock);
  });
});
