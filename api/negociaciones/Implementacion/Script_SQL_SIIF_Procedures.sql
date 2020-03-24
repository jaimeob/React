USE SIIF
GO

IF OBJECT_ID(N'plng_ActualizarEstatusFamilia',N'P') IS NOT NULL
	DROP PROCEDURE plng_ActualizarEstatusFamilia
GO
CREATE PROCEDURE plng_ActualizarEstatusFamilia
(@IdFamilia varchar(4000), @Estatus bit)
/*******************************************************************************
Desarrollador:  Juan Carlos Martini Manjarrez.
Modificacion:   N/A
Creacion:       2019/05/21
Descripcon:     Obtener listado de familias.
Sistema:        SIF WEB
Modulo:         Fincamex.SIIF.Negociaciones
*******************************************************************************/
AS
BEGIN
	BEGIN TRY

		DECLARE @QueryUpdate varchar(4000)

		SET @QueryUpdate = 'UPDATE Familia SET Activo = <estatus> ' +
						   'WHERE 1=1 ' +
						   'AND IdFamilia IN (<familias>)';
		SET @QueryUpdate = REPLACE(@QueryUpdate, '<estatus>', @Estatus)
		SET @QueryUpdate = REPLACE(@QueryUpdate, '<familias>', @IdFamilia)
		EXEC(@QueryUpdate);

		SELECT 0 AS 'Codigo', 'exito' AS 'Mensaje'

	END TRY
	BEGIN CATCH

		INSERT INTO BitacoraError ( ModuloId, NombreModulo, FuncionId
			, NombreFuncion, ErrorSQLId, GravedadError, EstadoError
			, Procedimiento, NumeroLinea, MensajeError )
		SELECT 13, 'Negociaciones', 0, 'Actualizar Estatus de Familia'
		, ERROR_NUMBER(), ERROR_SEVERITY(), ERROR_STATE(), 'plng_ActualizarEstatusFamilia'--ERROR_PROCEDURE()
		, ERROR_LINE(), ERROR_MESSAGE()

		SELECT ERROR_NUMBER() AS 'Codigo', ERROR_MESSAGE() AS 'Mensaje'
	END CATCH
END
GO
GRANT EXECUTE ON plng_ActualizarEstatusFamilia TO PUBLIC
GO

IF OBJECT_ID(N'plng_GrabarAsignacionSubFamilias',N'P') IS NOT NULL
	DROP PROCEDURE plng_GrabarAsignacionSubFamilias
GO
CREATE PROCEDURE plng_GrabarAsignacionSubFamilias
(@IdFamilia int, @NombreFamilia varchar(100), @Empleado int, @SubFamilias nvarchar(MAX))
/*******************************************************************************
Desarrollador:  Juan Carlos Martini Manjarrez.
Modificacion:   N/A
Creacion:       2019/05/28
Descripcon:     Graba o borra las subfamilias agregadas o eliminadas a la familia.
Sistema:        SIF WEB
Modulo:         Fincamex.SIIF.Negociaciones
*******************************************************************************/
AS
BEGIN
	/*DECLARE @SubFamilias nvarchar(4000) = '[
		{"Id": '0010001', "Nombre": "juan" },
		{"Id": '0010002', "Nombre": "paty"},
		{"Id": '0010003', "Nombre": "pepe"},
		{"Id": '0010004', "Nombre": "pedro"},
		{"Id": '0010005', "Nombre": "ana"}
	]'*/
	BEGIN TRY
		IF (@IdFamilia = 0)
		BEGIN

			IF EXISTS ( SELECT Nombre
						FROM Familia
						WHERE UPPER(Nombre) = LTRIM(RTRIM(UPPER(@NombreFamilia))))
			BEGIN
				SELECT 1 AS 'Codigo', 'El nombre de la familia esta siendo usado' AS 'Mensaje'
			END
			ELSE
			BEGIN
				INSERT INTO Familia(Nombre,EmpleadoCreacionId)
				SELECT @NombreFamilia, @Empleado

				SET @IdFamilia = SCOPE_IDENTITY();
			
				INSERT INTO SubFamiliaAsignada (FamiliaId, SubFamiliaId)
				SELECT
				@IdFamilia,
				Id
				FROM OPENJSON (@SubFamilias)
				WITH (Id varchar(8) '$.Id')

				SELECT 0 AS 'Codigo', 'exito' AS 'Mensaje'
			END

		END
		ELSE
		BEGIN
			
			DELETE FROM SubFamiliaAsignada WHERE FamiliaId = @IdFamilia

			INSERT INTO SubFamiliaAsignada (FamiliaId, SubFamiliaId)
			SELECT
			@IdFamilia,
			Id
			FROM OPENJSON (@SubFamilias)
			WITH (Id varchar(8) '$.Id')

			SELECT 0 AS 'Codigo', 'exito' AS 'Mensaje'
		END

	END TRY
	BEGIN CATCH

		INSERT INTO BitacoraError ( ModuloId, NombreModulo, FuncionId
			, NombreFuncion, ErrorSQLId, GravedadError, EstadoError
			, Procedimiento, NumeroLinea, MensajeError )
		SELECT 13, 'Negociaciones', 0, 'Asignar subfamilias'
		, ERROR_NUMBER(), ERROR_SEVERITY(), ERROR_STATE(), 'plng_GrabarAsignacionSubFamilias'--ERROR_PROCEDURE()
		, ERROR_LINE(), ERROR_MESSAGE()

		SELECT ERROR_NUMBER() AS 'Codigo', ERROR_MESSAGE() AS 'Mensaje'

	END CATCH
END
GO
GRANT EXECUTE ON plng_GrabarAsignacionSubFamilias TO PUBLIC
GO

IF OBJECT_ID(N'plng_ObtenerAniosPorcentajeImpactoNegociaciones',N'P') IS NOT NULL
	DROP PROCEDURE plng_ObtenerAniosPorcentajeImpactoNegociaciones
GO
CREATE PROCEDURE plng_ObtenerAniosPorcentajeImpactoNegociaciones
/*******************************************************************************
Desarrollador:  Juan Carlos Martini Manjarrez.
Modificacion:   N/A
Creacion:       2019/06/03
Descripcon:     Obtener Anios para consultar el procentaje de impacto.
Sistema:        SIF WEB
Modulo:         Fincamex.SIIF.Negociaciones
*******************************************************************************/
AS
BEGIN

  SELECT DISTINCT DATEPART(YEAR, FechaCreacion) AS Anio
  FROM Explosion
  UNION
  SELECT DISTINCT DATEPART(YEAR, FechaCreacion) AS Anio
  FROM ExplosionHistorico

END
GO
GRANT EXECUTE ON plng_ObtenerAniosPorcentajeImpactoNegociaciones TO PUBLIC
GO

IF OBJECT_ID(N'plng_ObtenerDiasPromedioDetalleXEmpleado',N'P') IS NOT NULL
  DROP PROCEDURE plng_ObtenerDiasPromedioDetalleXEmpleado
GO
CREATE PROCEDURE plng_ObtenerDiasPromedioDetalleXEmpleado
  (@FechaInicio date, @FechaFin date, @IdEmpleado int)
/*******************************************************************************
Desarrollador:  Juan Carlos Martini Manjarrez.
Modificacion:   N/A
Creacion:       2019/06/26
Descripcon:     Obtener el detalle de los tickes solucionados del empleado.
Sistema:        SIF WEB
Modulo:         Fincamex.SIIF.Negociaciones
*******************************************************************************/
AS
BEGIN
/*
  DECLARE @FechaInicio date = '2019-05-01',
          @FechaFin date = '2019-12-01',
          @IdEmpleado int = 4749
*/

  SELECT
    IdTicket AS Id,
    Nombre,
    FORMAT(FechaAsignacion, 'yyyy-mm-dd', 'es-MX') AS FechaAsignacion,
    FORMAT(FechaActualizacion, 'yyyy-mm-dd', 'es-MX') AS FechaActualizacion,
    DATEDIFF(DAY,FechaAsignacion,FechaActualizacion) AS DiasResolver
  FROM Ticket
  WHERE 1=1
  AND IdPlantilla IN (1,2) --CAMBIAR YA QUE VA SER 1 Y 2
  AND IdEstatus = 4 --SOLUCIONADO
  AND FechaAsignacion BETWEEN @FechaInicio AND @FechaFin
  AND FechaActualizacion BETWEEN @FechaInicio AND @FechaFin
  AND IdUsuarioAsignado = @IdEmpleado

END
GO
GRANT EXECUTE ON plng_ObtenerDiasPromedioDetalleXEmpleado TO PUBLIC
GO

IF OBJECT_ID(N'plng_ObtenerDiasPromedioNegociaciones',N'P') IS NOT NULL
  DROP PROCEDURE plng_ObtenerDiasPromedioNegociaciones
