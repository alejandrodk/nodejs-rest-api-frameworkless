# nodejs-rest-api-frameworkless

N-Layers

src -> all source code
    - entities -> object mappings
    - factories -> instance generators
    - repositories -> data access
    - routes -> endpoint mappings
    - services -> communication between routes and repositories layer (business logic)
    - util -> shared code
    - handler -> communication between routes and server
    - index.js -> server instance
test -> all automated test suites
    - integration tests -> testing on the user POV
    - unit tests -> all tests that must run without any external connections
