import { parse, fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import { DEFAULT_HEADER } from "./utils/util.js";
import heroRoutes from "./routes/heroRoutes.js";
import { generateInstance } from "./factories/heroFactory.js";

// get current dir path
const currentDir = dirname(fileURLToPath(import.meta.url));
const filePath = join(currentDir, "./database/data.json");

// Initialize routes handlers
const _heroRoutes = heroRoutes({
  heroService: generateInstance({ filePath }),
});

const routes = {
  ..._heroRoutes,
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
  const urlHandler = routes[key] || routes.default;

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
