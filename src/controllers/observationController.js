const express = require("express");
const router = express.Router();
const observations = require("../mocks/observations.json");
const patients = require("../mocks/patients.json");

router.get("/", async (req, res) => {
  const { patient, code } = req.query;
  try {
    if (!patient)
      return res.status(400).send({
        message: "É necessário informar um ID de paciente.",
      });

    const searchedPatient = patients.find((item) => item.id === patient);
    if (!searchedPatient)
      return res.status(400).send({
        message: "Este ID de paciente não existe.",
      });

    const observationsByPatient = observations.filter(
      (item) => item.subject.reference.split("/")[1] === patient
    );
    if (!observationsByPatient.length)
      return res.status(200).send({
        message: "Este paciente não possui nenhuma leitura de sinal vital.",
        patient: searchedPatient,
        observations: [],
      });

    if (code) {
      const patientObservationsByCode = observationsByPatient.filter((item) =>
        item.code.coding.some((item) => item.code === code)
      );

      return res.status(200).send({
        message: "Sinais Vitais carregados com sucesso.",
        patient: searchedPatient,
        observations: patientObservationsByCode,
      });
    }

    return res.status(200).send({
      message: "Sinais Vitais carregados com sucesso.",
      patient: searchedPatient,
      observations: observationsByPatient,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Erro ao buscar por sinais vitais, tente novamente.",
      error: err,
    });
  }
});

module.exports = (app) => app.use("/Observation", router);
