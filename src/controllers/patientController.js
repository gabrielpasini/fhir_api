const express = require("express");
const router = express.Router();
const patients = require("../mocks/patients.json");

router.get("/", async (req, res) => {
  const { id } = req.query;
  try {
    if (!id)
      return res.status(200).send({
        patient: patients,
      });

    const searchedPatient = patients.find((item) => item.id === id);
    if (!searchedPatient)
      return res.status(400).send({
        message: "Este ID de paciente não existe.",
      });

    return res.status(200).send({
      patient: searchedPatient,
    });
  } catch (err) {
    return res.status(500).send({
      error: err,
      message: "Erro ao buscar por pacientes, tente novamente.",
    });
  }
});

module.exports = (app) => app.use("/Patient", router);
