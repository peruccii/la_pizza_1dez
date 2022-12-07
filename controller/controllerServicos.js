const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js')
const service = require('../model/DAO/servicos.js')


const listarServico = async function(){
    let servicoJSON = {}
    
    //produto = caminho para eu selecionar os selects 
    const dados = await service.selectAllServicos()
    
    if (dados) {
        servicoJSON.Servicos = dados
        servicoJSON.status = 200
    } else{
        servicoJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
        servicoJSON.status = 404
    }
    
    return servicoJSON
    
}

const buscarServico = async function(id){
    let servicoJSON = {}

    const dados = await service.selectServiceByID(id)

    if(dados){
        servicoJSON.Contato = dados
        servicoJSON.status = 200
    }else{
        servicoJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
        servicoJSON.status = 404
    }
        return servicoJSON
}

const deletarServico = async (id) => {

    if (id == '' && id == undefined) {
      return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    
    }else {
    
    const buscaServico = await buscarServico(id)
    
    if(buscaServico) {
      
        const deletarServico = require('../model/DAO/servicos.js')
    
            const result = await deletarServico.deleteService(id)
    
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

const criarServico = async function(newService){
    
    if(newService.foto == '' || newService.foto == undefined || newService.nome =='' || newService.nome == undefined || newService.descricao == '' || newService.descricao == undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    }else{
        
    const novoServico = require('../model/DAO/servicos.js')
    const nServico = await novoServico.insertService(newService)
   

    if(nServico){
        return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
    }else{
        return {status:500, message:MESSAGE_ERROR.INTERNAL_SERVER_ERROR}
    }
       
   }
}

const atualizarServico = async function(attService)  {
    
    if(attService.foto == '' || attService.foto == undefined || attService.nome == '' ||attService.nome == undefined ||attService.descricao == '' ||attService.descricao == undefined){
       return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
       
   }else{
    
   const atualizarServico = require('../model/DAO/servicos.js')

   const verificar = await atualizarServico.selectServiceByID(attService.id)
   
   if (verificar) {
        
       const atualizeServico = await atualizarServico.updateService(attService)
       
       if (atualizeServico) {
        
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
    listarServico,
    buscarServico,
    deletarServico,
    criarServico,
    atualizarServico
}