const express = require("express");
const router = express.Router();
const patients = require("../mocks/patients.json");

router.get("/", async (req, res) => {
  const { id } = req.query;
  try {
    if (!id)
      return res.status(500).send("É necessário informar um ID de paciente.");
    const searchedPatient = patients.find((item) => item.id === id);
    if (!searchedPatient)
      return res.status(500).send("O ID do paciente não existe.");
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

module.exports = (app) => app.use("/Patient", router);
