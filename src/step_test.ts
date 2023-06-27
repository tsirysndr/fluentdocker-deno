import { assertEquals } from "https://deno.land/std@0.191.0/testing/asserts.ts";
import Step from "./step.ts";

Deno.test(function stepTest() {
  const step = new Step("demo", "Example step").run("echo hello world");
  assertEquals(step.name, "demo");
  assertEquals(step.description, "Example step");
  assertEquals(step.commands, ["RUN echo hello world"]);
  assertEquals(
    step.toString(),
    `# demo
# Example step
RUN echo hello world`
  );
});
