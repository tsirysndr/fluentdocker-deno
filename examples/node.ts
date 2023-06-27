import Dockerfile from "../src/index.ts";

const image = new Dockerfile()
  .from("node:18-alpine")
  .run("apk update")
  .expose(8080)
  .cmd("npx --yes serve -s -l 8080");

const dockerfile = image.toString();

console.log(dockerfile);

image.build(".", "node-app-example");
