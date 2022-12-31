import { readFile, writeFile } from "node:fs/promises";

export default class HeroRepository {
  constructor({ file }) {
    this.file = file;
  }

  async #currentFileContent() {
    return JSON.parse(await readFile(this.file));
  }

  find() {
    return this.#currentFileContent();
  }

  async create(hero) {
    const currentData = await this.#currentFileContent();

    currentData.push(hero);

    await writeFile(this.file, JSON.stringify(currentData));
    return hero.id;
  }
}
