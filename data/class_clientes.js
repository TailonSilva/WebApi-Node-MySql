const config = require('./config')

//CARREGADO PACOTE MYSQL PROMISSES
const mysql = require('mysql2/promise')

//CRIANDO A CONEXÃO COM O BANCO DE DADOS MYSQL
const conexao = mysql.createPool(config.connection_string)

//CRIANDO A CLASSE QUE VAI CONFIGURAR O CRUD DOS CLIENTES
module.exports = class Cliente {
  constructor(id, nome, idade, uf, cpf, data_nascimento) {
    this.id = id
    this.nome = nome
    this.idade = idade
    this.uf = uf
    this.cpf = cpf
    this.data_nascimento = data_nascimento
  }

  async listaClientes() {
    const consulta = await conexao.query("SELECT * FROM clientes;");
    return consulta[0]
  }

  async listaCliente(id) {
    const consulta = await conexao.query("SELECT * FROM clientes WHERE id=?;", [id]);
    return consulta[0]
  }

  async inserirCliente(cliente) {
    const valores = [cliente.nome, cliente.idade, cliente.uf, cliente.cpf, cliente.data_nascimento]
    await conexao.query("INSERT INTO clientes(nome, idade, uf, cpf, data_nascimento) VALUES (?,?,?,?,?)", valores);
  }

  async alteraCliente(id, infoCliente) {
    const valores = [infoCliente.nome, infoCliente.idade, infoCliente.uf, infoCliente.cpf, infoCliente.data_nascimento, id]
    await conexao.query("UPDATE clientes SET nome=?, idade=?, uf=?, cpf=?, data_nascimento=? WHERE id=? ", valores);
  }

  async deletaCliente(id) {
    const valores = [id]
    await conexao.query("DELETE FROM clientes WHERE id=?", valores);
  }

}