GO
CREATE PROCEDURE plng_ObtenerDiasPromedioNegociaciones (@FechaInicio date, @FechaFin date)
/*******************************************************************************
Desarrollador:  Juan Carlos Martini Manjarrez.
Modificacion:   N/A
Creacion:       2019/06/25
Descripcon:     Obtener los empleados con su promedio de dias de tickets de
                negociaciones.
Sistema:        SIF WEB
Modulo:         Fincamex.SIIF.Negociaciones
*******************************************************************************/
AS
BEGIN
/*
  DECLARE @FechaIncio DATE = '2019-05-01',
          @FechaFin DATE = '2019-12-01'
*/

  DECLARE @Anio smallint,
          @MetaDias smallint

  SET @Anio = DATEPART(YEAR,@FechaInicio);

  SELECT
  @MetaDias = CAST(JSON_value(Valor, '$.A'+cast(@Anio as varchar(4))) AS numeric(5,2))
  FROM
  Parametros
  WHERE 1=1
  AND IdParametro = 4

  ;WITH tblTicketsEmpleados (IdEmpleado, Dias)
  AS  (
        SELECT
          IdUsuarioAsignado,
          DATEDIFF(DAY,FechaAsignacion,FechaActualizacion)
        FROM Ticket
        WHERE 1=1
        AND IdPlantilla IN (1,2) --CAMBIAR YA QUE VA SER 1 Y 2
        AND IdEstatus = 4 --SOLUCIONADO
        AND FechaAsignacion BETWEEN @FechaInicio AND @FechaFin
        AND FechaActualizacion BETWEEN @FechaInicio AND @FechaFin
      )
  , tblDiasPromedio (IdEmpleado, Dias, CantTickets, Promedio, CumpleMeta)
  AS  (
        SELECT
          IdEmpleado,
          SUM(Dias),
          COUNT(IdEmpleado),
          CAST(CAST(SUM(Dias) AS DECIMAL(12,2)) / COUNT(IdEmpleado) AS DECIMAL(12,2)),
          CASE WHEN CAST(CAST(SUM(Dias) AS DECIMAL(12,2)) / COUNT(IdEmpleado) AS DECIMAL(12,2)) > @MetaDias
                  THEN 0
               ELSE 1 END
        FROM tblTicketsEmpleados
        WHERE 1=1
        GROUP BY IdEmpleado
      )

  SELECT
    DP.IdEmpleado AS Id,
    RTRIM(E.ApellidoPaterno)+' '+RTRIM(E.ApellidoMaterno)+' '+RTRIM(E.Nombre) AS Nombre,
    DP.Dias,
    DP.CantTickets,
    DP.Promedio,
    DP.CumpleMeta
  FROM tblDiasPromedio AS DP
  INNER JOIN Empleado AS E
    ON E.NoEmpleado = DP.IdEmpleado
  WHERE 1=1
  ORDER BY E.ApellidoPaterno

END
GO
GRANT EXECUTE ON plng_ObtenerDiasPromedioNegociaciones TO PUBLIC
GO

IF OBJECT_ID(N'plng_ObtenerFamilias',N'P') IS NOT NULL
	DROP PROCEDURE plng_ObtenerFamilias
GO
CREATE PROCEDURE plng_ObtenerFamilias (@estatus varchar(20) = '')
/*******************************************************************************
Desarrollador:  Juan Carlos Martini Manjarrez.
Modificacion:   N/A
Creacion:       2019/05/16
Descripcon:     Obtener listado de familias.
Sistema:        SIF WEB
Modulo:         Fincamex.SIIF.Negociaciones
*******************************************************************************/
AS
BEGIN

	SELECT
	F.IdFamilia AS 'Id',
	F.Nombre,
	COUNT(SF.FamiliaId) AS 'SubFamilias',
	CASE WHEN Activo = 1 THEN 'Activo'
		 ELSE 'Inactivo' END AS 'Estatus'
	FROM Familia AS F
	LEFT JOIN SubFamiliaAsignada AS SF
		ON SF.FamiliaId = F.IdFamilia
	WHERE 1=1
	AND Activo = CASE WHEN UPPER(@estatus) = '' THEN Activo
					  WHEN UPPER(@estatus) = 'INACTIVOS' THEN 0
					  WHEN UPPER(@estatus) = 'ACTIVOS' THEN 1 END
	GROUP BY IdFamilia, Nombre, Activo
	ORDER BY Nombre

END
GO
GRANT EXECUTE ON plng_ObtenerFamilias TO PUBLIC
GO

IF OBJECT_ID(N'plng_ObtenerFamiliasConvenio',N'P') IS NOT NULL
	DROP PROCEDURE plng_ObtenerFamiliasConvenio
GO
CREATE PROCEDURE plng_ObtenerFamiliasConvenio (@Anio Smallint)
/*******************************************************************************
Desarrollador:  Juan Carlos Martini Manjarrez.
Modificacion:   N/A
Creacion:       2019/06/06
Descripcon:     Obtiene las familias con convenio.
Sistema:        SIF WEB
Modulo:         Fincamex.SIIF.Negociaciones
*******************************************************************************/
AS
BEGIN

	IF @Anio = DATEPART(YEAR, GETDATE())
	BEGIN
		--SE OBTIENEN LAS FAMILIAS LAS CUALES CUENTAN CON INSUMOS
		--Y QUE LOS INSUMOS SE ENCUENTREN EN UNA EXPLOSION
		SELECT
		DISTINCT F.IdFamilia AS 'Id',
		F.Nombre
		FROM Familia AS F
		INNER JOIN SubFamiliaAsignada AS SF
			ON SF.FamiliaId = F.IdFamilia
		INNER JOIN insumos AS I
			ON RIGHT('000'+CAST(I.tipo AS varchar(3)), 3)+''+
			   RIGHT('0000'+CAST(I.grupo AS varchar(4)), 4) = SF.SubFamiliaId
		INNER JOIN ExplosionDetalle AS ED
			ON ED.InsumoId = I.insumo
		WHERE 1=1
		AND F.Activo = 1
    UNION ALL
    SELECT -1 AS 'Id', 'Total Edificaci'+CHAR(243)+'n'

	END
	ELSE
	BEGIN
		--SE OBTIENEN LAS ULTIMAS EXPLOSIONES POR PLAZA (ultimaExplosionxPlaza)
		--SE OBTIENEN LOS DETALLES DE LAS ULTIMAS EXPLOSIONES POR PLAZA
		-- PARA COMPARAR LOS INSUMOS CORRESPONDIENTES (explosionDetalle)
		;WITH ultimaExplosionxPlaza (IdExplosionHistorico, PlazaId, FechaCreacion)
		AS	(
				SELECT
					IdExplosionHistorico,
					PlazaId,
					MAX(FechaCreacion)
				FROM ExplosionHistorico
				WHERE 1=1
				AND DATEPART(YEAR, FechaCreacion) = @Anio
				GROUP BY
					IdExplosionHistorico,
					PlazaId
			)
		, explosionDetalle (IdDetalle, InsumoId)
		AS	(
				SELECT
					EDH.IdExplosionDetalleHistorico,
					EDH.InsumoId
				FROM ExplosionDetalleHistorico AS EDH
				INNER JOIN ultimaExplosionxPlaza AS UEP
					ON UEP.IdExplosionHistorico = EDH.ExplosionHistoricoId
				WHERE 1=1
			)
		
		--SE OBTIENEN LAS FAMILIAS DE ACUERDO A LOS INSUMOS QUE SE ENCUENTREN
		--EN LAS ULTIMAS EXPLOSIONES DEL A�O SELECCIONADO.
		SELECT
			DISTINCT F.IdFamilia AS 'Id',
			F.Nombre
		FROM Familia AS F
		INNER JOIN SubFamiliaAsignada AS SF
			ON SF.FamiliaId = F.IdFamilia
		INNER JOIN insumos AS I
			ON RIGHT('000'+CAST(I.tipo AS varchar(3)), 3)+''+
			   RIGHT('0000'+CAST(I.grupo AS varchar(4)), 4) = SF.SubFamiliaId
		INNER JOIN explosionDetalle AS EDH
			ON EDH.InsumoId = I.insumo
		WHERE 1=1
		AND F.Activo = 1
    UNION ALL
    SELECT -1 AS 'Id', 'Total Edificaci'+CHAR(243)+'n'
	END

END
GO
GRANT EXECUTE ON plng_ObtenerFamiliasConvenio TO PUBLIC
GO

IF OBJECT_ID(N'plng_ObtenerMetaDiasPromedio',N'P') IS NOT NULL
  DROP PROCEDURE plng_ObtenerMetaDiasPromedio
GO
CREATE PROCEDURE plng_ObtenerMetaDiasPromedio (@Anio smallint)
/*******************************************************************************
Desarrollador:  Juan Carlos Martini Manjarrez.
Modificacion:   N/A
Creacion:       2019/06/25
Descripcon:     Obtener la meta de dias promedio para responder tickets.
Sistema:        SIF WEB
Modulo:         Fincamex.SIIF.Negociaciones
*******************************************************************************/
AS
BEGIN
  --DECLARE @Anio smallint = 2019

  SELECT
  CAST(JSON_value(Valor, '$.A'+cast(@Anio as varchar(4))) AS numeric(5,2)) AS Dias
  FROM
  Parametros
  WHERE 1=1
  AND IdParametro = 4

END
GO
GRANT EXECUTE ON plng_ObtenerMetaDiasPromedio TO PUBLIC
GO

IF OBJECT_ID(N'plng_ObtenerMetaPorcentajeAhorro',N'P') IS NOT NULL
	DROP PROCEDURE plng_ObtenerMetaPorcentajeAhorro
