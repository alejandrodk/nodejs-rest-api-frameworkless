import { parse } from "node:url";
import { DEFAULT_HEADER } from "./utils/util";

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

  return urlHandler(request, response);
}

export default handler;
