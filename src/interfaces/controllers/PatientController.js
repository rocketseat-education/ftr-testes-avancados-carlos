import express from "express";

export class PatientController {
  constructor(patientService) {
    this.router = express.Router();
    this.patientService = patientService;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/", this.createPatient.bind(this));
    this.router.get("/", this.getAllPatients.bind(this));
    this.router.get("/:id", this.getPatientById.bind(this));
    this.router.put("/:id", this.updatePatient.bind(this));
    this.router.delete("/:id", this.deletePatient.bind(this));
    this.router.get("/search/name/:name", this.getPatientByName.bind(this));
    this.router.get(
      "/search/bloodType/:bloodType",
      this.getPatientByBloodType.bind(this)
    );
  }

  async createPatient(req, res) {
    try {
      const patientData = req.body;
      const createdPatient = await this.patientService.addPatient(patientData);
      res.status(201).json(createdPatient);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllPatients(req, res) {
    try {
      const patients = await this.patientService.findAllPatients();
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPatientById(req, res) {
    try {
      const { id } = req.params;
      const patient = await this.patientService.findPatientById(id);
      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updatePatient(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedPatient = await this.patientService.updatePatient(
        id,
        updatedData
      );
      res.status(200).json(updatedPatient);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deletePatient(req, res) {
    try {
      const { id } = req.params;
      const deletedPatient = await this.patientService.deletePatient(id);
      res.status(200).json(deletedPatient);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getPatientByName(req, res) {
    try {
      const { name } = req.params;
      const patients = await this.patientService.findPatientByName(name);
      if (!patients.length) {
        return res
          .status(404)
          .json({ error: "No patients found with the given name" });
      }
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPatientByBloodType(req, res) {
    try {
      const { bloodType } = req.params;
      const patients = await this.patientService.findPatientByBloodType(
        bloodType
      );
      if (!patients.length) {
        return res
          .status(404)
          .json({ error: "No patients found with the given blood type" });
      }
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
