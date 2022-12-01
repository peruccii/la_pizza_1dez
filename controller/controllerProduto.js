 /*

    Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delete e select)
    Autor: Eduardo Perucci
    Data de criação: 31/10/22
    Última modificação em: 31/10/22
    Versão: 1.0 

*/

const { PrismaClientRustPanicError } = require('@prisma/client/runtime/index.js')
const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js')
const produto = require('../model/DAO/produto.js')


const listarProdutos = async function(){

    let dadosProdutosJSON = {}

    const { selectAllProdutos } = require('../model/DAO/produto.js')

    const dadosProdutos = await selectAllProdutos()

    if (dadosProdutos) {

        /* dadosAlunos.forEach(element => {
            element.id = Number(element.id)
        }); */

        dadosProdutosJSON.produtos = dadosProdutos
        return dadosProdutosJSON
        
    } else{
        return false
    }

}

const deletarProduto = async (id) => {

    if (id == undefined || id == '') {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }

    const verificar = await produto.selectProdutoById(id)

    if (verificar) {
        
        const deleteProduto = await produto.deleteProduto(id)

        if (deleteProduto) {
            return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM}
        } else{
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
        
    } else{
        return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
    }
}

const listarPizzas = async function(){
let pizzasJSON = {}

//produto = caminho para eu selecionar os selects 
const dados = await produto.selectAllPizzas()

if (dados) {
    pizzasJSON.message = dados
    pizzasJSON.status = 200
} else{
    pizzasJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
    pizzasJSON.status = 404
}

return pizzasJSON

}

const listarBebidas = async function(){
    let bebidasJSON = {}
    
    //produto = caminho para eu selecionar os selects 
    const dados = await produto.selectAllBebidas()
    
    if (dados) {
        bebidasJSON.message = dados
        bebidasJSON.status = 200
    } else{
        bebidasJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
        bebidasJSON.status = 404
    }
    
    return bebidasJSON
    
}

const novaPizza = async (pizza) => {

   
    if (pizza.nome == '' || pizza.nome == undefined || pizza.foto == '' || pizza.foto == undefined || pizza.preco == '' || pizza.preco == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }

    } else {

        const novaPizzaIngrediente = require('../model/DAO/pizza_ingrediente.js')
       
        const resultnovaPizza = await produto.insertProduto(pizza)

        if (resultnovaPizza) {

            let idNovaPizza = await produto.selectLastIdProduto()

            if (idNovaPizza > 0) {

                let pizzaIngrediente = {}
 
             
                pizzaIngrediente.idPizza = idNovaPizza
                pizzaIngrediente.idIngrediente = pizza.ingrediente[0].idIngrediente
               

                const resultNovaPizzaIngrediente = await novaPizzaIngrediente.insertPizzaAcompanhamento(pizzaIngrediente)

                if (resultNovaPizzaIngrediente) {
                    return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
                } else {
                    await deletarProduto(idNovaPizza)
                    return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
                }
            } else {
                await deletarProduto(idNovaPizza)
                return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
            }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}



module.exports = {
    listarProdutos,
    listarPizzas,
    listarBebidas,
    novaPizza
  
}
