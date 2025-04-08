import { Patient } from "../../domain/entities/Patient.js";
import { Repository } from "../../domain/repositories/Repository.js";

export class PatientRepository extends Repository {
  constructor() {
    super();
    this.currentId = 1;
  }

  add(patient) {
    if (!(patient instanceof Patient)) {
      throw new Error('Can only add Patient instances');
    }
    const id = this.currentId++;
    patient._setId(id);
    super.add(id, patient);
    return id || null;
  }

  findByName(name) {
    return this.findAll().filter((patient) => patient.name === name);
  }

  findByBloodType(bloodType) {
    return this.findAll().filter((patient) => patient.bloodType === bloodType);
  }
}
