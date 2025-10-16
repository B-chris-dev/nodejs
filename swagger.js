const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "my API",
    description: "api de gestion de location de catways",
  },
  host: "nodejs-three-rose.vercel.app",
  schemes: ["http, https"],
};

const outputFile = "./swagger-output.json";
const endpointsfiles = ["./bin/www"];

swaggerAutogen(outputFile, endpointsfiles, doc).then(() => {
  require("./app.js");
});
