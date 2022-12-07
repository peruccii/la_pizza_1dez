
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertContact = async (mensagem) => {
    try {

    const { PrismaClient } = require('@prisma/client')

    const prisma = new PrismaClient();

    const sql = `insert into tbl_contato(nome, email,numero,telefone, mensagem, id_ddd)
                values( '${mensagem.nome}','${mensagem.email}','${mensagem.numero}','${mensagem.telefone}','${mensagem.mensagem}', ${mensagem.id_ddd})`;
                
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

const updateContact = async (contato) => {
    try {
        
    const sql = `update tbl_contato set nome = '${contato.nome}', email = '${contato.email}', numero = '${contato.numero}', telefone = '${contato.telefone}', mensagem = '${contato.mensagem}' where id = ${contato.id}`
       
    const result = await prisma.$executeRawUnsafe(sql)
        
    if(result){
        return true
    }else{
        return false
    }

    }catch (error) {
      return false
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

  

    if (search){
        return search
    }else{
        return false
    }

}



module.exports = {
    selectAllContacts,
    insertContact,
    deleteContact,
    selectContactByID,
    updateContact
}