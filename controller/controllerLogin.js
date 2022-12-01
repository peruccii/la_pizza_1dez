const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js')
const nlogin = require('../model/DAO/login.js');
const log = require('../model/DAO/login')
const novoLogin = async (login) => {
    const nlogin = require('../model/DAO/login.js');

    if (login.usuario == undefined || user.usuario == '' || login.senha == '' || user.senha == undefined ) {
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    }

    const result = await nlogin.searchLogin(login.usuario)

    if (!result) {
        const resultnlogin = await nlogin.insertUser(user);

        if (resultnlogin) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
    } else{
        return {status: 400, message: MESSAGE_ERROR.EXISTING_USER}
    }
    
        
}

const updateLogin = async (login) => {

    //validacao para o id como campo obrigatorio
    if (login.id == '' || login.id == undefined)
        return {status: 400, MESSAGE: MESSAGE_ERROR.REQUIRED_ID}
        else if (login.usuario == undefined || login.usuario == '' || login.senha == '' || login.senha == undefined) {
            return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
        }
        else 
        {

            const result = await nlogin.updateUser(user)

            if (result) {
                return {status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM};
            } else 
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
}

const excluirLogin = async (id) => {

//validacao para o id como campo obrigatorio
    if (id == '' || id == undefined)
        return {status: 400, MESSAGE: MESSAGE_ERROR.REQUIRED_ID}

    const usuario = await nlogin.selectUserById(id)

    if(usuario) {

         //funcao para deletar um curso
         const result = await nlogin.deleteUser(id);
 
         if (result) {
             return {status: 201, message: MESSAGE_SUCCESS.DELETE_ITEM};
         } else 
             return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
     } else {
         return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB};
     }
        
}


const buscarLogin = async function (id) {
    if (id == undefined || id == '') {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }

    const dadosu = await nlogin.selectUserById(id)

    if (dadosu) {
        return {status: 200}
    } else{
        return false
    }
}

const listarLogin = async function(){
    let loginJSON = {}
    
    //produto = caminho para eu selecionar os selects 
    const dados = await log.selectUser()
    
    if (dados) {
        loginJSON.login = dados
        loginJSON.status = 200
    } else{
        loginJSON.message = MESSAGE_ERROR.NOT_FOUND_DB
        loginJSON.status = 404
    }
    
    return loginJSON
    
    }

module.exports = {
excluirLogin,
buscarLogin,
updateLogin,
novoLogin,
listarLogin
}