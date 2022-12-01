const insertAcompanhamento = async (acompanhamento) => {

    try {
        
        //import da classe prismaClient, que é respnsavel pelas interacoes com BD
        const { PrismaClient } = require('@prisma/client')

        //instancia da classe PrismaClient
        const prisma = new PrismaClient()

        let sql = `insert into tbl_ingrediente(
            acompanhamento)
        values( 
            '${acompanhamento.acompanhamento}'
        )`
        //executa o script sql no banco de dados ($executeRawUnsafe permite encaminhar um variavel contendo um script
        const result = await prisma.$executeRawUnsafe(sql)

        // verifica se o script foi executado com sucesso no banco de dados
        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {

        return false

    } 
    
    
}

//funcao para atualizar um registro no banco de dados
const updateAcompanhamento = async (acompanhamento) => {

    try {

        //import da classe prismaClient, que é respnsavel pelas interacoes com BD
        const { PrismaClient } = require('@prisma/client')

        //instancia da classe PrismaClient
        const prisma = new PrismaClient()

        let sql = `update tbl_ingrediente set 
        acompanhamento = '${acompanhamento.acompanhamento}'  where id = '${acompanhamento.id}'`
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

//funcao para deletar um registro no banco de dados
const deleteAcompanhamento = async (id) => {
    try {

        //import da classe prismaClient, que é respnsavel pelas interacoes com BD
        const { PrismaClient } = require('@prisma/client')

        //instancia da classe PrismaClient
        const prisma = new PrismaClient()

        let sql = `delete from tbl_ingrediente where id = ${id};`

        //executa o script sql no banco de dados ($executeRawUnsafe permite encaminhar um variavel contendo um script)
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

//funcao para retornar todos os registros do banco de dados
const selectAllAcompanhamento = async () => {

    //import da classe prismaClient, que é respnsavel pelas interacoes com BD
    const { PrismaClient } = require('@prisma/client')

    //instancia da classe PrismaClient
    const prisma = new PrismaClient()


    const rsAcompanhamento = await prisma.$queryRaw`select cast(id as float) as id, acompanhamento from tbl_ingrediente`

    if (rsAcompanhamento.length > 0)
        return rsAcompanhamento

    else
        return false



}
const selectByIDAcompanhamento = async (id) => {

    //import da classe prismaClient, que é respnsavel pelas interacoes com BD
    const { PrismaClient } = require('@prisma/client')

    //instancia da classe PrismaClient
    const prisma = new PrismaClient()

    let sql = `select cast(id as float) as 
        id, 
        acompanhamento,
         tbl_ingrediente
        where id = ${id};
    `

    //atraves de um script SQL (select)
    const rsAcompanhamento = await prisma.$queryRawUnsafe(sql)

    if (rsAcompanhamento.length > 0) {
        return rsAcompanhamento
    }
    else {
        return false
    }
}

module.exports = { selectAllAcompanhamento, insertAcompanhamento, updateAcompanhamento, deleteAcompanhamento, selectByIDAcompanhamento}