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

    module.exports = {
        listarContato,
        buscarContato
    }