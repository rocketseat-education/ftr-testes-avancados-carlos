import { Patient } from "../entities/Patient.js";

export class PatientService {
  constructor(patientRepository) {
    if (!patientRepository) {
      throw new Error("PatientRepository is required");
    }
    this.patientRepository = patientRepository;
  }

  addPatient(patientData) {
    const patient = new Patient(patientData);

    const id = this.patientRepository.add(patient);
    const savedPatient = this.patientRepository.findById(id);

    if (!savedPatient) {
      throw new Error("Failed to save patient");
    }
    return savedPatient;
  }

  findAllPatients() {
    return this.patientRepository.findAll();
  }

  findPatientById(id) {
    return this.patientRepository.findById(id) || null;
  }

  updatePatient(id, updatedData) {
    const patient = this.patientRepository.findById(id);
    if (!patient) {
      throw new Error("Patient not Found!");
    }

    if (updatedData.name) patient.name = updatedData.name;
    if (updatedData.phone) patient.phone = updatedData.phone;
    if (updatedData.email) patient.email = updatedData.email;
    if (updatedData.emergencyContact)
      patient.emergencyContact = updatedData.emergencyContact;
    if (updatedData.address) patient.address = updatedData.address;

    this.patientRepository.update(id, patient);
    return patient;
  }

  deletePatient(id) {
    const patient = this.patientRepository.findById(id);
    if (!patient) {
      throw new Error("Patient not Found!");
    }
    this.patientRepository.delete(id);
    return patient;
  }

  findPatientByName(name) {
    return this.patientRepository.findByName(name);
  }

  findPatientByBloodType(bloodType) {
    return this.patientRepository.findByBloodType(bloodType);
  }
}
