class DockerfileBase {
  commands: string[];

  constructor() {
    this.commands = [];
  }

  /**
   * FROM sets the Base Image for subsequent instructions. As such, a valid Dockerfile must have FROM as its first instruction.
   * @param {string} image The image to use
   * @returns {DockerfileBase} DockerfileBase with FROM command
   */
  from(image: string) {
    this.commands.push(`FROM ${image}`);
    return this;
  }

  /**
   * RUN <command> (shell form, the command is run in a shell, which by default is /bin/sh -c on Linux or cmd /S /C on Windows)
   * @param {string} command The command to run
   * @returns {DockerfileBase} DockerfileBase with RUN command
   */
  run(command: string) {
    this.commands.push(`RUN ${command}`);
    return this;
  }

  /**
   * COPY <src> <dest> (the <src> path must be inside the context of the build; you cannot COPY ../something /something, because the first step of a docker build is to send the context directory (and subdirectories) to the docker daemon.)
   * @param {string} src The source path
   * @param {string} dest The destination path
   * @returns {DockerfileBase} DockerfileBase with COPY command
   */
  copy(src: string, dest: string) {
    this.commands.push(`COPY ${src} ${dest}`);
    return this;
  }

  /**
   * ENV <key> <value> (the ENV instruction sets the environment variable <key> to the value <value>. This value will be in the environment of all "descendant" Dockerfile commands and can be replaced inline in many as well.)
   * @param {string} key The environment variable name
   * @param {string} value The environment variable value
   * @returns {DockerfileBase} DockerfileBase with ENV command
   */
  env(key: string, value: string) {
    this.commands.push(`ENV ${key}=${value}`);
    return this;
  }

  /**
   * WORKDIR <dir> (the WORKDIR instruction sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it in the Dockerfile. If the WORKDIR doesn’t exist, it will be created even if it’s not used in any subsequent Dockerfile instruction.)
   * @param {string} dir The working directory
   * @returns {DockerfileBase} DockerfileBase with WORKDIR command
   */
  workdir(dir: string) {
    this.commands.push(`WORKDIR ${dir}`);
    return this;
  }

  /**
   * CMD ["executable","param1","param2"] (exec form, this is the preferred form)
   * or CMD command param1 param2 (shell form)
   * @param {string | string[]} command The command to run
   * @returns {DockerfileBase} DockerfileBase with CMD command
   */
  cmd(command: string | string[]) {
    if (typeof command === "string") {
      this.commands.push(`CMD ${command}`);
      return this;
    }

    this.commands.push(`CMD ["${command.join('", "')}"]`);

    return this;
  }

  /**
   * LABEL <key>=<value> (the LABEL instruction adds metadata to an image. A LABEL is a key-value pair. To include spaces within a LABEL value, use quotes and backslashes as you would in command-line parsing.)
   * @param {string} key The label key
   * @param {string} value The label value
   * @returns {DockerfileBase} DockerfileBase with LABEL command
   */
  label(key: string, value: string) {
    this.commands.push(`LABEL ${key}="${value}"`);
    return this;
  }

  /**
   * MAINAINER <name> (the MAINTAINER instruction allows you to set the Author field of the generated images.)
   * @param {string} name The maintainer name
   * @returns {DockerfileBase} DockerfileBase with MAINTAINER command
   */
  maintainer(name: string) {
    this.commands.push(`MAINTAINER ${name}`);
    return this;
  }

  /**
   * EXPORT <port> (the EXPOSE instruction informs Docker that the container listens on the specified network ports at runtime. You can specify whether the port listens on TCP or UDP, and the default is TCP if the protocol is not specified.)
   * @param {number} port The port to expose
   * @returns {DockerfileBase} DockerfileBase with EXPOSE command
   */
  expose(port: number) {
    this.commands.push(`EXPOSE ${port}`);
    return this;
  }

  /**
   * ADD <src> <dest> (the ADD instruction copies new files, directories or remote file URLs from <src> and adds them to the filesystem of the image at the path <dest>.)
   * @param {string} src The source path
   * @param {string} dest The destination path
   * @returns {DockerfileBase} DockerfileBase with ADD command
   */
  add(src: string, dest: string) {
    this.commands.push(`ADD ${src} ${dest}`);
    return this;
  }

  /**
   * ENTRYPOINT ["executable", "param1", "param2"] (exec form, this is the preferred form)
   * or ENTRYPOINT command param1 param2 (shell form)
   * @param {string | string[]} command The command to run
   * @returns {DockerfileBase} DockerfileBase with ENTRYPOINT command
   */
  entrypoint(command: string | string[]) {
    if (typeof command === "string") {
      this.commands.push(`ENTRYPOINT ${command}`);
      return this;
    }
    this.commands.push(`ENTRYPOINT ["${command.join('", "')}"]`);
    return this;
  }

