const express = require("express");
const router = express.Router();
const observations = require("../mocks/observations.json");

router.get("/", async (req, res) => {
  const { patient, code } = req.query;
  try {
    if (!patient)
      return res.status(500).send("É necessário informar um ID de paciente.");
    const searchedPatient = observations.find(
      (item) => item.subject.reference.split("/")[1] === patient
    );
    if (!searchedPatient)
      return res.status(500).send("O ID do paciente não existe.");

    // TODO: fazer filtro por code

    return res.status(200).send({
      query: req.query,
      patient: searchedPatient,
    });
  } catch (err) {
    return res
      .status(400)
      .send({ error: err, message: "Erro ao atualizar o modo!" });
  }
});

module.exports = (app) => app.use("/Observation", router);
