
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertContact = async (mensagem) => {
    try {

    const { PrismaClient } = require('@prisma/client')

    const prisma = new PrismaClient();

    let sql = `insert into tbl_contato(nome, email, mensagem)
                values( '${mensagem.nome}','${mensagem.email}','${mensagem.texto}')`;

    const result = await prisma.$executeRawUnsafe (sql);

    if (result) {
        return true;
    }else
        return false;

    }catch (error) {
        return false;
    }
}

const deleteContact = async (id) => {
    try {

     const { PrismaClient } = require('@prisma/client')

    const prisma = new PrismaClient();

    let sql = `delete from tbl_contato where id = '${id}'`;

    const result = await prisma.$executeRawUnsafe (sql);
    

        if (result) {
        return true;
        }else
            return false;
                                
    }catch (error) {
        return false;
    }                     
}

const selectAllContacts = async () => {
    const sql = `select * from tbl_contato order by id desc`
    const dadosC = await prisma.$queryRawUnsafe(sql)

    if (dadosC.length > 0) {
        return dadosC
    } else{
        return false
    }
}

const selectContactByID = async (id) => {

    const { PrismaClient } = require('@prisma/client')

    const prisma = new PrismaClient()

    const sql = `select * from tbl_contato where id = ${id}`
    const search = await prisma.$queryRawUnsafe(sql)

  

    if (search.length > 0){
        return search
    }else{
        return false
    }

}

module.exports = {
    selectAllContacts,
    insertContact,
    deleteContact,
    selectContactByID
}