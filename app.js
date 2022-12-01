/*

    Objetivo: API responsável pela manipulação de dados do Back-End (GET, POST, PUT, DELETE)
    Autor: Eduardo Perucci
    Data de criação: 10/10/22
    Última modificação em: 27/10/22
    Versão: 1.0 

    Anotações:

        Para manipular o acesso ao BD podemos utilizar o Prisma

        Comandos para instalação:

            npm install prisma --save
            npx prisma
            npx prisma init
            npm install @prisma/client

*/

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { request, response } = require('express')
const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('./modulo/config.js')
const { json } = require('body-parser')

const app = express()

const controllerProduto = require('./controller/controllerProduto.js')
const controllerAcompanhamento = require('./controller/controllerAcompanhamento.js')
const controllerLogin = require('./controller/controllerLogin.js')

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')

    app.use(cors())

    next()
})

//Criamos um objeto que permite receber um JSON no body nas requisições
const jsonParser = bodyParser.json()

/*
    Rotas para CRUD de alunos
    Data: 10/10/22
*/

//EndPoint listar produtos
app.get('/v1/produtos', cors(), async function(request,response,next){

    let statusCode
    let message = {}

    const controllerProduto = require('./controller/controllerProduto.js')

    const dadosProdutos = await controllerProduto.listarProdutos()

    if (dadosProdutos) {
        statusCode = 200   
        message = dadosProdutos
    } else{
        statusCode = 404
        message.message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    response.status(statusCode)
    response.json(message)
})

app.get('/v1/produtos/pizza', cors(), async (request, response, next) => {
    const dadosPizza = await controllerProduto.listarPizzas()
    if (dadosPizza) {

        statusCode = 200
        message = dadosPizza

    } else {
        statusCode = 400
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    response.status(statusCode)
    response.json(message)
})

app.get('/v1/produtos/bebida', cors(), async (request, response, next) => {
    const dadosBebida = await controllerProduto.listarBebidas()
    if (dadosBebida) {

        statusCode = 200
        message = dadosBebida

    } else {
        statusCode = 400
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    response.status(statusCode)
    response.json(message)
})

app.get('/v1/login', cors(), async (request, response, next) => {
    const dadosLogin = await controllerLogin.listarLogin()
    if (dadosLogin) {

        statusCode = 200
        message = dadosLogin

    } else {
        statusCode = 400
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    response.status(statusCode)
    response.json(message)
})

app.get('/v1/produtos/acompanhamento', cors(), async (request, response, next) => {
    const dadosAcompanhamento = await controllerAcompanhamento.listarAcompanhamento()
    if (dadosAcompanhamento) {

        statusCode = 200
        message = dadosAcompanhamento

    } else {
        statusCode = 400
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    response.status(statusCode)
    response.json(message)
})

app.get('/v1/contatos', cors(), async (request, response, next) => {
    const dadosContatos = await controllerContato.listarContatos()
    if (dadosContatos) {

        statusCode = 200
        message = dadosContatos

    } else {
        statusCode = 400
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    response.status(statusCode)
    response.json(message)
})

app.post('/v1/produto', cors(), jsonParser, async function (request, response) {

    let statusCode
    let message
    let headerContentType

    //recebe o tipo de content-type que foi enviado no header da aquisicao  
    headerContentType = request.headers['content-type']

    //validar se content type é do tipo  
    //v1/application/json
    if (headerContentType == 'application/json') {

        //recebe do corpo da mensagem conteudo
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {

            const controllerProduto = require('./controller/controllerProduto.js')
            //encaminha os dados do body
            const novapizza = await controllerProduto.novaPizza(dadosBody)


            statusCode = novapizza.status
            message = novapizza.message

        } else {

            statusCode = 404
            message = MESSAGE_ERROR.EMPTY_BODY

        }

    } else {

        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE

    }
    response.status(statusCode)
    response.json(message)

})

app.listen(8080, function() {
    console.log('Aguardando requisições')
})
