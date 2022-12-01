/**********************************************************************
 * 
 * objetivo: Arquivo responsavel pela manipulação de dados com o BD 
 *      (insert, update, delete, select)
 * autor: Eduardo Perucci
 * Data criacao: 31/10/2022
 * Versao: 1.0
 * 
***********************************************************************/

const insertPizzaAcompanhamento = async (pizzaIngrediente) => {

    try {

        //import da classe prismaClient, que é respnsavel pelas interacoes com BD
        const { PrismaClient } = require('@prisma/client')

        //instancia da classe PrismaClient
        const prisma = new PrismaClient()

        let sql = `insert into tbl_pizza_ingrediente
        (
            id_pizza, 
            id_ingrediente
        )values( 
            '${pizzaIngrediente.idPizza}',
            '${pizzaIngrediente.idIngrediente}' 
        )`

        //executa o script sql no banco de dados ($executeRawUnsafe permite encaminhar um variavel contendo um script
        const result = await prisma.$executeRawUnsafe(sql)
           
        // verifica se on script foi executado com sucesso no banco de dados
        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {

        return false

    }

}
const selectPizzaAcompanhamento = async (idPizza) => {

  //import da classe prismaClient, que é respnsavel pelas interacoes com BD
  const { PrismaClient } = require('@prisma/client')

  //instancia da classe PrismaClient
  const prisma = new PrismaClient()

  let sql = `
        select cast(tbl_ingrediente.id as float) as id_ingrediente, tbl_ingrediente.acompanhamento as ingrediente_acompanhamento
            from tbl_pizza
                inner join tbl_pizza_ingrediente
                    on tbl_pizza.id = tbl_pizza_ingrediente.id_pizza
                inner join tbl_ingrediente
                    on tbl_ingrediente.id = tbl_pizza_ingrediente.id_ingrediente
        where tbl_pizza.id = ${idPizza};
    `
    const rsPizzaAcompanhamento = await prisma.$queryRawUnsafe(sql)

    if (rsPizzaAcompanhamento.length > 0) {
        return rsPizzaAcompanhamento
    } else {
        return false
    }


}

module.exports = {insertPizzaAcompanhamento, selectPizzaAcompanhamento}