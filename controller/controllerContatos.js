const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js')
const contat = require('../model/DAO/sugestao.js')

const listarContato = async function(){
    let contatoJSON = {}
    
    //produto = caminho para eu selecionar os selects 
    const dados = await contat.selectAllContacts()
    
    if (dados) {
        contatoJSON.Contato = dados
        contatoJSON.status = 200
    } else{
        contatoJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
        contatoJSON.status = 404
    }
    
    return contatoJSON
    
}
const buscarContato = async function(id){
    let contatoJSON = {}

    const dados = await contat.selectContactByID(id)

    if(dados){
        contatoJSON.Contato = dados
        contatoJSON.status = 200
    }else{
        contatoJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
        contatoJSON.status = 404
    }
        return contatoJSON
}
const deletarContato = async (id) => {

    if (id == '' && id == undefined) {
      return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    
    }else {
    
    const buscaContato = await buscarContato(id)
    
    if(buscaContato) {
      
        const deletarContato = require('../model/DAO/sugestao.js')
    
            const result = await deletarContato.deleteContact(id)
    
            if (result) {
    
                return { status: 201, message: MESSAGE_SUCCESS.DELETE_ITEM }
    
            } else {
    
                return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
    
            }
        } else {
    
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
    
    }
    
    }
}



module.exports = {
    listarContato,
    buscarContato,
    deletarContato
}