  /**
   * VOLUME ["/data"] (the VOLUME instruction creates a mount point with the specified name and marks it as holding externally mounted volumes from native host or other containers. The value can be a JSON array, VOLUME ["/var/log/"], or a plain string with multiple arguments, such as VOLUME /var/log or VOLUME /var/log /var/db.)
   * or VOLUME /var/log (this creates a directory with the name /var/log)
   * @param {string | string[]} volume The volume to mount
   * @returns {DockerfileBase} DockerfileBase with VOLUME command
   */
  volume(volume: string | string[]) {
    if (typeof volume === "string") {
      this.commands.push(`VOLUME ${volume}`);
      return this;
    }
    this.commands.push(`VOLUME ["${volume.join('", "')}"]`);
    return this;
  }

  /**
   * USER <user>[:<group>] (the USER instruction sets the user name (or UID) and optionally the user group (or GID) to use when running the image and for any RUN, CMD and ENTRYPOINT instructions that follow it in the Dockerfile.)
   * @param {string} user The user to run the command as
   * @returns {DockerfileBase} DockerfileBase with USER command
   */
  user(user: string) {
    this.commands.push(`USER ${user}`);
    return this;
  }

  /**
   * ARG <name>[=<default value>] (the ARG instruction defines a variable that users can pass at build-time to the builder with the docker build command using the --build-arg <varname>=<value> flag. If a user specifies a build argument that was not defined in the Dockerfile, the build outputs a warning.)
   * @param {string} key The key of the ARG
   * @param {string?} value The value of the ARG
   * @returns {DockerfileBase} DockerfileBase with ARG command
   */
  arg(key: string, value?: string) {
    if (value) {
      this.commands.push(`ARG ${key}=${value}`);
      return this;
    }
    this.commands.push(`ARG ${key}`);
    return this;
  }

  /**
   * ONBUILD [INSTRUCTION] (the ONBUILD instruction adds to the image a trigger instruction to be executed at a later time, when the image is used as the base for another build. The trigger will be executed in the context of the downstream build, as if it had been inserted immediately after the FROM instruction in the downstream Dockerfile.)
   * @param {string} instruction The instruction to run on build
   * @returns {DockerfileBase} DockerfileBase with ONBUILD command
   */
  onBuild(instruction: string) {
    this.commands.push(`ONBUILD ${instruction}`);
    return this;
  }

  /**
   * STOPSIGNAL <signal> (the STOPSIGNAL instruction sets the system call signal that will be sent to the container to exit. This signal can be a valid unsigned number that matches a position in the kernel’s syscall table, for instance 9, or a signal name in the format SIGNAME, for instance SIGKILL.)
   * @param {string} signal The signal to stop
   * @returns {DockerfileBase} DockerfileBase with STOPSIGNAL command
   */
  stopSignal(signal: string) {
    this.commands.push(`STOPSIGNAL ${signal}`);
    return this;
  }

  /**
   * HEALTHCHECK [OPTIONS] CMD command (the HEALTHCHECK instruction tells Docker how to test a container to check that it is still working. This can detect cases such as a web server that is stuck in an infinite loop and unable to handle new connections, even though the server process is still running.)
   * @param {string} command The command to run
   * @param {string?} options Additional options
   * @returns {DockerfileBase} DockerfileBase with HEALTHCHECK command
   */
  healthcheck(command: string, options?: string) {
    if (options) {
      this.commands.push(`HEALTHCHECK ${options} CMD ${command}`);
      return this;
    }
    this.commands.push(`HEALTHCHECK CMD ${command}`);
    return this;
  }

  /**
   * SHELL ["executable", "parameters"] (the SHELL instruction allows the default shell used for the shell form of commands to be overridden. The default shell on Linux is ["/bin/sh", "-c"], and on Windows is ["cmd", "/S", "/C"]. The SHELL instruction must be written in JSON form in a Dockerfile.)
   * @param {string[]} shell The shell to use
   * @returns {DockerfileBase} DockerfileBase with SHELL command
   */
  shell(shell: string[]) {
    this.commands.push(`SHELL ["${shell.join('", "')}"]`);
    return this;
  }

  /**
   * Adds a comment to the Dockerfile
   * @param {string} comment The comment to add
   * @returns {DockerfileBase} DockerfileBase with comment
   */
  comment(comment: string) {
    this.commands.push(`# ${comment}`);
    return this;
  }

  /**
   * Returns the Dockerfile as a string
   * @returns {string} The Dockerfile as a string
   */
  toString() {
    return this.commands.join("\n");
  }

  /**
   * Builds the Dockerfile
   * @param {string} context The context to build from
   * @param {string} tag The tag to build with
   * @returns
   */
  async build(context: string, tag: string) {
    // write to Dockerfile
    Deno.writeTextFileSync("Dockerfile", this.toString());
    // build image
    const command = new Deno.Command("docker", {
      args: ["build", context, "-t", tag, "-f", "Dockerfile"],
      stdout: "inherit",
      stderr: "inherit",
    });

    const child = command.spawn();

    const status = await child.status;

    if (!status.success) {
      Deno.exit(1);
    }

    return this;
  }
}

export default DockerfileBase;
