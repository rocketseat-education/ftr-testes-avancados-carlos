import { Repository } from "../../domain/repositories/Repository.js";

export class PatientRepository extends Repository {
  constructor() {
    super();
    this.currentId = 1;
  }

  add(patient) {
    const id = this.currentId++;
    super.add(id, { ...patient, id });
    return id;
  }

  findByName(name) {
    return this.findAll().filter((patient) => patient.name === name);
  }

  findByBloodType(bloodType) {
    return this.findAll().filter((patient) => patient.bloodType === bloodType);
  }
}
