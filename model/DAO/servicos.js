const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllServicos = async function() {
    
    const { PrismaClient } = require('@prisma/client')

    const prisma = new PrismaClient()

    const sql = `select cast(id as float) as id, foto, nome, descricao from tbl_servico order by id desc` 

   
    const rsServicos = await prisma.$queryRawUnsafe(sql)

    if (rsServicos.length > 0) {
        return rsServicos
    } else{
        return false
    }
}

const selectServiceByID = async (id) => {

    const { PrismaClient } = require('@prisma/client')

    const prisma = new PrismaClient()

    const sql = `select * from tbl_servico where id = ${id}`
    const search = await prisma.$queryRawUnsafe(sql)

  

    if (search){
        return search
    }else{
        return false
    }

}

const deleteService = async (id) => {
    try {

     const { PrismaClient } = require('@prisma/client')

    const prisma = new PrismaClient();

    let sql = `delete from tbl_servico where id = '${id}'`;

    const result = await prisma.$executeRawUnsafe (sql);
    

        if (result) {
        return true;
        }else
            return false;
                                
    }catch (error) {
        return false;
    }                     
}

const insertService = async (servico) => {
    try {

    const { PrismaClient } = require('@prisma/client')

    const prisma = new PrismaClient();

    const sql = `insert into tbl_servico(foto, nome, descricao)
                values( '${servico.foto}','${servico.nome}','${servico.descricao}')`;
                
    const result = await prisma.$executeRawUnsafe (sql);
   
    if (result) {
        return true;
    }else
        return false;

    }catch (error) {
        return false;
    }
}

const updateService = async (servico) => {
    try {
        
    const sql = `update tbl_servico set foto = '${servico.foto}', nome = '${servico.nome}', descricao = '${servico.descricao}' where id = ${servico.id}`
       
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

module.exports = {
    selectAllServicos,
    selectServiceByID,
    deleteService,
    insertService,
    updateService
}