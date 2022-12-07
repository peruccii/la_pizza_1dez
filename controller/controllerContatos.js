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

const criarContato = async function(newContact){
    
    if(newContact.nome == '' || newContact.nome == undefined || newContact.email =='' || newContact.email == undefined || newContact.numero == '' || newContact.numero == undefined || newContact.telefone == '' || newContact.telefone == undefined || newContact.mensagem == '' || newContact.mensagem == undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }else{
        
    const novoContato = require('../model/DAO/sugestao.js')
    const nContato = await novoContato.insertContact(newContact)
   

    if(nContato){
        return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
    }else{
        return {status:500, message:MESSAGE_ERROR.INTERNAL_SERVER_ERROR}
    }
       
   }
}

const atualizarContato = async function(attContact)  {
    
    if(attContact.nome == '' || attContact.nome == undefined || attContact.email == '' ||attContact.email == undefined ||attContact.numero == '' ||attContact.numero == undefined ||attContact.telefone == '' ||attContact.telefone == undefined || attContact.mensagem == '' || attContact.mensagem == undefined){
       return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
       
   } else if (!attContact.email.includes('@')) {
    return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL}
    
   }else{
    
   const atualizarContato = require('../model/DAO/sugestao.js')

   const verificar = await atualizarContato.selectContactByID(attContact.id)
   
   if (verificar) {
        
       const atualizeContato = await atualizarContato.updateContact(attContact)
       
       if (atualizeContato) {
        
           return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
       } else{
           return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
       }
       
   } else{
       return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
   }
}
}



module.exports = {
    listarContato,
    buscarContato,
    deletarContato,
    criarContato,
    atualizarContato
}