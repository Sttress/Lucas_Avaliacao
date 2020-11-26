import express, { Router } from "express";
import cors from "cors";
import axios from "axios";

const app = express();

const routes = Router();

app.use(express.json());
app.use(cors());

routes.post("/formulario", async function (req, res) {
  const body = req.body;
  const campoRua = body.campo_rua;

  try {
    const resultado = await axios.get(
      `https://viacep.com.br/ws/GO/Goiania/${campoRua}/json/`
    );
    return res.status(200).send(resultado.data[0] || {});
  } catch (error) {
    return res.status(400).send(error.response);
  }
});

routes.get("/", function (req, res) {
  res.status(200).send({
    funcionando: true,
  });
});

app.use(routes);

app.listen(80, function () {
  console.log("iniciado");
});