GO
CREATE PROCEDURE plng_ObtenerMetaPorcentajeAhorro (@Anio smallint)
/*******************************************************************************
Desarrollador:  Juan Carlos Martini Manjarrez.
Modificacion:   N/A
Creacion:       2019/06/17
Descripcon:     Obtener la meta de % de ahorro de acuerdo al anio.
Sistema:        SIF WEB
Modulo:         Fincamex.SIIF.Negociaciones
*******************************************************************************/
AS
BEGIN
	--DECLARE @Anio smallint = 2019

	SELECT
	CAST(JSON_value(Valor, '$.A'+cast(@Anio as varchar(4))) AS numeric(5,2)) AS Porcentaje
	FROM
	Parametros
	WHERE 1=1
	AND IdParametro = 3

END
GO
GRANT EXECUTE ON plng_ObtenerMetaPorcentajeAhorro TO PUBLIC
GO

IF OBJECT_ID(N'plng_ObtenerPorcentajeAhorro',N'P') IS NOT NULL
	DROP PROCEDURE plng_ObtenerPorcentajeAhorro
GO
CREATE PROCEDURE plng_ObtenerPorcentajeAhorro (@Anio smallint)
/*******************************************************************************
Desarrollador:  Juan Carlos Martini Manjarrez.
Modificacion:   N/A
Creacion:       2019/06/18
Descripcon:     Obtenie el porcentaje de ahorro del anio por plaza.
Sistema:        SIF WEB
Modulo:         Fincamex.SIIF.Negociaciones
*******************************************************************************/
AS
BEGIN
	--DECLARE @Anio smallint = 2019

	SELECT
	CAST(JSON_value(Valor, '$.A'+cast(@Anio as varchar(4))) AS numeric(5,2)) AS Porcentaje
	FROM
	Parametros
	WHERE 1=1
	AND IdParametro = 3

END
GO
GRANT EXECUTE ON plng_ObtenerPorcentajeAhorro TO PUBLIC
GO

IF OBJECT_ID(N'plng_ObtenerPorcentajeAhorroPlazas',N'P') IS NOT NULL
  DROP PROCEDURE plng_ObtenerPorcentajeAhorroPlazas
GO
CREATE PROCEDURE plng_ObtenerPorcentajeAhorroPlazas
  (@FechaInicio DATE, @FechaFin DATE)
