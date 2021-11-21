const express = require('express')
const cors = require('cors') //Habilita o CORS - Cross-origin resource sharing
require('dotenv').config() //Carregando as variáveis de ambiente
const InicializaMongoServer = require('./config/db')
const rotasUsuario = require('./routes/Usuario')
const rotasAnuncio = require('./routes/Anuncio')

InicializaMongoServer() //inicializando o MongoDB
const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(cors()) //CORS

//Primeira rota do servidor
app.get("/",(req, res) => {
    res.json({
        mensagem: 'Bem-vindo ao Busca Imóveis API!',
        versao: '1.0.0'
    })
})

//Rotas do App
app.use("/usuario", rotasUsuario)
app.use("/anuncio", rotasAnuncio)

app.use((req, res) => {
    res.status(404).json({
        mensagem: `A rota ${req.originalUrl} não existe!`
    })
})

app.listen(PORT, (req, res)=> {
    console.log(`Servidor Web iniciado na porta ${PORT}.`)
})