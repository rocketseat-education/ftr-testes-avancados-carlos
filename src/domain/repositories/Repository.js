export class Repository {
  constructor() {
    this.data = new Map();
  }

  add(id, entity) {
    id = Number(id);
    if (this.data.has(id)) {
      throw new Error("Entity already exists.");
    }
    this.data.set(id, entity);
    return id;
  }

  findById(id) {
    return this.data.get(Number(id)) || null;
  }

  findAll() {
    return Array.from(this.data.values());
  }

  update(id, entity) {
    id = Number(id);
    if (!this.data.has(id)) {
      throw new Error("Entity not found.");
    }
    this.data.set(id, entity);
  }

  delete(id) {
    id = Number(id);
    if (!this.data.has(id)) {
      throw new Error("Entity not found.");
    }
    this.data.delete(id);
  }
}