/*******************************************************************************
Desarrollador:  Juan Carlos Martini Manjarrez.
Modificacion:   N/A
Creacion:       2019/06/19
Descripcon:     Obtener el rango de fechas del porcentaje de ahorro.
Sistema:        SIF WEB
Modulo:         Fincamex.SIIF.Negociaciones
*******************************************************************************/
AS
BEGIN
/*
  DECLARE @FechaInicio DATE = '2019-01-01',
          @FechaFin DATE = '2019-06-08'
*/

  DECLARE @Query nvarchar(500),
          @Anio SMALLINT = DATEPART(YEAR, @FechaInicio),
          @Meta numeric(16,6)

  SELECT
  @Meta = CAST(JSON_value(Valor, '$.A'+cast(@Anio as varchar(4))) AS numeric(5,2))
  FROM
  Parametros
  WHERE 1=1
  AND IdParametro = 3

  DECLARE @tblSybase TABLE
  (
    PlazaId char(5),
    NombrePlaza varchar(50),
    Cantidad numeric(16,6),
    ImporteCompra numeric(16,6),
    ImponteCompraIA numeric(16,6),
    ImponteCompraIC numeric(16,6),
    ImporteActual numeric(16,6),
    ImporteConvenio numeric(16,6),
    VsBase numeric(16,6),
    VsConvenio numeric(16,6),
    Ahorro numeric(16,6),
    PorcentAhorro numeric(16,6)
  )

  BEGIN TRY
    SET @Query = 'SELECT PlazaId, NombrePlaza, Cantidad, ImporteCompra,'+
                 'ImponteCompraIA, ImponteCompraIC, ImporteActual, ImporteConvenio, '+
                 'VsBase, VsConvenio, Ahorro, PorcentAhorro '+
                 'FROM OPENQUERY([08], '+
                 '''EXECUTE spng_ObtenerPorcentajeAhorroPlazas '+
                 '@FechaInicio='''''+CAST(@FechaInicio AS varchar)+''''', '+
                 '@FechaFin='''''++CAST(@FechaFin AS varchar)+''''' '')'

    INSERT INTO @tblSybase (PlazaId, NombrePlaza, Cantidad, ImporteCompra,
                 ImponteCompraIA, ImponteCompraIC, ImporteActual, ImporteConvenio,
                 VsBase, VsConvenio, Ahorro, PorcentAhorro)
    EXEC SP_EXECUTESQL @Query

    SELECT
      PlazaId AS Id,
      NombrePlaza,
      Cantidad,
      CAST(ImponteCompraIA AS decimal(16,2)) AS ImponteCompraIA,
      CAST(ImponteCompraIC AS decimal(16,2)) AS ImponteCompraIC,
      CAST(ImporteActual AS decimal(16,2)) AS ImporteActual,
      CAST(ImporteConvenio AS decimal(16,2)) AS ImporteConvenio,
      CAST(VsBase AS decimal(16,2)) AS VsBase,
      CAST(VsConvenio AS decimal(16,2)) AS VsConvenio,
      CAST(Ahorro AS decimal(16,2)) AS Ahorro,
      CAST(PorcentAhorro AS decimal(16,2)) AS PorcentAhorro,
      CAST(ImporteCompra AS decimal(16,2)) AS ImporteCompra,
      CAST(((PorcentAhorro / @Meta) * 100) AS decimal(16,2))  AS 'PorcentCumplimiento'
    FROM @tblSybase
    WHERE 1=1
  END TRY
  BEGIN CATCH

    INSERT INTO BitacoraError ( ModuloId, NombreModulo, FuncionId
      , NombreFuncion, ErrorSQLId, GravedadError, EstadoError
      , Procedimiento, NumeroLinea, MensajeError )
    SELECT 13, 'Negociaciones', 0, 'Obtener Porcentaje de Ahorro'
      , ERROR_NUMBER(), ERROR_SEVERITY(), ERROR_STATE(), 'plng_ObtenerPorcentajeAhorroPlazas'
      , ERROR_LINE(), ERROR_MESSAGE()

    SELECT ERROR_NUMBER() AS 'Codigo', ERROR_MESSAGE() AS 'Mensaje'

  END CATCH

END
GO
GRANT EXECUTE ON  plng_ObtenerPorcentajeAhorroPlazas TO PUBLIC
GO

IF OBJECT_ID(N'plng_ObtenerPorcentajeImpactoXAnioNegociaciones',N'P') IS NOT NULL
	DROP PROCEDURE plng_ObtenerPorcentajeImpactoXAnioNegociaciones
GO
CREATE PROCEDURE plng_ObtenerPorcentajeImpactoXAnioNegociaciones (@Anio smallint)
/*******************************************************************************
Desarrollador:  Juan Carlos Martini Manjarrez.
Modificacion:   N/A
Creacion:       2019/06/03
Descripcon:     Obtener Anios para consultar el procentaje de impacto.
Sistema:        SIF WEB
Modulo:         Fincamex.SIIF.Negociaciones
*******************************************************************************/
AS
BEGIN
	--DECLARE @Anio smallint = 2019

	SELECT
	CAST(JSON_value(Valor, '$.A'+cast(@Anio as varchar(4))) AS numeric(5,2)) AS Porcentaje
	FROM
	Parametros
	WHERE 1=1
	AND IdParametro = 2

END
GO
GRANT EXECUTE ON plng_ObtenerPorcentajeImpactoXAnioNegociaciones TO PUBLIC
GO

IF OBJECT_ID(N'plng_ObtenerPrecioConvenio',N'P') IS NOT NULL
  DROP PROCEDURE plng_ObtenerPrecioConvenio
GO
CREATE PROCEDURE plng_ObtenerPrecioConvenio (@Anio smallint)
/*******************************************************************************
Desarrollador:  Juan Carlos Martini Manjarrez.
Modificacion:   N/A
Creacion:       2019/06/05
Descripcon:     Obtiene el precio convenio del a�o, a�o pasado y diferencia.
Sistema:        SIF WEB
Modulo:         Fincamex.SIIF.Negociaciones
*******************************************************************************/
AS
BEGIN
  --DECLARE @Anio smallint = 2019

  DECLARE @viv_cat_precios TABLE
  (
    c_codigo_pza VARCHAR(3),
    insumo numeric(7,0),
    precio numeric(12,2),
    convenio numeric(1,0),
    fecha_captura datetime2,
    vigencia date
  )

  DECLARE @insumos TABLE
  (
    tipo numeric(1,0),
    grupo numeric(2,0),
    insumo numeric(7,0)
  )

  DECLARE @tblFechaPrecioActual TABLE
  (
    PlazaId VARCHAR(3),
    InsumoId numeric(7,0),
    FechaPrecioFinal datetime2
  )
  DECLARE @tblPreciosInsumosActual TABLE
  (
    PlazaId VARCHAR(3),
    InsumoId numeric(7,0),
    Cantidad int,
    PrecioUnitario numeric(12,2),
    CostoInsumo numeric(12,2),
    FechaPrecioFinal datetime2
  )
  DECLARE @tblFechaPrecioAnterior TABLE
  (
    PlazaId VARCHAR(3),
    InsumoId numeric(7,0),
    FechaPrecioFinal datetime2
  )
  DECLARE @tblPreciosInsumosAnterior TABLE
  (
    PlazaId VARCHAR(3),
    InsumoId numeric(7,0),
    Cantidad int,
    PrecioUnitario numeric(12,2),
    CostoInsumo numeric(12,2),
    FechaPrecioFinal datetime2
  )
  DECLARE @tblPrecioInsumoActualYAnterior TABLE
  (
    PlazaId VARCHAR(3),
    InsumoId numeric(7,0),
    Cantidad int,
    PrecioAnt numeric(12,2),
    PrecioAct numeric(12,2),
    CostoInsumoAnt numeric(12,2),
    CostoInsumoAct numeric(12,2)
  )
  DECLARE @tblCostoxSubFamilia TABLE
  (
    SubFamiliaId varchar(8),
    CostoAntSubFamilia numeric(12,2),
    CostoActSubFamilia numeric(12,2)
  )
  DECLARE @tblCostoxFamilia TABLE
  (
    FamiliaId int,
    Nombre varchar(50),
    CostoAntFamilia numeric(12,2),
    CostoActFamilia numeric(12,2),
    Diferencia numeric(12,2),
    Porcentaje numeric(12,2)
  )
  DECLARE @tblRetorno TABLE
  (
    FamiliaId int,
    Nombre varchar(50),
    CostoAntFamilia numeric(12,2),
    CostoActFamilia numeric(12,2),
    Diferencia numeric(12,2),
    Porcentaje numeric(12,2)
  )

  DECLARE @tblExplosionxPlaza TABLE
  (
    IdExplosion int,
    PlazaId int,
    Fecha datetime
  )

  DECLARE @tblExplosionxPlazaAnterior TABLE
  (
    IdExplosion int,
    PlazaId int,
    Fecha datetime
  )

  INSERT INTO @viv_cat_precios (c_codigo_pza, insumo, precio, convenio, fecha_captura, vigencia)
  SELECT
    c_codigo_pza,
    insumo,
    precio,
    convenio,
    fecha_captura,
    vigencia
  FROM [08].[EK_ADM08_11].dba.viv_cat_precios
  WHERE 1=1
  AND c_codigo_pza != '%%'

  INSERT INTO @insumos (tipo, grupo, insumo)
  SELECT
    tipo,
    grupo,
    insumo
  FROM [08].[EK_ADM08_11].dba.insumos
  WHERE 1=1

  IF @Anio = DATEPART(YEAR, GETDATE())
  BEGIN
    --DECLARE @Anio smallint = 2019
    --SE OBTIENE LA FECHA DEL CONVENIO O LA FECHA DEL ULTIMO PRECION DE LOS INSUMOS
    --DEL A�O ACTUAL (tblFechaPrecioActual)
    --SE OBTIENEN LOS INSUMOS QUE SE EXPLOSIONARON, EL PRECIO UNITARIO DE CADA INSUMO
    --DE ACUERDO AL CONVENIADO O AL ULTIMO PRECIO DEL A�O ACTUAL
    --Y SE MULTIPLICA POR LA CANTIDAD (tblPreciosInsumosActual)
    --SE OBTIENE LA FECHA DEL CONVENIO O LA FECHA DEL ULTIMO PRECION DE LOS INSUMOS
    --DEL A�O ANTERIOR (tblFechaPrecioAnterior)
    --SE OBTIENEN LOS INSUMOS QUE SE EXPLOSIONARON, EL PRECIO UNITARIO DE CADA INSUMO
    --DE ACUERDO AL CONVENIADO O AL ULTIMO PRECIO DEL A�O ANTERIOR
    --Y SE MULTIPLICA POR LA CANTIDAD (tblPreciosInsumosAnterior)
    --SE UNEN LOS PRECIOS DE CADA A�O (tblPrecioInsumoActualYAnterior)
    --SE OBITNENE EL COSTO EXPLOSIONADO POR SUBFAMILIA (tblCostoxSubFamilia)
    --SE OBITNENE EL COSTO EXPLOSIONADO POR FAMILIA (tblCostoxFamilia)
    --SE AGREGA EL REGISTRO DEL TOTAL EDIFICACION(tblRetorno)
    INSERT INTO @tblFechaPrecioActual (PlazaId, InsumoId, FechaPrecioFinal)
    SELECT
      VCP.c_codigo_pza,
      VCP.insumo,
      MAX(VCP.fecha_captura)
    FROM @viv_cat_precios AS VCP
    INNER JOIN @viv_cat_precios AS VCP2
      ON VCP2.c_codigo_pza = VCP.c_codigo_pza
      AND VCP2.insumo = VCP.insumo
      AND VCP2.convenio = CASE WHEN VCP2.convenio = 1 THEN 1 ELSE 0 END
    WHERE 1=1
    AND DATEPART(YEAR, VCP.fecha_captura) = @Anio
    AND DATEPART(YEAR, VCP2.fecha_captura) = @Anio
    GROUP BY VCP.c_codigo_pza, VCP.insumo

    INSERT INTO @tblPreciosInsumosActual
      (PlazaId, InsumoId, Cantidad, PrecioUnitario, CostoInsumo, FechaPrecioFinal)
    SELECT
      VCP.c_codigo_pza,
      VCP.insumo,
      ED.Cantidad,
      VCP.precio,
      (ED.Cantidad * VCP.precio) AS CostoInsumo,
      VCP.fecha_captura
    FROM @viv_cat_precios AS VCP
    INNER JOIN @tblFechaPrecioActual AS TFP
      ON TFP.PlazaId = VCP.c_codigo_pza
      AND TFP.InsumoId = VCP.insumo
      AND TFP.FechaPrecioFinal = VCP.fecha_captura
    INNER JOIN ExplosionDetalle AS ED
      ON ED.InsumoId = VCP.insumo
    INNER JOIN Explosion AS E
      ON E.IdExplosion = ED.ExplosionId
    INNER JOIN Plaza AS P
      ON P.IdPlaza = E.PlazaId
      AND P.IdPlazaFincasin = TFP.PlazaId
    WHERE 1=1
    AND DATEPART(YEAR, E.FechaCreacion) = @Anio
    AND DATEPART(YEAR, VCP.fecha_captura) = @Anio

    INSERT INTO @tblFechaPrecioAnterior (PlazaId, InsumoId, FechaPrecioFinal)
    SELECT
      VCP.c_codigo_pza,
      VCP.insumo,
      MAX(VCP.fecha_captura)
    FROM @viv_cat_precios AS VCP
    INNER JOIN @viv_cat_precios AS VCP2
      ON VCP2.c_codigo_pza = VCP.c_codigo_pza
      AND VCP2.insumo = VCP.insumo
      AND VCP2.convenio = CASE WHEN VCP2.convenio = 1 THEN 1 ELSE 0 END
    WHERE 1=1
    AND DATEPART(YEAR, VCP.fecha_captura) = @Anio-1
    AND DATEPART(YEAR, VCP2.fecha_captura) = @Anio-1
    GROUP BY VCP.c_codigo_pza, VCP.insumo

    INSERT INTO @tblPreciosInsumosAnterior
      (PlazaId, InsumoId, Cantidad, PrecioUnitario, CostoInsumo, FechaPrecioFinal)
    SELECT
      VCP.c_codigo_pza,
      VCP.insumo,
      ED.Cantidad,
      VCP.precio,
      (ED.Cantidad * VCP.precio) AS CostoInsumo,
      VCP.fecha_captura
    FROM @viv_cat_precios AS VCP
    INNER JOIN @tblFechaPrecioAnterior AS TFP
      ON TFP.PlazaId = VCP.c_codigo_pza
      AND TFP.InsumoId = VCP.insumo
      AND TFP.FechaPrecioFinal = VCP.fecha_captura
    INNER JOIN ExplosionDetalle AS ED
      ON ED.InsumoId = VCP.insumo
    INNER JOIN Explosion AS E
      ON E.IdExplosion = ED.ExplosionId
    INNER JOIN Plaza AS P
      ON P.IdPlaza = E.PlazaId
      AND P.IdPlazaFincasin = TFP.PlazaId
    WHERE 1=1
    AND DATEPART(YEAR, E.FechaCreacion) = @Anio
    AND DATEPART(YEAR, VCP.fecha_captura) = @Anio - 1

    INSERT INTO @tblPrecioInsumoActualYAnterior
      (PlazaId, InsumoId, Cantidad, PrecioAnt, PrecioAct, CostoInsumoAnt, CostoInsumoAct)
    SELECT
      ACT.PlazaId,
      ACT.InsumoId,
      ACT.Cantidad,
      ANT.PrecioUnitario AS PrecioAnt,
      ACT.PrecioUnitario AS PrecioAct,
      ANT.CostoInsumo AS CostoInsumoAnt,
      ACT.CostoInsumo  AS CostoInsumoAct
    FROM @tblPreciosInsumosActual AS ACT
    INNER JOIN @tblPreciosInsumosAnterior AS ANT
      ON ANT.PlazaId = ACT.PlazaId
      AND ANT.InsumoId = ACT.InsumoId
    WHERE 1=1

    INSERT INTO @tblCostoxSubFamilia (SubFamiliaId, CostoAntSubFamilia, CostoActSubFamilia)
    SELECT
      --ISNULL(SFA.SubFamiliaId, 'N/A'),
      SFA.SubFamiliaId,
      SUM(TPI.CostoInsumoAnt),
      SUM(TPI.CostoInsumoAct)
    FROM SubFamiliaAsignada AS SFA
    --RIGHT JOIN insumos AS I
    INNER JOIN @insumos AS I
      ON I.tipo = CAST(SUBSTRING(SFA.SubFamiliaId, 1,3) AS SMALLINT)
      AND I.grupo = CAST(SUBSTRING(SFA.SubFamiliaId, 4,4) AS SMALLINT)
    INNER JOIN @tblPrecioInsumoActualYAnterior AS TPI
      ON TPI.InsumoId = I.insumo
    WHERE 1=1
    GROUP BY SFA.SubFamiliaId

    INSERT INTO @tblCostoxFamilia
      (FamiliaId, Nombre, CostoAntFamilia, CostoActFamilia, Diferencia, Porcentaje)
    SELECT
      F.IdFamilia,
      F.Nombre,
      SUM(CSF.CostoAntSubFamilia),
      SUM(CSF.CostoActSubFamilia),
      (SUM(CSF.CostoActSubFamilia) - SUM(CSF.CostoAntSubFamilia)),
      ((SUM(CSF.CostoActSubFamilia) - SUM(CSF.CostoAntSubFamilia)) / SUM(CSF.CostoAntSubFamilia)) * 100
    FROM Familia AS F
    INNER JOIN SubFamiliaAsignada AS SFA
      ON SFA.FamiliaId = F.IdFamilia
    INNER JOIN @tblCostoxSubFamilia AS CSF
      ON CSF.SubFamiliaId = SFA.SubFamiliaId
    WHERE 1=1
    AND F.Activo = 1
    GROUP BY F.IdFamilia, F.Nombre

    INSERT INTO @tblRetorno
      (FamiliaId, Nombre, CostoAntFamilia, CostoActFamilia, Diferencia, Porcentaje)
    SELECT
      FamiliaId,
      Nombre,
      CostoAntFamilia,
      CostoActFamilia,
      Diferencia,
      Porcentaje
    FROM @tblCostoxFamilia
    WHERE 1=1
    UNION ALL
    SELECT
      -1,
      'Total Edificaci'+CHAR(243)+'n',
      ISNULL(SUM(CostoAntFamilia), 0),
      ISNULL(SUM(CostoActFamilia), 0),
      ISNULL((SUM(CostoActFamilia) - SUM(CostoAntFamilia)), 0),
      ISNULL((((SUM(CostoActFamilia) - SUM(CostoAntFamilia)) / SUM(CostoAntFamilia)) * 100), 0)
    FROM @tblCostoxFamilia
    WHERE 1=1

    --RETORNO
    SELECT
      FamiliaId AS Id,
      Nombre,
      CAST(CostoAntFamilia AS decimal(16,2)) AS Anterior,
      CAST(CostoActFamilia AS decimal(16,2)) AS Actual,
      CAST(Diferencia  AS decimal(16,2)) AS Diferencia,
      CAST(Porcentaje AS decimal(16,2)) AS Porcentaje
    FROM @tblRetorno
    WHERE 1=1
    ORDER BY FamiliaId
  END
  ELSE
  BEGIN
    INSERT INTO @tblFechaPrecioActual (PlazaId, InsumoId, FechaPrecioFinal)
    SELECT
      VCP.c_codigo_pza,
      VCP.insumo,
      MAX(VCP.fecha_captura)
    FROM @viv_cat_precios AS VCP
    INNER JOIN @viv_cat_precios AS VCP2
      ON VCP2.c_codigo_pza = VCP.c_codigo_pza
      AND VCP2.insumo = VCP.insumo
      AND VCP2.convenio = CASE WHEN VCP2.convenio = 1 THEN 1 ELSE 0 END
    WHERE 1=1
    AND DATEPART(YEAR, VCP.fecha_captura) = @Anio
    AND DATEPART(YEAR, VCP2.fecha_captura) = @Anio
    GROUP BY VCP.c_codigo_pza, VCP.insumo

    INSERT INTO @tblExplosionxPlaza (IdExplosion, PlazaId, Fecha)
    SELECT
      IdExplosionHistorico,
      PlazaId,
      MAX(FechaCreacion)
    FROM ExplosionHistorico
    WHERE 1=1
    AND DATEPART(YEAR, FechaCreacion) = @Anio
    GROUP BY IdExplosionHistorico, PlazaId

    INSERT INTO @tblPreciosInsumosActual
      (PlazaId, InsumoId, Cantidad, PrecioUnitario, CostoInsumo, FechaPrecioFinal)
    SELECT
      VCP.c_codigo_pza,
      VCP.insumo,
      EDH.Cantidad,
      VCP.precio,
      (EDH.Cantidad * VCP.precio) AS CostoInsumo,
      VCP.fecha_captura
    FROM @viv_cat_precios AS VCP
    INNER JOIN @tblFechaPrecioActual AS TFP
      ON TFP.PlazaId = VCP.c_codigo_pza
      AND TFP.InsumoId = VCP.insumo
      AND TFP.FechaPrecioFinal = VCP.fecha_captura
    INNER JOIN ExplosionDetalleHistorico AS EDH
      ON EDH.InsumoId = VCP.insumo
    INNER JOIN ExplosionHistorico AS EH
      ON EH.IdExplosionHistorico = EDH.ExplosionHistoricoId
    INNER JOIN @tblExplosionxPlaza AS EP
      ON EP.PlazaId = EH.PlazaId
      AND EP.IdExplosion = EH.IdExplosionHistorico
    INNER JOIN Plaza AS P
      ON P.IdPlaza = EH.PlazaId
      AND P.IdPlazaFincasin = TFP.PlazaId
    WHERE 1=1
    AND DATEPART(YEAR, EH.FechaCreacion) = @Anio
    AND DATEPART(YEAR, VCP.fecha_captura) = @Anio

    INSERT INTO @tblFechaPrecioAnterior (PlazaId, InsumoId, FechaPrecioFinal)
    SELECT
      VCP.c_codigo_pza,
      VCP.insumo,
      MAX(VCP.fecha_captura)
    FROM @viv_cat_precios AS VCP
    INNER JOIN @viv_cat_precios AS VCP2
      ON VCP2.c_codigo_pza = VCP.c_codigo_pza
      AND VCP2.insumo = VCP.insumo
      AND VCP2.convenio = CASE WHEN VCP2.convenio = 1 THEN 1 ELSE 0 END
    WHERE 1=1
    AND DATEPART(YEAR, VCP.fecha_captura) = @Anio-1
    AND DATEPART(YEAR, VCP2.fecha_captura) = @Anio-1
    GROUP BY VCP.c_codigo_pza, VCP.insumo

    INSERT INTO @tblExplosionxPlazaAnterior (IdExplosion, PlazaId, Fecha)
    SELECT
      IdExplosionHistorico,
      PlazaId,
      MAX(FechaCreacion)
    FROM ExplosionHistorico
    WHERE 1=1
    AND DATEPART(YEAR, FechaCreacion) = @Anio -1
    GROUP BY IdExplosionHistorico, PlazaId

    INSERT INTO @tblPreciosInsumosAnterior
      (PlazaId, InsumoId, Cantidad, PrecioUnitario, CostoInsumo, FechaPrecioFinal)
    SELECT
      VCP.c_codigo_pza,
      VCP.insumo,
      EDH.Cantidad,
      VCP.precio,
      (EDH.Cantidad * VCP.precio) AS CostoInsumo,
      VCP.fecha_captura
    FROM @viv_cat_precios AS VCP
    INNER JOIN @tblFechaPrecioAnterior AS TFP
      ON TFP.PlazaId = VCP.c_codigo_pza
      AND TFP.InsumoId = VCP.insumo
      AND TFP.FechaPrecioFinal = VCP.fecha_captura
    INNER JOIN ExplosionDetalleHistorico AS EDH
      ON EDH.InsumoId = VCP.insumo
    INNER JOIN ExplosionHistorico AS EH
      ON EH.IdExplosionHistorico = EDH.ExplosionHistoricoId
    INNER JOIN @tblExplosionxPlazaAnterior AS EPA
      ON EPA.PlazaId = EH.PlazaId
      AND EPA.IdExplosion = EH.IdExplosionHistorico
    INNER JOIN Plaza AS P
      ON P.IdPlaza = EH.PlazaId
      AND P.IdPlazaFincasin = TFP.PlazaId
    WHERE 1=1
    AND DATEPART(YEAR, EH.FechaCreacion) = @Anio
    AND DATEPART(YEAR, VCP.fecha_captura) = @Anio - 1

    INSERT INTO @tblPrecioInsumoActualYAnterior
      (PlazaId, InsumoId, Cantidad, PrecioAnt, PrecioAct, CostoInsumoAnt, CostoInsumoAct)
    SELECT
      ACT.PlazaId,
      ACT.InsumoId,
      ACT.Cantidad,
      ANT.PrecioUnitario AS PrecioAnt,
      ACT.PrecioUnitario AS PrecioAct,
      ANT.CostoInsumo AS CostoInsumoAnt,
      ACT.CostoInsumo  AS CostoInsumoAct
    FROM @tblPreciosInsumosActual AS ACT
    INNER JOIN @tblPreciosInsumosAnterior AS ANT
      ON ANT.PlazaId = ACT.PlazaId
      AND ANT.InsumoId = ACT.InsumoId
    WHERE 1=1

    INSERT INTO @tblCostoxSubFamilia (SubFamiliaId, CostoAntSubFamilia, CostoActSubFamilia)
    SELECT
      --ISNULL(SFA.SubFamiliaId, 'N/A'),
      SFA.SubFamiliaId,
      SUM(TPI.CostoInsumoAnt),
      SUM(TPI.CostoInsumoAct)
    FROM SubFamiliaAsignada AS SFA
    --RIGHT JOIN insumos AS I
    INNER JOIN @insumos AS I
      ON I.tipo = CAST(SUBSTRING(SFA.SubFamiliaId, 1,3) AS SMALLINT)
      AND I.grupo = CAST(SUBSTRING(SFA.SubFamiliaId, 4,4) AS SMALLINT)
    INNER JOIN @tblPrecioInsumoActualYAnterior AS TPI
      ON TPI.InsumoId = I.insumo
    WHERE 1=1
    GROUP BY SFA.SubFamiliaId

    INSERT INTO @tblCostoxFamilia
      (FamiliaId, Nombre, CostoAntFamilia, CostoActFamilia, Diferencia, Porcentaje)
    SELECT
      F.IdFamilia,
      F.Nombre,
      SUM(CSF.CostoAntSubFamilia),
      SUM(CSF.CostoActSubFamilia),
      (SUM(CSF.CostoActSubFamilia) - SUM(CSF.CostoAntSubFamilia)),
      ((SUM(CSF.CostoActSubFamilia) - SUM(CSF.CostoAntSubFamilia)) / SUM(CSF.CostoAntSubFamilia)) * 100
    FROM Familia AS F
    INNER JOIN SubFamiliaAsignada AS SFA
      ON SFA.FamiliaId = F.IdFamilia
    INNER JOIN @tblCostoxSubFamilia AS CSF
      ON CSF.SubFamiliaId = SFA.SubFamiliaId
    WHERE 1=1
    AND F.Activo = 1
    GROUP BY F.IdFamilia, F.Nombre

    INSERT INTO @tblRetorno (FamiliaId, Nombre, CostoAntFamilia, CostoActFamilia, Diferencia, Porcentaje)
    SELECT
      FamiliaId,
      Nombre,
      CostoAntFamilia,
      CostoActFamilia,
      Diferencia,
      Porcentaje
    FROM @tblCostoxFamilia
    WHERE 1=1
    UNION ALL
    SELECT
      -1,
      'Total Edificaci'+CHAR(243)+'n',
      ISNULL(SUM(CostoAntFamilia), 0),
      ISNULL(SUM(CostoActFamilia), 0),
      ISNULL((SUM(CostoActFamilia) - SUM(CostoAntFamilia)), 0),
      ISNULL((((SUM(CostoActFamilia) - SUM(CostoAntFamilia)) / SUM(CostoAntFamilia)) * 100), 0)
    FROM @tblCostoxFamilia
    WHERE 1=1

    --RETORNO
    SELECT
      FamiliaId AS Id,
      Nombre,
      CAST(CostoAntFamilia AS decimal(16,2)) AS Anterior,
      CAST(CostoActFamilia AS decimal(16,2)) AS Actual,
      CAST(Diferencia  AS decimal(16,2)) AS Diferencia,
      CAST(Porcentaje AS decimal(16,2)) AS Porcentaje
    FROM @tblRetorno
    WHERE 1=1
    ORDER BY FamiliaId
  END

END
GO
GRANT EXECUTE ON plng_ObtenerPrecioConvenio TO PUBLIC
GO

IF OBJECT_ID(N'plng_ObtenerPrecioConvenioDetalle',N'P') IS NOT NULL
  DROP PROCEDURE plng_ObtenerPrecioConvenioDetalle
GO
CREATE PROCEDURE plng_ObtenerPrecioConvenioDetalle (@Anio smallint, @Familia int)
/*******************************************************************************
Desarrollador:  Juan Carlos Martini Manjarrez.
Modificacion:   N/A
Creacion:       2019/06/13
Descripcon:     Obtiene el precio convenio del a�o, a�o pasado y diferencia
                por familia.
Sistema:        SIF WEB
Modulo:         Fincamex.SIIF.Negociaciones
*******************************************************************************/
AS
BEGIN
  --DECLARE @Anio smallint = 2019

  DECLARE @viv_cat_precios TABLE
  (
    c_codigo_pza VARCHAR(3),
    insumo numeric(7,0),
    precio numeric(12,2),
    convenio numeric(1,0),
    fecha_captura datetime2,
    vigencia date
  )

  DECLARE @insumos TABLE
  (
    tipo numeric(1,0),
    grupo numeric(2,0),
    insumo numeric(7,0)
  )

  DECLARE @tblFechaPrecioActual TABLE
  (
    PlazaId VARCHAR(3),
    InsumoId numeric(7,0),
    FechaPrecioFinal datetime2
  )
  DECLARE @tblPreciosInsumosActual TABLE
  (
    PlazaId VARCHAR(3),
    InsumoId numeric(7,0),
    Cantidad int,
    PrecioUnitario numeric(12,2),
    CostoInsumo numeric(12,2),
    FechaPrecioFinal datetime2
  )
  DECLARE @tblFechaPrecioAnterior TABLE
  (
    PlazaId VARCHAR(3),
    InsumoId numeric(7,0),
    FechaPrecioFinal datetime2
  )
  DECLARE @tblPreciosInsumosAnterior TABLE
  (
    PlazaId VARCHAR(3),
    InsumoId numeric(7,0),
    Cantidad int,
    PrecioUnitario numeric(12,2),
    CostoInsumo numeric(12,2),
    FechaPrecioFinal datetime2
  )
  DECLARE @tblPrecioInsumoActualYAnterior TABLE
  (
    PlazaId VARCHAR(3),
    InsumoId numeric(7,0),
    Cantidad int,
    PrecioAnt numeric(12,2),
    PrecioAct numeric(12,2),
    CostoInsumoAnt numeric(12,2),
    CostoInsumoAct numeric(12,2)
  )
  DECLARE @tblCostoxSubFamilia TABLE
  (
    SubFamiliaId varchar(8),
    CostoAntSubFamilia numeric(12,2),
    CostoActSubFamilia numeric(12,2)
  )
  DECLARE @tblCostoxFamilia TABLE
  (
    FamiliaId int,
    Nombre varchar(50),
    CostoAntFamilia numeric(12,2),
    CostoActFamilia numeric(12,2),
    Diferencia numeric(12,2),
    Porcentaje numeric(12,2)
  )

  DECLARE @tblRetorno TABLE
  (
    SubFamiliaId varchar(8),
    Nombre varchar(50),
    CostoAntSubFamilia numeric(12,2),
    CostoActSubFamilia numeric(12,2),
    Diferencia numeric(12,2),
    Porcentaje numeric(12,2)
  )

  DECLARE @tblExplosionxPlaza TABLE
  (
    IdExplosion int,
    PlazaId int,
    Fecha datetime
  )

  DECLARE @tblExplosionxPlazaAnterior TABLE
  (
    IdExplosion int,
    PlazaId int,
    Fecha datetime
  )

  INSERT INTO @viv_cat_precios (c_codigo_pza, insumo, precio, convenio, fecha_captura, vigencia)
  SELECT
    c_codigo_pza,
    insumo,
    precio,
    convenio,
    fecha_captura,
    vigencia
  FROM [08].[EK_ADM08_11].dba.viv_cat_precios
  WHERE 1=1
  AND c_codigo_pza != '%%'

  INSERT INTO @insumos (tipo, grupo, insumo)
  SELECT
    tipo,
    grupo,
    insumo
  FROM [08].[EK_ADM08_11].dba.insumos
  WHERE 1=1

  IF @Anio = DATEPART(YEAR, GETDATE())
  BEGIN
    --DECLARE @Anio smallint = 2019
    --DECLARE @Familia int = 1
    --SE OBTIENE LA FECHA DEL CONVENIO O LA FECHA DEL ULTIMO PRECION DE LOS INSUMOS
    --DEL A�O ACTUAL (tblFechaPrecioActual)
    --SE OBTIENEN LOS INSUMOS QUE SE EXPLOSIONARON, EL PRECIO UNITARIO DE CADA INSUMO
    --DE ACUERDO AL CONVENIADO O AL ULTIMO PRECIO DEL A�O ACTUAL
    --Y SE MULTIPLICA POR LA CANTIDAD (tblPreciosInsumosActual)
    --SE OBTIENE LA FECHA DEL CONVENIO O LA FECHA DEL ULTIMO PRECION DE LOS INSUMOS
    --DEL A�O ANTERIOR (tblFechaPrecioAnterior)
    --SE OBTIENEN LOS INSUMOS QUE SE EXPLOSIONARON, EL PRECIO UNITARIO DE CADA INSUMO
    --DE ACUERDO AL CONVENIADO O AL ULTIMO PRECIO DEL A�O ANTERIOR
    --Y SE MULTIPLICA POR LA CANTIDAD (tblPreciosInsumosAnterior)
    --SE UNEN LOS PRECIOS DE CADA A�O (tblPrecioInsumoActualYAnterior)
    --SE OBITNENE EL COSTO EXPLOSIONADO POR SUBFAMILIA (tblCostoxSubFamilia)
    --SE OBITNENE EL COSTO EXPLOSIONADO POR FAMILIA (tblCostoxFamilia)
    --SE AGREGA EL REGISTRO DEL TOTAL EDIFICACION(tblRetorno)
    INSERT INTO @tblFechaPrecioActual (PlazaId, InsumoId, FechaPrecioFinal)
    SELECT
      VCP.c_codigo_pza,
      VCP.insumo,
      MAX(VCP.fecha_captura)
    FROM @viv_cat_precios AS VCP
    INNER JOIN @viv_cat_precios AS VCP2
      ON VCP2.c_codigo_pza = VCP.c_codigo_pza
      AND VCP2.insumo = VCP.insumo
      AND VCP2.convenio = CASE WHEN VCP2.convenio = 1 THEN 1 ELSE 0 END
    WHERE 1=1
    AND DATEPART(YEAR, VCP.fecha_captura) = @Anio
    AND DATEPART(YEAR, VCP2.fecha_captura) = @Anio
    GROUP BY VCP.c_codigo_pza, VCP.insumo

    INSERT INTO @tblPreciosInsumosActual
      (PlazaId, InsumoId, Cantidad, PrecioUnitario, CostoInsumo, FechaPrecioFinal)
    SELECT
      VCP.c_codigo_pza,
      VCP.insumo,
      ED.Cantidad,
      VCP.precio,
      (ED.Cantidad * VCP.precio) AS CostoInsumo,
      VCP.fecha_captura
    FROM @viv_cat_precios AS VCP
    INNER JOIN @tblFechaPrecioActual AS TFP
      ON TFP.PlazaId = VCP.c_codigo_pza
      AND TFP.InsumoId = VCP.insumo
      AND TFP.FechaPrecioFinal = VCP.fecha_captura
    INNER JOIN ExplosionDetalle AS ED
      ON ED.InsumoId = VCP.insumo
    INNER JOIN Explosion AS E
      ON E.IdExplosion = ED.ExplosionId
    INNER JOIN Plaza AS P
      ON P.IdPlaza = E.PlazaId
      AND P.IdPlazaFincasin = TFP.PlazaId
    WHERE 1=1
    AND DATEPART(YEAR, E.FechaCreacion) = @Anio
    AND DATEPART(YEAR, VCP.fecha_captura) = @Anio

    INSERT INTO @tblFechaPrecioAnterior (PlazaId, InsumoId, FechaPrecioFinal)
    SELECT
      VCP.c_codigo_pza,
      VCP.insumo,
      MAX(VCP.fecha_captura)
    FROM @viv_cat_precios AS VCP
    INNER JOIN @viv_cat_precios AS VCP2
      ON VCP2.c_codigo_pza = VCP.c_codigo_pza
      AND VCP2.insumo = VCP.insumo
      AND VCP2.convenio = CASE WHEN VCP2.convenio = 1 THEN 1 ELSE 0 END
    WHERE 1=1
    AND DATEPART(YEAR, VCP.fecha_captura) = @Anio-1
    AND DATEPART(YEAR, VCP2.fecha_captura) = @Anio-1
    GROUP BY VCP.c_codigo_pza, VCP.insumo

    INSERT INTO @tblPreciosInsumosAnterior
      (PlazaId, InsumoId, Cantidad, PrecioUnitario, CostoInsumo, FechaPrecioFinal)
    SELECT
      VCP.c_codigo_pza,
      VCP.insumo,
      ED.Cantidad,
      VCP.precio,
      (ED.Cantidad * VCP.precio) AS CostoInsumo,
      VCP.fecha_captura
    FROM @viv_cat_precios AS VCP
    INNER JOIN @tblFechaPrecioAnterior AS TFP
      ON TFP.PlazaId = VCP.c_codigo_pza
      AND TFP.InsumoId = VCP.insumo
      AND TFP.FechaPrecioFinal = VCP.fecha_captura
    INNER JOIN ExplosionDetalle AS ED
      ON ED.InsumoId = VCP.insumo
    INNER JOIN Explosion AS E
      ON E.IdExplosion = ED.ExplosionId
    INNER JOIN Plaza AS P
      ON P.IdPlaza = E.PlazaId
      AND P.IdPlazaFincasin = TFP.PlazaId
    WHERE 1=1
    AND DATEPART(YEAR, E.FechaCreacion) = @Anio
    AND DATEPART(YEAR, VCP.fecha_captura) = @Anio - 1

    INSERT INTO @tblPrecioInsumoActualYAnterior
      (PlazaId, InsumoId, Cantidad, PrecioAnt, PrecioAct, CostoInsumoAnt, CostoInsumoAct)
    SELECT
      ACT.PlazaId,
      ACT.InsumoId,
      ACT.Cantidad,
      ANT.PrecioUnitario AS PrecioAnt,
      ACT.PrecioUnitario AS PrecioAct,
      ANT.CostoInsumo AS CostoInsumoAnt,
      ACT.CostoInsumo  AS CostoInsumoAct
    FROM @tblPreciosInsumosActual AS ACT
    INNER JOIN @tblPreciosInsumosAnterior AS ANT
      ON ANT.PlazaId = ACT.PlazaId
      AND ANT.InsumoId = ACT.InsumoId
    WHERE 1=1

    INSERT INTO @tblCostoxSubFamilia (SubFamiliaId, CostoAntSubFamilia, CostoActSubFamilia)
    SELECT
      --ISNULL(SFA.SubFamiliaId, 'N/A'),
      SFA.SubFamiliaId,
      SUM(TPI.CostoInsumoAnt),
      SUM(TPI.CostoInsumoAct)
    FROM SubFamiliaAsignada AS SFA
    --RIGHT JOIN insumos AS I
    INNER JOIN @insumos AS I
        ON I.tipo = CAST(SUBSTRING(SFA.SubFamiliaId, 1,3) AS SMALLINT)
        AND I.grupo = CAST(SUBSTRING(SFA.SubFamiliaId, 4,4) AS SMALLINT)
    INNER JOIN @tblPrecioInsumoActualYAnterior AS TPI
      ON TPI.InsumoId = I.insumo
    INNER JOIN Familia AS F
      ON F.IdFamilia = SFA.FamiliaId
    WHERE 1=1
    AND F.IdFamilia = @Familia
    GROUP BY SFA.SubFamiliaId

    INSERT INTO @tblRetorno (SubFamiliaId, Nombre, CostoAntSubFamilia, CostoActSubFamilia, Diferencia, Porcentaje)
    SELECT
      SFA.SubFamiliaId,
      GI.descripcion,
      SFA.CostoAntSubFamilia,
      SFA.CostoActSubFamilia,
      (SFA.CostoActSubFamilia - SFA.CostoAntSubFamilia),
      (SFA.CostoActSubFamilia - SFA.CostoAntSubFamilia) / SFA.CostoAntSubFamilia * 100
    FROM @tblCostoxSubFamilia AS SFA
    INNER JOIN grupos_insumo AS GI
      ON GI.tipo_insumo = CAST(SUBSTRING(SFA.SubFamiliaId, 1,3) AS SMALLINT)
      AND GI.grupo_insumo = CAST(SUBSTRING(SFA.SubFamiliaId, 4,4) AS SMALLINT)
    WHERE 1=1

    --RETORNO
    SELECT
      SubFamiliaId AS Id,
      Nombre,
      CAST(CostoAntSubFamilia AS decimal(16,2)) AS Anterior,
      CAST(CostoActSubFamilia AS decimal(16,2)) AS Actual,
      CAST(Diferencia  AS decimal(16,2)) AS Diferencia,
      CAST(Porcentaje AS decimal(16,2)) AS Porcentaje
    FROM @tblRetorno
    WHERE 1=1
    ORDER BY Nombre
  END
  ELSE
  BEGIN
    INSERT INTO @tblFechaPrecioActual (PlazaId, InsumoId, FechaPrecioFinal)
    SELECT
      VCP.c_codigo_pza,
      VCP.insumo,
      MAX(VCP.fecha_captura)
    FROM @viv_cat_precios AS VCP
    INNER JOIN @viv_cat_precios AS VCP2
      ON VCP2.c_codigo_pza = VCP.c_codigo_pza
      AND VCP2.insumo = VCP.insumo
      AND VCP2.convenio = CASE WHEN VCP2.convenio = 1 THEN 1 ELSE 0 END
    WHERE 1=1
    AND DATEPART(YEAR, VCP.fecha_captura) = @Anio
    AND DATEPART(YEAR, VCP2.fecha_captura) = @Anio
    GROUP BY VCP.c_codigo_pza, VCP.insumo

    INSERT INTO @tblExplosionxPlaza (IdExplosion, PlazaId, Fecha)
    SELECT
      IdExplosionHistorico,
      PlazaId,
      MAX(FechaCreacion)
    FROM ExplosionHistorico
    WHERE 1=1
    AND DATEPART(YEAR, FechaCreacion) = @Anio
    GROUP BY IdExplosionHistorico, PlazaId

    INSERT INTO @tblPreciosInsumosActual
      (PlazaId, InsumoId, Cantidad, PrecioUnitario, CostoInsumo, FechaPrecioFinal)
    SELECT
      VCP.c_codigo_pza,
      VCP.insumo,
      EDH.Cantidad,
      VCP.precio,
      (EDH.Cantidad * VCP.precio) AS CostoInsumo,
      VCP.fecha_captura
    FROM @viv_cat_precios AS VCP
    INNER JOIN @tblFechaPrecioActual AS TFP
      ON TFP.PlazaId = VCP.c_codigo_pza
      AND TFP.InsumoId = VCP.insumo
      AND TFP.FechaPrecioFinal = VCP.fecha_captura
    INNER JOIN ExplosionDetalleHistorico AS EDH
      ON EDH.InsumoId = VCP.insumo
    INNER JOIN ExplosionHistorico AS EH
      ON EH.IdExplosionHistorico = EDH.ExplosionHistoricoId
    INNER JOIN @tblExplosionxPlaza AS EP
      ON EP.PlazaId = EH.PlazaId
      AND EP.IdExplosion = EH.IdExplosionHistorico
    INNER JOIN Plaza AS P
      ON P.IdPlaza = EH.PlazaId
      AND P.IdPlazaFincasin = TFP.PlazaId
    WHERE 1=1
    AND DATEPART(YEAR, EH.FechaCreacion) = @Anio
    AND DATEPART(YEAR, VCP.fecha_captura) = @Anio

    INSERT INTO @tblFechaPrecioAnterior (PlazaId, InsumoId, FechaPrecioFinal)
    SELECT
      VCP.c_codigo_pza,
      VCP.insumo,
      MAX(VCP.fecha_captura)
    FROM @viv_cat_precios AS VCP
    INNER JOIN @viv_cat_precios AS VCP2
      ON VCP2.c_codigo_pza = VCP.c_codigo_pza
      AND VCP2.insumo = VCP.insumo
      AND VCP2.convenio = CASE WHEN VCP2.convenio = 1 THEN 1 ELSE 0 END
    WHERE 1=1
    AND DATEPART(YEAR, VCP.fecha_captura) = @Anio-1
    AND DATEPART(YEAR, VCP2.fecha_captura) = @Anio-1
    GROUP BY VCP.c_codigo_pza, VCP.insumo

    INSERT INTO @tblExplosionxPlazaAnterior (IdExplosion, PlazaId, Fecha)
    SELECT
      IdExplosionHistorico,
      PlazaId,
      MAX(FechaCreacion)
    FROM ExplosionHistorico
    WHERE 1=1
    AND DATEPART(YEAR, FechaCreacion) = @Anio -1
    GROUP BY IdExplosionHistorico, PlazaId

    INSERT INTO @tblPreciosInsumosAnterior
      (PlazaId, InsumoId, Cantidad, PrecioUnitario, CostoInsumo, FechaPrecioFinal)
    SELECT
      VCP.c_codigo_pza,
      VCP.insumo,
      EDH.Cantidad,
      VCP.precio,
      (EDH.Cantidad * VCP.precio) AS CostoInsumo,
      VCP.fecha_captura
    FROM @viv_cat_precios AS VCP
    INNER JOIN @tblFechaPrecioAnterior AS TFP
      ON TFP.PlazaId = VCP.c_codigo_pza
      AND TFP.InsumoId = VCP.insumo
      AND TFP.FechaPrecioFinal = VCP.fecha_captura
    INNER JOIN ExplosionDetalleHistorico AS EDH
      ON EDH.InsumoId = VCP.insumo
    INNER JOIN ExplosionHistorico AS EH
      ON EH.IdExplosionHistorico = EDH.ExplosionHistoricoId
    INNER JOIN @tblExplosionxPlazaAnterior AS EPA
      ON EPA.PlazaId = EH.PlazaId
      AND EPA.IdExplosion = EH.IdExplosionHistorico
    INNER JOIN Plaza AS P
      ON P.IdPlaza = EH.PlazaId
      AND P.IdPlazaFincasin = TFP.PlazaId
    WHERE 1=1
    AND DATEPART(YEAR, EH.FechaCreacion) = @Anio
    AND DATEPART(YEAR, VCP.fecha_captura) = @Anio - 1

    INSERT INTO @tblPrecioInsumoActualYAnterior
      (PlazaId, InsumoId, Cantidad, PrecioAnt, PrecioAct, CostoInsumoAnt, CostoInsumoAct)
    SELECT
      ACT.PlazaId,
      ACT.InsumoId,
      ACT.Cantidad,
      ANT.PrecioUnitario AS PrecioAnt,
      ACT.PrecioUnitario AS PrecioAct,
      ANT.CostoInsumo AS CostoInsumoAnt,
      ACT.CostoInsumo  AS CostoInsumoAct
    FROM @tblPreciosInsumosActual AS ACT
    INNER JOIN @tblPreciosInsumosAnterior AS ANT
      ON ANT.PlazaId = ACT.PlazaId
      AND ANT.InsumoId = ACT.InsumoId
    WHERE 1=1

    INSERT INTO @tblCostoxSubFamilia (SubFamiliaId, CostoAntSubFamilia, CostoActSubFamilia)
    SELECT
      --ISNULL(SFA.SubFamiliaId, 'N/A'),
      SFA.SubFamiliaId,
      SUM(TPI.CostoInsumoAnt),
      SUM(TPI.CostoInsumoAct)
    FROM SubFamiliaAsignada AS SFA
    --RIGHT JOIN insumos AS I
    INNER JOIN @insumos AS I
      ON I.tipo = CAST(SUBSTRING(SFA.SubFamiliaId, 1,3) AS SMALLINT)
        AND I.grupo = CAST(SUBSTRING(SFA.SubFamiliaId, 4,4) AS SMALLINT)
    INNER JOIN @tblPrecioInsumoActualYAnterior AS TPI
      ON TPI.InsumoId = I.insumo
    INNER JOIN Familia AS F
      ON F.IdFamilia = SFA.FamiliaId
    WHERE 1=1
    AND F.IdFamilia = @Familia
    GROUP BY SFA.SubFamiliaId

    INSERT INTO @tblRetorno (SubFamiliaId, Nombre, CostoAntSubFamilia, CostoActSubFamilia, Diferencia, Porcentaje)
    SELECT
      SFA.SubFamiliaId,
      GI.descripcion,
      SFA.CostoAntSubFamilia,
      SFA.CostoActSubFamilia,
      (SFA.CostoActSubFamilia - SFA.CostoAntSubFamilia),
      (SFA.CostoActSubFamilia - SFA.CostoAntSubFamilia) / SFA.CostoAntSubFamilia * 100
    FROM @tblCostoxSubFamilia AS SFA
    INNER JOIN grupos_insumo AS GI
      ON GI.tipo_insumo = CAST(SUBSTRING(SFA.SubFamiliaId, 1,3) AS SMALLINT)
      AND GI.grupo_insumo = CAST(SUBSTRING(SFA.SubFamiliaId, 4,4) AS SMALLINT)
    WHERE 1=1

    --RETORNO
    SELECT
      SubFamiliaId AS Id,
      Nombre,
      CAST(CostoAntSubFamilia AS decimal(16,2)) AS Anterior,
      CAST(CostoActSubFamilia AS decimal(16,2)) AS Actual,
      CAST(Diferencia  AS decimal(16,2)) AS Diferencia,
      CAST(Porcentaje AS decimal(16,2)) AS Porcentaje
    FROM @tblRetorno
    WHERE 1=1
    ORDER BY Nombre
  END

END
GO
GRANT EXECUTE ON plng_ObtenerPrecioConvenioDetalle TO PUBLIC
GO

IF OBJECT_ID(N'plng_ObtenerSubFamilias',N'P') IS NOT NULL
	DROP PROCEDURE plng_ObtenerSubFamilias
GO
CREATE PROCEDURE plng_ObtenerSubFamilias (@FamiliaId int = 0)
/*******************************************************************************
Desarrollador:  Juan Carlos Martini Manjarrez.
Modificacion:   N/A
Creacion:       2019/05/23
Descripcon:     Obtener listado de subfamilias.
Sistema:        SIF WEB
Modulo:         Fincamex.SIIF.Negociaciones
*******************************************************************************/
AS
BEGIN
	--DECLARE @FamiliaId int = 1

	IF @FamiliaId = 0 --TODAS LAS SUBFAMILIAS
	BEGIN
		SELECT
		RIGHT('000'+CAST(tipo_insumo AS varchar(3)), 3)+''+
		RIGHT('0000'+CAST(grupo_insumo AS varchar(4)), 4) AS Id,
		LTRIM(RTRIM(descripcion)) AS Nombre
		FROM grupos_insumo
		WHERE 1=1
		ORDER BY descripcion
	END
	ELSE IF @FamiliaId = -1 --LAS SUBFAMILIAS QUE NO ESTAN ASIGNADAS
	BEGIN
		SELECT
		RIGHT('000'+CAST(tipo_insumo AS varchar(3)), 3)+''+
		RIGHT('0000'+CAST(grupo_insumo AS varchar(4)), 4) AS Id,
		LTRIM(RTRIM(descripcion)) AS Nombre
		FROM grupos_insumo
		WHERE 1=1
		AND RIGHT('000'+CAST(tipo_insumo AS varchar(3)), 3)+''+
			RIGHT('0000'+CAST(grupo_insumo AS varchar(4)), 4)
			NOT IN (SELECT SubFamiliaId FROM SubFamiliaAsignada)
		ORDER BY descripcion
	END
	ELSE --SUBFAMILIAS ASIGNADAS A LA FAMILIA PROPORCIONADA
	BEGIN
		SELECT SFA.SubFamiliaId AS Id, LTRIM(RTRIM(GI.descripcion)) AS Nombre
		FROM SubFamiliaAsignada AS SFA
		INNER JOIN grupos_insumo AS GI
			ON GI.tipo_insumo = CAST(SUBSTRING(SFA.SubFamiliaId, 1,3) AS INT)
			AND GI.grupo_insumo = CAST(SUBSTRING(SFA.SubFamiliaId, 4,4) AS INT)
		WHERE 1=1
		AND SFA.FamiliaId = @FamiliaId
		ORDER BY GI.descripcion
	END

END
GO
GRANT EXECUTE ON plng_ObtenerSubFamilias TO PUBLIC
GO