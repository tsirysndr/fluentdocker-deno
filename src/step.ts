import DockerfileBase from "./base.ts";

class Step extends DockerfileBase {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    super();
    this.name = name;
    this.description = description;
  }

  toString() {
    return `# ${this.name}\n` + `# ${this.description}\n` + super.toString();
  }
}

export default Step;
