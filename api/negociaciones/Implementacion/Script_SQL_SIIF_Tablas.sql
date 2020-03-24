USE SIIF
GO

CREATE TABLE BitacoraError
(
	BitacoraId int IDENTITY(1,1) PRIMARY KEY,
	ModuloId int,
	NombreModulo varchar(300),
	FuncionId int,
	NombreFuncion varchar(300),
	ErrorSQLId int,
	GravedadError int,
	EstadoError int,
	Procedimiento varchar(128),
	NumeroLinea int,
	MensajeError nvarchar(4000),
	Fecha datetime DEFAULT GETDATE()
	CONSTRAINT FK_BitacoraError_ModuloId FOREIGN KEY (ModuloId)
	REFERENCES Modulo(ModuloId)
)
GO
GRANT SELECT, INSERT, UPDATE ON BitacoraError TO PUBLIC
GO

CREATE TABLE LinkServer
(
	IdLinkServer smallint NOT NULL PRIMARY KEY,
	NombreLink varchar(50) NOT NULL,
	BD varchar(50) NOT NULL,
	Activo bit DEFAULT 1,
	UsuarioCreacionId int,
	FechaCreacionId DATETIME,
	UsuarioModificacionId int,
	FechaModificacion DATETIME,
	CONSTRAINT FK_LinkServer_UsuarioCreacionId FOREIGN KEY (UsuarioCreacionId)
	REFERENCES Empleado(NoEmpleado),
	CONSTRAINT FK_LinkServer_UsuarioModificacionId FOREIGN KEY (UsuarioModificacionId)
	REFERENCES Empleado(NoEmpleado)
)

CREATE TABLE TipoDato
(
	IdTipoDato int identity(1,1) NOT NULL PRIMARY KEY,
	Descripcion varchar(100) NOT NULL,
	EmpleadoCreacionId int,
	FechaCreacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	EmpleadoModificacionId int DEFAULT NULL,
	FechaModificacion DATETIME DEFAULT NULL,
	CONSTRAINT FK_TipoDato_EmpleadoCreacionId FOREIGN KEY (EmpleadoCreacionId)
	REFERENCES Empleado(NoEmpleado),
	CONSTRAINT FK_TipoDato_EmpleadoModificacionId FOREIGN KEY (EmpleadoModificacionId)
	REFERENCES Empleado(NoEmpleado)
)

CREATE TABLE TipoDatoDetalle
(
	IdTipoDatoDetalle int identity(1,1) NOT NULL PRIMARY KEY,
	Clave varchar(100) NOT NULL,
	Descripcion varchar(100) NOT NULL,
	Orden int,
	TipoDatoId int NOT NULL,
	EmpleadoCreacionId int,
	FechaCreacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	EmpleadoModificacionId int DEFAULT NULL,
	FechaModificacion DATETIME DEFAULT NULL,
	CONSTRAINT FK_TipoDatoDetalle_TipoDatoId FOREIGN KEY (TipoDatoId)
	REFERENCES TipoDato(IdTipoDato),
	CONSTRAINT FK_TipoDatoDetalle_EmpleadoCreacionId FOREIGN KEY (EmpleadoCreacionId)
	REFERENCES Empleado(NoEmpleado),
	CONSTRAINT FK_TipoDatoDetalle_EmpleadoModificacionId FOREIGN KEY (EmpleadoModificacionId)
	REFERENCES Empleado(NoEmpleado)
)

CREATE TABLE Familia
(
	IdFamilia int identity(1,1) NOT NULL PRIMARY KEY,
	Nombre varchar(100) NOT NULL,
	Activo bit NOT NULL DEFAULT 1,
	EmpleadoCreacionId int,
	FechaCreacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	EmpleadoModificacionId int DEFAULT NULL,
	FechaModificacion DATETIME DEFAULT NULL,
	CONSTRAINT FK_Familia_EmpleadoCreacionId FOREIGN KEY (EmpleadoCreacionId)
	REFERENCES Empleado(NoEmpleado),
	CONSTRAINT FK_Familia_EmpleadoModificacionId FOREIGN KEY (EmpleadoModificacionId)
	REFERENCES Empleado(NoEmpleado)
)

