import { parse } from "node:url";
import { DEFAULT_HEADER } from "./utils/util.js";

const allRoutes = {
  "/heroes:get": (request, response) => {
    response.write("GET");
    response.end();
  },
  // Fallback
  default: (request, response) => {
    response.writeHead(404, DEFAULT_HEADER);
    response.write("not found");
    response.end();
  },
};

function handler(request, response) {
  const { url, method } = request;
  const { pathname } = parse(url, true);

  const key = `${pathname}:${method.toLowerCase()}`;
  const urlHandler = allRoutes[key] || allRoutes.default;

  return Promise.resolve(urlHandler(request, response)).catch(
    handleError(response)
  );
}

function handleError(response) {
  return (error) => {
    console.log("Something bad has happened**", error.stack);
    response.writeHead(500, DEFAULT_HEADER);
    response.write(
      JSON.stringify({
        error: "Internal server error",
      })
    );
    return response.end();
  };
}

export default handler;
