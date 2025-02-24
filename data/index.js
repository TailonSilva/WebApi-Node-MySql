const config = require('./config');

const express = require('express');
const porta = config.porta

const app = express();

app.use(express.json());

// Adicionar os cabeçalhos Access-Control-Allow-Origin
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const Cliente = require('./class_clientes');
const db = new Cliente()

//FUNÇÃO ATUALIANDO CLIENTE DO BANCO DE DADOS *FUNCIONANDO*
app.patch("/clientes/:id", (req, res) => {
  const id = Number(req.params.id);
  const infoCliente = req.body;
  db.alteraCliente(id, infoCliente);
  res.sendStatus(200);
})

//FUNÇÃO INSERINDO CLIENTE DO BANCO DE DADOS *FUNCIONANDO*
app.post("/clientes", async (req, res) => {
  const novoCliente = req.body;
  await db.inserirCliente(novoCliente);
  res.sendStatus(201);
})

//FUNÇÃO TRAZENDO TODOS OS CLIENTES DO BANCO DE DADOS *FUNCIONANDO*
app.get("/clientes", async (req, res) => {
  const resultado = await db.listaClientes();
  res.json(resultado)
})

//FUNÇÃO TRAZENDO CLIENTE FILTRADO PELO ID DO BANCO DE DADOS *FUNCIONANDO*
app.get("/clientes/:id", async (req, res) => {
  const id = Number(req.params.id)
  const resultado = await db.listaCliente(id)
  res.json(resultado)
})

//FUNÇÃO DELETANDO CLIENTE PELO ID DO BANCO DE DADOS *FUNCIONANDO*
app.delete("/clientes/:id", async (req, res) => {
  const id = Number(req.params.id);
  await db.deletaCliente(id)
  res.sendStatus(204)
})

//RETONO DA ROTA RAIZ
app.get("/", (req, res) => {
  res.json({mensagem:"Bem Vindo ao nossa API"})
})

//INICIALIZAÇÃO DO SERVIDOR
app.listen(porta, () => {
  console.log('Rodando Certinho!!')
})