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
    let dadosProdutosJSON = {}

    const dadosProdutos = await produto.selectAllPizzas()
   
    if (dadosProdutos) {
        dadosProdutosJSON.pizzas = dadosProdutos
        dadosProdutosJSON.status = 200
    } else{
        dadosProdutosJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
        dadosProdutosJSON.status = 404
    }
    
    return dadosProdutosJSON

}

const atualizarPizza = async function(pizza){
    if(pizza.id == '' || pizza.id == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else if(pizza.descricao =='' || pizza.descricao == undefined || pizza.id_produto =='' || pizza.id_produto == undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }else{
        const atualizar = require('../model/dao/produto.js')

     

            const verificar = await atualizar.selectProdutoById(pizza.id)

            if(verificar){
                const rsPizza = await atualizar.updatePizza(pizza)
    
                if(rsPizza){
                    return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
                } else{
                    return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
                }
            }else{
                return {status:400, message: MESSAGE_ERROR.NOT_FOUND_DB}
            }
    }
}

const listarBebidas = async function(){
    let bebidasJSON = {}
    
    
    const dados = await produto.selectAllBebidas()
    
    if (dados) {
        bebidasJSON.Bebidas = dados
        bebidasJSON.status = 200
    } else{
        bebidasJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
        bebidasJSON.status = 404
    }
    
    return bebidasJSON
    
}

const listarPromocao = async function(){
    let promocaoJSON = {}
    
    
    const dados = await produto.selectAllPromocao()
    
    if (dados) {
        promocaoJSON. promocao = dados
        promocaoJSON.status = 200
    } else{
        promocaoJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
        promocaoJSON.status = 404
    }
    
    return  promocaoJSON
    
}

const novaPizza = async function (pizza){
    if(pizza.id_produto =='' || pizza.id_produto == undefined || pizza.descricao == '' || pizza.descricao == undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }else{
    const novaPizzaa = require('../model/DAO/produto.js')
    const newPizza = await novaPizzaa.insertPizza(pizza)

    if(newPizza){
        return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
    }else{
        return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
    }
       
   }
}

const novoProduto = async function(produto){
    if(produto.nome =='' || produto.nome == undefined || produto.foto =='' || produto.foto == undefined || produto.preco =='' || produto.preco == undefined){
        
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }else{
        const novoProduto = require('../model/DAO/produto.js')

            const rsProduto = await novoProduto.insertProduto(produto)
         
            if(rsProduto){
                return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
            }else{
                return {status:500, message:MESSAGE_ERROR.INTERNAL_SERVER_ERROR}
            }
    }
}

const buscarProduto = async function(id){
    let produtoJSON = {}

    const dados = await produto.selectProdutoById(id)

    if(dados){
        produtoJSON.produto = dados
        produtoJSON.status = 200
    }else{
        produtoJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
        produtoJSON.status = 404
    }
        return produtoJSON
    }





module.exports = {
    listarProdutos,
    listarPizzas,
    listarBebidas,
    novaPizza,
    buscarProduto,
   listarPromocao,
   novoProduto,
   deletarProduto,
   atualizarPizza
  
}