CREATE TABLE SubFamiliaAsignada
(
	FamiliaId int NOT NULL,
	SubFamiliaId varchar(8) NOT NULL,
	CONSTRAINT FK_SubFamiliaAsignada_FamiliaId FOREIGN KEY (FamiliaId)
	REFERENCES Familia(IdFamilia),
	CHECK (SubFamiliaId LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9]')
)

CREATE TABLE Parametros
(
	IdParametro int NOT NULL PRIMARY KEY,
	Clave varchar(5) NOT NULL,
	Descripcion varchar(100) NOT NULL,
	Valor nvarchar(4000) NOT NULL,
	ModuloId int ,
	EmpleadoCreacionId int,
	FechaCreacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	EmpleadoModificacionId int DEFAULT NULL,
	FechaModificacion DATETIME DEFAULT NULL,
	CONSTRAINT FK_Parametros_ModuloId FOREIGN KEY (ModuloId)
	REFERENCES Modulo(ModuloId),
	CONSTRAINT FK_Parametros_EmpleadoCreacionId FOREIGN KEY (EmpleadoCreacionId)
	REFERENCES Empleado(NoEmpleado),
	CONSTRAINT FK_Parametros_EmpleadoModificacionId FOREIGN KEY (EmpleadoModificacionId)
	REFERENCES Empleado(NoEmpleado),
	CONSTRAINT [el registro Valor debe de ser de tipo JSON]
	CHECK (ISJSON(Valor) = 1)
)

CREATE TABLE LayoutPrototipo
(
	Id int identity(1,1) NOT NULL PRIMARY KEY,
	--Columna varchar(50) NOT NULL,
	--TipoDato varchar(50) NOT NULL,
	Contenido nvarchar(4000) NOT NULL,
	CONSTRAINT [el registro detalle debe de ser de tipo JSON]
	CHECK (ISJSON(Contenido) = 1)
)

CREATE TABLE Explosion
(
	IdExplosion int identity(1,1) PRIMARY KEY,
	Nombre varchar(150) NOT NULL,
	Insumos smallint NOT NULL,
	PlazaId int NOT NULL,
	EmpleadoCreacionId int,
	FechaCreacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT FK_Explosion_PlazaId FOREIGN KEY (PlazaId)
	REFERENCES Plaza(IdPlaza),
	CONSTRAINT FK_Explosion_EmpleadoCreacionId FOREIGN KEY (EmpleadoCreacionId)
	REFERENCES Empleado(NoEmpleado)
)

CREATE TABLE ExplosionDetalle
(
	IdExplosionDetalle int identity(1,1) PRIMARY KEY,
	InsumoId numeric(7,0) NOT NULL,
	Cantidad numeric(16,6) NOT NULL DEFAULT 0.0000,
	Enero numeric(16,6),
	Febrero numeric(16,6),
	Marzo numeric(16,6),
	Abril numeric(16,6),
	Mayo numeric(16,6),
	Junio numeric(16,6),
	Julio numeric(16,6),
	Agosto numeric(16,6),
	Septiembre numeric(16,6),
	Octubre numeric(16,6),
	Noviembre numeric(16,6),
	Diciembre numeric(16,6),
	ExplosionId int,
	EmpleadoCreacionId int,
	FechaCreacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	/*CONSTRAINT FK_ExplosionSIIF_InsumoId FOREIGN KEY (InsumoId)
	REFERENCES [08].[EK_ADM08_11].dba.insumos(insumo),*/
	CONSTRAINT FK_ExplosionDetalle_ExplosionId_Cascade FOREIGN KEY (ExplosionId)
	REFERENCES Explosion(IdExplosion) ON DELETE CASCADE,
	CONSTRAINT FK_ExplosionDetalle_EmpleadoCreacionId FOREIGN KEY (EmpleadoCreacionId)
	REFERENCES Empleado(NoEmpleado)
)


CREATE TABLE ExplosionHistorico
(
	IdExplosionHistorico int identity(1,1) PRIMARY KEY,
	Nombre varchar(150) NOT NULL,
	Insumos smallint NOT NULL,
	PlazaId int NOT NULL,
	EmpleadoCreacionId int,
	FechaCreacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT FK_ExplosionHistorico_PlazaId FOREIGN KEY (PlazaId)
	REFERENCES Plaza(IdPlaza),
	CONSTRAINT FK_ExplosionHistorico_EmpleadoCreacionId FOREIGN KEY (EmpleadoCreacionId)
	REFERENCES Empleado(NoEmpleado)
)

