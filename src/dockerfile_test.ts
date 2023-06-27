import { assertEquals } from "https://deno.land/std@0.191.0/testing/asserts.ts";
import Dockerfile from "./index.ts";
import Step from "./step.ts";

Deno.test(function dockerfileTest() {
  const dockerfile = new Dockerfile()
    .from("node:18-alpine")
    .run("apk add --no-cache git")
    .expose(8080);

  assertEquals(
    dockerfile.toString(),
    `# Do not edit this file directly. It is generated by FluentDocker.

FROM node:18-alpine
RUN apk add --no-cache git
EXPOSE 8080`
  );
});

Deno.test(function dockerfileWithStepTest() {
  const dockerfile = new Dockerfile()
    .from("node:18-alpine")
    .withStep(new Step("demo", "Example step").run("echo hello world"))
    .withStep(new Step("demo2", "Example step 2").run("echo hello world 2"));

  assertEquals(
    dockerfile.toString(),
    `# Do not edit this file directly. It is generated by FluentDocker.

FROM node:18-alpine

# demo
# Example step
RUN echo hello world

# demo2
# Example step 2
RUN echo hello world 2`
  );
});
