const routes = ({ heroService }) => ({
  "/heroes:get": (request, response) => {
    response.write("GET");
    response.end();
  },
  "/heroes:post": (request, response) => {
    response.write("POST");
    response.end();
  },
});

export default routes;
