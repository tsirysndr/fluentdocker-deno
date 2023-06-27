# FluentDocker

[![deno module](https://shield.deno.dev/x/fluentdocker)](https://deno.land/x/fluentdocker)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/tsirysndr/fluentdocker-deno)](https://codecov.io/gh/tsirysndr/fluentdocker-deno)

This is a deno module for generating dockerfiles and building docker images easily.

## 🚀 Usage

```ts
import { Dockerfile } from "https://deno.land/x/fluentdocker/mod.ts";


const image = new Dockerfile()
  .from("node:18-alpine")
  .run("apk update")
  .expose(8080)
  .cmd("npx --yes serve -s -l 8080");

const dockerfile = image.toString();

console.log(dockerfile);

image.build(".", "node-app-example");
```