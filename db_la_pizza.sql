create database db_la_pizza;

use db_la_pizza;

show tables;

create table tbl_produto(
id int not null auto_increment primary key,
nome varchar (80) not null,
preco varchar(10) not null,
status_promocao int,
status_favoritos int,
unique index(id)
);

create table tbl_pizza(
id int not null auto_increment primary key,
descricao varchar(200) not null,
id_produto int not null,

constraint FK_produto_pizza
foreign key (id_produto)
	references tbl_produto (id),    
	unique index(id)
);

create table tbl_bebida(
id int not null auto_increment primary key,
litragem double,
teor_alcoolico double,
id_produto int not null,

constraint FK_produto_bebida
foreign key (id_produto)
	references tbl_produto (id), 

unique index(id)
);

create table tbl_ingrediente(
id int not null auto_increment primary key,
acompanhamento varchar(150),
nome varchar(80) not null,
unique index(id)
);

create table tbl_pizza_ingrediente(
id int not null auto_increment primary key,
id_pizza int not null,
constraint FK_pizza_ingrediente
	foreign key (id_pizza)
	references tbl_pizza (id),
    
id_ingrediente int not null,
constraint FK_ingrediente_pizza
	foreign key (id_ingrediente)
    references tbl_ingrediente (id),
unique index(id)
);

create table tbl_login(
id int not null auto_increment primary key,
usuario varchar(70) not null,
senha varchar(70) not null,
unique index(id)
);

create table tbl_servico(
id int not null auto_increment primary key,
nome varchar(50) not null,
descricao varchar(155),
unique index(id)
);

create table tbl_contato(
id int not null auto_increment primary key,
nome varchar(70) not null,
email varchar(256) not null,
mensagem varchar(200),

id_celular int not null,

constraint FK_celular_contato

foreign key (id_celular)
	references tbl_celular (id),
    
	id_telefone int not null,
	constraint FK_telefone_contato
foreign key (id_telefone)
	references tbl_telefone (id),

unique index(id)
);

create table tbl_celular(
id int not null auto_increment primary key,
ddd int,
celular varchar(20),
unique index(id)
);

create table tbl_telefone(
id int not null auto_increment primary key,
numero varchar(20),
unique index(id)
);

create table tbl_sugestao(
id int not null auto_increment primary key,
sugestao varchar(200),
critica varchar(150),

id_produto int not null,

constraint FK_produto_sugestao

foreign key (id_produto)
	references tbl_produto (id),

unique index(id)
);