CREATE TABLE ExplosionDetalleHistorico
(
	IdExplosionDetalleHistorico int identity(1,1) PRIMARY KEY,
	InsumoId numeric(7,0) NOT NULL,
	Cantidad numeric(16,6) NOT NULL DEFAULT 0.0000,
	Enero numeric(16,6),
	Febrero numeric(16,6),
	Marzo numeric(16,6),
	Abril numeric(16,6),
	Mayo numeric(16,6),
	Junio numeric(16,6),
	Julio numeric(16,6),
	Agosto numeric(16,6),
	Septiembre numeric(16,6),
	Octubre numeric(16,6),
	Noviembre numeric(16,6),
	Diciembre numeric(16,6),
	ExplosionHistoricoId int,
	EmpleadoCreacionId int,
	FechaCreacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	/*CONSTRAINT FK_ExplosionSIIF_InsumoId FOREIGN KEY (InsumoId)
	REFERENCES [08].[EK_ADM08_11].dba.insumos(insumo),*/
	CONSTRAINT FK_ExplosionDetalleHistorico_ExplosionHistoricoId_Cascade FOREIGN KEY (ExplosionHistoricoId)
	REFERENCES ExplosionHistorico(IdExplosionHistorico) ON DELETE CASCADE,
	CONSTRAINT FK_ExplosionDetalleHistorico_EmpleadoCreacionId FOREIGN KEY (EmpleadoCreacionId)
	REFERENCES Empleado(NoEmpleado)
)


ALTER TABLE Plaza ADD IdPlazaFincasin smallint

/* Se reemplaza por cambio en la logica del manejo de explosiones
CREATE TABLE PrototipoSIIF
(
	IdPrototipo int PRIMARY KEY,
	UsuarioModificacionId int DEFAULT NULL,
	FechaModificacion DATETIME DEFAULT NULL,
	CONSTRAINT FK_PrototipoSIIF_EmpleadoModificacionId FOREIGN KEY (UsuarioModificacionId)
	REFERENCES Empleado(NoEmpleado)
)


CREATE TABLE ExplosionSIIF
(
	IdExplosion int identity(1,1) PRIMARY KEY,
	Nombre varchar(100) NOT NULL,
	Ruta varchar(250) NOT NULL,
	insumos varchar(MAX),
	Version varchar(9) NOT NULL DEFAULT DATEPART(YEAR,GETDATE())+'.0',
	Estatus char(1) NOT NULL DEFAULT 'A',
	Activo bit NOT NULL DEFAULT 1,
	UsuarioCreacionId int,
	FechaCreacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	UsuarioModificacionId int DEFAULT NULL,
	FechaModificacion DATETIME DEFAULT NULL,
	CONSTRAINT FK_PrototipoSIIF_UsuarioCreacionId FOREIGN KEY (UsuarioCreacionId)
	REFERENCES Empleado(NoEmpleado),
	CONSTRAINT FK_PrototipoSIIF_UsuarioModificacionId FOREIGN KEY (UsuarioModificacionId)
	REFERENCES Empleado(NoEmpleado)
)


CREATE TABLE PrototipoSIIFDetalle
(
	IdPrototipoDetalle int identity(1,1) NOT NULL PRIMARY KEY,
	PrototipoId int,
	ExplosionId int,
	CONSTRAINT FK_PrototipoSIIFDetalle_PrototipoId FOREIGN KEY (PrototipoId)
	REFERENCES PrototipoSIIF(IdPrototipo),
	CONSTRAINT FK_PrototipoSIIFDetalle_ExplosionId FOREIGN KEY (ExplosionId)
	REFERENCES ExplosionSIIF(IdExplosion)
)
*/



/*
INSERT INTO Familia (Nombre, EmpleadoCreacionId)
VALUES ('Obra Negra', 25919);
INSERT INTO Familia (Nombre, EmpleadoCreacionId)
VALUES ('Obra Gris', 25919);
INSERT INTO Familia (Nombre, EmpleadoCreacionId)
VALUES ('Obra Blanca', 25919);
*/
/*
CREATE TABLE grupos_insumo
(
	tipo_insumo numeric(1,0),
	grupo_insumo numeric(2,0),
	descripcion char(50)
)
*/