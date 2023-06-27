class DockerfileBase {
  commands: string[];

  constructor() {
    this.commands = [];
  }

  from(image: string) {
    this.commands.push(`FROM ${image}`);
    return this;
  }

  run(command: string) {
    this.commands.push(`RUN ${command}`);
    return this;
  }

  copy(src: string, dest: string) {
    this.commands.push(`COPY ${src} ${dest}`);
    return this;
  }

  env(key: string, value: string) {
    this.commands.push(`ENV ${key}=${value}`);
    return this;
  }

  workdir(dir: string) {
    this.commands.push(`WORKDIR ${dir}`);
    return this;
  }

  cmd(command: string | string[]) {
    if (typeof command === "string") {
      this.commands.push(`CMD ${command}`);
      return this;
    }

    this.commands.push(`CMD ["${command.join('", "')}"]`);

    return this;
  }

  label(key: string, value: string) {
    this.commands.push(`LABEL ${key}="${value}"`);
    return this;
  }

  maintainer(name: string) {
    this.commands.push(`MAINTAINER ${name}`);
    return this;
  }

  expose(port: number) {
    this.commands.push(`EXPOSE ${port}`);
    return this;
  }

  add(src: string, dest: string) {
    this.commands.push(`ADD ${src} ${dest}`);
    return this;
  }

  entrypoint(command: string | string[]) {
    if (typeof command === "string") {
      this.commands.push(`ENTRYPOINT ${command}`);
      return this;
    }
    this.commands.push(`ENTRYPOINT ["${command.join('", "')}"]`);
    return this;
  }

  volume(volume: string | string[]) {
    if (typeof volume === "string") {
      this.commands.push(`VOLUME ${volume}`);
      return this;
    }
    this.commands.push(`VOLUME ["${volume.join('", "')}"]`);
    return this;
  }

  user(user: string) {
    this.commands.push(`USER ${user}`);
    return this;
  }

  arg(key: string, value?: string) {
    if (value) {
      this.commands.push(`ARG ${key}=${value}`);
      return this;
    }
    this.commands.push(`ARG ${key}`);
    return this;
  }

  onBuild(command: string) {
    this.commands.push(`ONBUILD ${command}`);
    return this;
  }

  stopSignal(signal: string) {
    this.commands.push(`STOPSIGNAL ${signal}`);
    return this;
  }

  healthcheck(command: string) {
    this.commands.push(`HEALTHCHECK ${command}`);
    return this;
  }

  shell(shell: string[]) {
    this.commands.push(`SHELL ["${shell.join('", "')}"]`);
    return this;
  }

  comment(comment: string) {
    this.commands.push(`# ${comment}`);
    return this;
  }

  toString() {
    return this.commands.join("\n");
  }

  async build(context: string, tag: string) {
    // write to Dockerfile
    Deno.writeTextFileSync("Dockerfile", this.toString());
    // build image
    const command = new Deno.Command("docker", {
      args: ["build", context, "-t", tag, "-f", "Dockerfile"],
      stdout: "piped",
      stderr: "piped",
    });

    const child = command.spawn();

    const status = await child.status;

    const { stderr, stdout } = await child.output();

    if (!status.success) {
      console.log(new TextDecoder().decode(stderr));
      throw new Error("Failed to build image");
    }

    console.log(new TextDecoder().decode(stdout));
    console.log(new TextDecoder().decode(stderr));
    console.log(`Successfully built image ${tag}`);

    return this;
  }
}

export default DockerfileBase;
