import { once } from "node:events";
import Hero from "../entities/hero.js";
import { DEFAULT_HEADER } from "../utils/util.js";

const routes = ({ heroService }) => ({
  "/heroes:get": async (request, response) => {
    const heroes = await heroService.find();

    response.write(JSON.stringify({ results: heroes }));
    response.end();
  },
  "/heroes:post": async (request, response) => {
    const payload = await once(request, "data");
    const item = JSON.parse(payload);
    const hero = new Hero(item);
    const id = await heroService.create(hero);

    response.writeHead(201, DEFAULT_HEADER);
    response.write(
      JSON.stringify({
        id,
        success: "User created with success!!",
      })
    );
    return response.end();
  },
});

export default routes;
