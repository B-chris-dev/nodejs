const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "my API",
    description: "api de gestion de location de catways",
  },
  host: "localhost:8080",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsfiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsfiles, doc).then(() => {
  require("./app.js");
});
