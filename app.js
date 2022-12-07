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
const controllerContatos = require('./controller/controllerContatos.js')
const { selectContactByID } = require('./model/DAO/sugestao.js')

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

app.post('/v1/inserirproduto', cors(), jsonParser, async function (request, response) {

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
            const novoproduto = await controllerProduto.novoProduto(dadosBody)


            statusCode = novoproduto.status
            message = novoproduto.message

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

app.post('/v1/inserir/contato', cors(), jsonParser, async function (request, response) {

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
           
            const controllerContatos = require('./controller/controllerContatos.js')
            //encaminha os dados do body
            const novocontato = await controllerContatos.criarContato(dadosBody)
           

            statusCode = novocontato.status
            message = novocontato.message

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

app.delete('/v1/apagar/contato/:id', cors(), async function(request, response){
    let message
    let id = request.params.id
    let status

    if(id != '' && id != undefined){
        const apagar = await controllerContatos.deletarContato(id)
    
        status = apagar.status
        message = apagar.message
    }else{
    
        status= 400
        message = MESSAGE_ERROR.REQUIRED_ID
    
    }

    response.status(status)
    response.json(message)

})

//Endpoint para deletar o produto pelo id
app.delete('/v1/apagar/produto/:id', cors(), async function(request, response){
    let message
    let id = request.params.id
    let status

    if(id != '' && id != undefined){
        const apagar = await controllerProduto.deletarProduto(id)
    
        status = apagar.status
        message = apagar.message
    }else{
    
        status= 400
        message = MESSAGE_ERROR.REQUIRED_ID
    
    }

    response.status(status)
    response.json(message)

})

//Endpoint para buscar o produto pelo id
app.get('/v1/produtos/:id', cors(), async function (request, response, next){
 
    let chave = request.params.id
    const dadosContatos = await controllerProduto.buscarProduto(chave)
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

//Endpoint para listar todas as pizzas
app.get('/v1/pizzas', cors(), async function (request, response, next) {
   
    let statusCode
    let message = {}

    const controllerProduto = require('./controller/controllerProduto.js')

    const dadosProdutos = await controllerProduto.listarPizzas()

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

//Endpoint para atualizar uma pizza pelo id
app.put('/v1/atualizar/produto/:id',jsonParser, cors(), async function (request, response){
    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType== 'application/json'){
        let dadosBody = request.body

        if(JSON.stringify(dadosBody)!= '{}'){
            let id = request.params.id
           
            if(id != '' && id != undefined){
               
                dadosBody.id = id
                
                const controllerProduto = require('./controller/controllerProduto.js')

                const atualizar = await controllerProduto.atualizarProduto(dadosBody)
                    
                statusCode = atualizar.status
                message = atualizar.message
            }else{
                statusCode = 400
                message= MESSAGE_ERROR.REQUIRED_ID
            }
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    }else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(statusCode)
    response.json(message)
})

app.put('/v1/atualizar/contato/:id',jsonParser, cors(), async function (request, response){
    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType== 'application/json'){
        let dadosBody = request.body

        if(JSON.stringify(dadosBody)!= '{}'){
            let id = request.params.id
           
            if(id != '' && id != undefined){
               
                dadosBody.id = id
                
                const controllerContatos = require('./controller/controllerContatos.js')

                const atualizar = await controllerContatos.atualizarContato(dadosBody)
               
                statusCode = atualizar.status
                message = atualizar.message
            }else{
                statusCode = 400
                message= MESSAGE_ERROR.REQUIRED_ID
            }
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    }else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(statusCode)
    response.json(message)
})

//Endpoint para listar todas as bebidas
app.get('/v1/bebidas', cors(), async (request, response, next) => {
    
    let statusCode
    let message = {}

    const controllerProduto = require('./controller/controllerProduto.js')

    const dadosBebidas = await controllerProduto.listarBebidas()

    if (dadosBebidas) {
        statusCode = 200   
        message = dadosBebidas
    } else{
        statusCode = 404
        message.message = MESSAGE_ERROR.NOT_FOUND_DB
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

//Endpoint para listar todos os acompanhamentos
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

//Endpoint para listar todos os contatos existentes
app.get('/v1/contatos', cors(), async (request, response, next) => {
    const dadosContatos = await controllerContatos.listarContato()
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

//Endpoint para buscar contato cliente
app.get('/v1/contatos/:id', cors(), async function (request, response, next){
    let chave = request.params.id
   
    const dadosContatos = await controllerContatos.buscarContato(chave)
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
//Endpoint para deletar contato cliente
app.delete('/v1/excluir/contato/:id', cors(), jsonParser, async function (request, response) {

    let statusCode
    let message
    let id = request.params.id

    if(id != '' && id != undefined){
        const controllerContatos = require('./controller/controllerContatos.js')
        const deletarContatoo = await controllerContatos.deletarContato(id)
    
        statusCode = deletarContatoo.status
        message = deletarContatoo.message
    }else{
    
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    
    }

    response.status(statusCode)
    response.json(message)

})

app.post('/v1/inserirpizza', cors(), jsonParser, async function (request, response) {

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
//Endpoint para listar produtos em promocao
app.get('/v1/promocao', cors(), async function (request, response, next) {
   
    let statusCode
    let message = {}

    const controllerProduto = require('./controller/controllerProduto.js')

    const dadosProdutos = await controllerProduto.listarPromocao()

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

app.get('/v1/favoritos', cors(), async function (request, response, next) {
   
    let statusCode
    let message = {}

    const controllerProduto = require('./controller/controllerProduto.js')

    const dadosProdutos = await controllerProduto.listarFavorito()

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

app.get('/v1/servicos', cors(), async function (request, response, next) {
   
    let statusCode
    let message = {}

    const controllerServicos = require('./controller/controllerServicos.js')

    const dadosServicos = await controllerServicos.listarServico()

    if (dadosServicos) {
        statusCode = 200   
        message = dadosServicos
    } else{
        statusCode = 404
        message.message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    response.status(statusCode)
   response.json(message)
})

app.get('/v1/servicos/:id', cors(), async function (request, response, next){
    let chave = request.params.id
   
    const controllerServicos = require('./controller/controllerServicos.js')
    const dadosServicos = await controllerServicos.buscarServico(chave)
    if (dadosServicos) {

        statusCode = 200
        message = dadosServicos

    } else {
        statusCode = 400
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }
    response.status(statusCode)
    response.json(message)
})

app.delete('/v1/apagar/servico/:id', cors(), jsonParser, async function (request, response) {

    let statusCode
    let message
    let id = request.params.id

    if(id != '' && id != undefined){
        const controllerServicos = require('./controller/controllerServicos.js')
        const deletarServicoo = await controllerServicos.deletarServico(id)
    
        statusCode = deletarServicoo.status
        message = deletarServicoo.message
    }else{
    
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    
    }

    response.status(statusCode)
    response.json(message)

})

app.post('/v1/inserir/servico', cors(), jsonParser, async function (request, response) {

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
           
            const controllerServicos = require('./controller/controllerServicos.js')
            //encaminha os dados do body
            const novoservico = await controllerServicos.criarServico(dadosBody)
           

            statusCode = novoservico.status
            message = novoservico.message

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

app.put('/v1/atualizar/servico/:id',jsonParser, cors(), async function (request, response){
    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType== 'application/json'){
        let dadosBody = request.body

        if(JSON.stringify(dadosBody)!= '{}'){
            let id = request.params.id
           
            if(id != '' && id != undefined){
               
                dadosBody.id = id
                
                const controllerServicos = require('./controller/controllerServicos.js')

                const atualizar = await controllerServicos.atualizarServico(dadosBody)
               
                statusCode = atualizar.status
                message = atualizar.message
            }else{
                statusCode = 400
                message= MESSAGE_ERROR.REQUIRED_ID
            }
        }else{
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    }else{
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(statusCode)
    response.json(message)
})

app.post('/v1/inserirbebida', cors(), jsonParser, async function (request, response) {

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
            const novobebida = await controllerProduto.novaBebida(dadosBody)
            

            statusCode = novobebida.status
            message = novobebida.message

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
