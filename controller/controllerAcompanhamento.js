/**********************************************************************
 * 
 * objetivo: Arquivo responsavel pela validacao e tratamento dos dados 
 * entre o model e a API
 * autor: Eduardo Perucci
 * Data criacao: 27/10/2022
 * Versao: 1.0
 * 
***********************************************************************/

const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js')

const novoAcompanhamento = async (acompanhamento) => {

 
    if (acompanhamento.acompanhamento == '' || acompanhamento.acompanhamento == undefined ) {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }

    } else {

    
        const novoAcompanhamento = require('../model/DAO/acompanhamento.js')

        
        const result = await novoAcompanhamento.insertAcompanhamento(acompanhamento)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }

    }

}
const atualizarAcompanhamento = async (acompanhamento) => {

    //validacao de campos obrigatorios
    if (acompanhamento.acompanhamento == '' || acompanhamento.acompanhamento == undefined) {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }


    } else if (acompanhamento.id == '' || acompanhamento.id == undefined) {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }

    } else {

        //import da model de cursos
        const atualizarAcompanhamento = require('../model/DAO/acompanhamento.js')

        //chama a funcao para inserir um novo curso
        const result = await atualizarAcompanhamento.updateAcompanhamento(acompanhamento)


        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM }
        } else {

            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }

        }

    }

}
const deletarAcompanhamento = async (id) => {


    if (id == '' && id == undefined) {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }

    } else {

        const buscadeacompanhamento = await buscarAcompanhamento(id)

        if (buscadeacompanhamento) {

            //import da model de cursos
            const deletaracompanhamento = require('../model/DAO/acompanhamento.js')

            const result = await deletaracompanhamento.deleteAcompanhamento(id)

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
const listarAcompanhamento = async () => {

    let dadosacompanhamentoJSON = {}

    const { selectAllAcompanhamento } = require('../model/DAO/acompanhamento.js')

    const dadosacompanhamento = await selectAllAcompanhamento()

    if (dadosacompanhamento) {

        dadosacompanhamentoJSON.acompanhamento = dadosacompanhamento
        return dadosacompanhamentoJSON
    } else {
        return false
    }

}
const buscarAcompanhamento = async (id) => {

    if (id == '' && id == undefined) {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }

    } else {

        let dadosacompanhamentoJSON = {}

        const {selectByIDAcompanhamento} = require('../model/DAO/acompanhamento.js')

        const dadosacompanhamento = await selectByIDAcompanhamento(id)

        if (dadosacompanhamento) {

            dadosacompanhamentoJSON.acompanhamento = dadosacompanhamento
            return dadosacompanhamentoJSON

        } else {
            return false
        }
    }

}


module.exports = {novoAcompanhamento, atualizarAcompanhamento, deletarAcompanhamento, listarAcompanhamento, buscarAcompanhamento}