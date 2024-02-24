create database LabQershor01
use LabQershor01

create table Sektori(
	SektoriID int not null primary key,
	EmriSektorit varchar(50),
	Created_at datetime,
	Updated_at datetime
)


create table Infiermeria(
	InfiermeriaID int not null primary key,
	SektoriID int not null references Sektori(SektoriID),
	Kapaciteti char(2) not null,
	Created_at datetime,
	Updated_at datetime
)
select * from Infiermeria
insert into Infiermeria values (2,1,'20','2023-06-04 17:59:15.077','2023-06-04 17:59:15.077')

create table Drejtori(
	DrejtoriID int not null primary key,
	SektoriID int not null references Sektori(SektoriID) unique,
	Emri varchar(40) not null,
	Mbiemri varchar(40), 
	Adresa varchar(500),
	DateLindja datetime,
	Gjinia char(1),
	check (Gjinia IN('M','F')),
	Created_at datetime,
	Updated_at datetime
)
select * from Sektori
insert into Drejtori values(2,15,'arber','ejupi','Lipjan','2001-02-08','M','2023-06-04 14:04:36.957','2023-06-04 14:04:36.957')
select * from Drejtori
alter table Mjeku
drop column [Image] 

create table Oficeri(
	OficeriID int not null primary key,
	Emri varchar(40) not null,
	Mbiemri varchar(40), 
	Adresa varchar(500),
	DateLindja date,
	Gjinia char(1),
	check (Gjinia IN('M','F')),
	Created_at datetime,
	Updated_at datetime
)
select * from Users

create table Mjeku(
	MjekuID int not null primary key,
	Emri varchar(40) not null,
	Mbiemri varchar(40), 
	Adresa varchar(500),
	DateLindja date,
	Gjinia char(1),
	check (Gjinia IN('M','F')),
	GradaAkademike varchar(50),
	Created_at datetime,
	Updated_at datetime
)


create table Qelia(
	QeliaID int not null primary key,
	EmriQelis varchar(50) not null,
	KapacitetiTeBurgosurve varchar(40),
	SektoriID int not null references Sektori(SektoriID),
	Created_at datetime,
	Updated_at datetime
)
alter table Qelia
add EmriQelis varchar(50)
select * from Qelia

create table Burgosuri(
	BurgosuriID int not null primary key,
	Emri varchar(50) not null,
	Mbiemri varchar(50) not null,
	Adresa varchar(500), 
	DataHyrjes date not null,
	DataDaljes date not null,
	DateLindja date not null,
	QeliaID int not null foreign key references Qelia(QeliaID),
	Gjinia char(1),
	check (Gjinia IN('M','F')),
	Created_at datetime,
	Updated_at datetime
)

create table Krimi (
	KrimiID int identity(1,1),
	BurgosuriID int not null foreign key references Burgosuri(BurgosuriID),
	DataKrimit date not null,
	LlojiKrimit varchar(50),
	Created_at datetime,
	Updated_at datetime
)
insert into Krimi values (1,'2001-02-02','Vrasje e lehy', '2001-02-02','2001-02-02')

create table Kontrolla(
	KontrollaID int identity (1,1),
	MjekuID int not null references Mjeku(MjekuID),
	BurgosuriID int not null references Burgosuri(BurgosuriID),
	InfiermeriaID int not null references Infiermeria(InfiermeriaID),
	[Data] date not null,
	Arsyeja varchar(50) not null,
	Created_at datetime,
	Updated_at datetime,
)

select * from Krimi

select* from Drejtori



create table Vizitori(
	VizitoriID int not null primary key,
	Emri varchar(50) not null,
	Mbiemri varchar(50),
	Adresa varchar(500),
	Created_at datetime,
	Updated_at datetime
)


create table Vizita(
	VizitaID int identity(1,1),
	VizitoriID int not null foreign key references Vizitori(VizitoriID),
	BurgosuriID int not null foreign key references Burgosuri(BurgosuriID),
	Afersia varchar(50),
	[Data] date,
	KohaFillimit NVARCHAR(50),
	KohaMbarimit NVARCHAR(50),
	OficeriID int not null foreign key references Oficeri(OficeriID),
	Created_at datetime,
	Updated_at datetime
)
select* from Vizita

alter table Vizita
add  KohaMbarimit time
select * from Vizita

create table Mbikqyre(
	OficeriID int not null foreign key references Oficeri(OficeriID),
	VizitaID int not null foreign key references Vizita(VizitaID),
	primary key(OficeriID, VizitaID)
)

SET IDENTITY_INSERT Users ON;
create table Users(
userId int IDENTITY(1,1),
username varchar(30) not null unique ,
firstName varchar(30) not null,
lastName varchar(30) not null,
email varchar(50) null unique,
password varchar(200) not null,
refreshToken varchar(500) not null,
tokenCreated datetime2 not null,
tokenExpires datetime2 not null,
roleName varchar(30) not null foreign key references Role(roleName),
Created_at datetime,
Updated_at datetime
);

create table Role(
roleId int not null identity(1,1),
roleName varchar(30) not null primary key
);
select * from Role
insert into Role values('Officer');

SET IDENTITY_INSERT Role on;
select * from Users
delete from Users where UserID=2
select* from Role
delete from Role where roleId=2

create table Lenda(
 LendaId int identity(1,1) primary key,
 Emri varchar(50)
 )
 /*
 create table Profesori(
   ProfesoriId int identity (1,1),
   Emri varchar (50),
   LendaId int not null foreign key references Lenda(LendaId)
 )
 */
 drop table Profesori
CREATE TABLE Profesori (
    ProfesoriId INT IDENTITY (1,1) PRIMARY KEY,
    Emri VARCHAR(50),
    LendaId INT NOT NULL,
    FOREIGN KEY (LendaId) REFERENCES Lenda(LendaId)
);

select * from Lenda
select * from Profesori

insert into Profesori values('Blerim', 7);



create table Ndertesa(
	NdertesaId int identity(1,1) primary key,
	Emri varchar(50),
	DataPranimitTeknik int
)
create table Lifti(
	LiftiId int identity(1,1) primary key,
	Emri varchar(50),
	NdertesaId int not null foreign key  references Ndertesa(NdertesaId)
)
drop table Lifti


create table Shitorja (
 ShitorjaId int identity(1,1) primary key,
 emri varchar(50),
 DataEHapjas int
)

create table Shitesi (
 ShitesiId int identity(1,1) primary key,
 emri varchar(50),
 ShitorjaId int not null foreign key references Shitorja(ShitorjaId)
)