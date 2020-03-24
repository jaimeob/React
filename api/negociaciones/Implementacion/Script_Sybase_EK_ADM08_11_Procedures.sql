CREATE OR REPLACE PROCEDURE "DBA"."spng_ObtenerPorcentajeAhorroPlazas"
(@FechaInicio date, @FechaFin date)
/*******************************************************************************
Desarrollador:  Juan Carlos Martini Manjarrez.
Modificacion:   N/A
Creacion:       2019/06/19
Descripcon:     Obtener el porcentaje de ahorro por plaza.
Sistema:        SIIF
Modulo:         Fincamex.SIIF.Negociaciones
*******************************************************************************/
RESULT
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
ON EXCEPTION RESUME
BEGIN
  
  CREATE TABLE #tblInsumosXCC
  (
    CC char(5),
    insumo numeric(7,0)
  );

  CREATE TABLE #tblPrecioCompra
  (
    CC char(5),
    insumo numeric(7,0),
    Cantidad numeric(16,6),
    Importe numeric(16,6)
  );

  CREATE TABLE #tblPrecioCompraXPlaza
  (
    PlazaId char(5),
    InsumoId numeric(7,0),
    Cantidad numeric(16,6),
    Importe numeric(16,6)
  );

  CREATE TABLE #tblFechaPrecioActual
  (
    PlazaId char(5),
    InsumoId numeric(7,0),
    Convenio tinyint,
    FechaPrecioFinal datetime
  );

  CREATE TABLE #tblPreciosInsumosActual
  (
    PlazaId char(5),
    NombrePlaza varchar(50),
    InsumoId numeric(7,0),
    Cantidad numeric(16,6),
    ImporteCompra numeric(16,6),
    ImponteCompraIA numeric(16,6),
    ImponteCompraIC numeric(16,6),
    ImporteActual numeric(16,6),
    ImporteConvenio numeric(16,6)
  );

  CREATE TABLE #tblPreciosInsumosXPlaza
  (
    PlazaId char(5),
    NombrePlaza varchar(50),
    InsumoId numeric(7,0),
    Cantidad numeric(16,6),
    ImporteCompra numeric(16,6),
    ImponteCompraIA numeric(16,6),
    ImponteCompraIC numeric(16,6),
    ImporteActual numeric(16,6),
    ImporteConvenio numeric(16,6)
  );

  INSERT INTO #tblInsumosXCC (cc, insumo)
  SELECT
    M.cc, MD.insumo
  FROM si_movimientos_det AS MD
  INNER JOIN si_movimientos AS M
    ON M.almacen = MD.almacen
    AND M.tipo_mov = MD.tipo_mov
    AND M.numero = MD.numero
  INNER JOIN si_almacen AS AL
    ON AL.almacen = M.almacen
  INNER JOIN insumos AS I
    ON I.insumo = MD.insumo
  INNER JOIN cc AS CC
    ON CC.cc = M.cc
  INNER JOIN sp_proveedores AS P
    ON P.numpro = m.proveedor
  INNER JOIN ek091ab AS EK
    ON EK.id_identificador = CC.id_identificador
  WHERE 1=1
  AND M.tipo_mov = 1
  AND M.fecha BETWEEN @FechaInicio AND @FechaFin
  GROUP BY M.cc, MD.insumo;

  INSERT INTO #tblPrecioCompra (CC, Insumo, Cantidad, Importe)
  SELECT
    OCD.cc,
    OCD.insumo,
    SUM(OCD.cantidad),
    SUM(OCD.importe)
  FROM so_orden_compra_det AS OCD
  INNER JOIN so_orden_compra AS OC
    ON OC.cc = OCD.cc
    AND OC.numero = OCD.numero
  INNER JOIN #tblInsumosXCC AS ICC
    ON ICC.insumo = OCD.insumo
  WHERE 1=1
  AND ISNULL(OC.estatus,'') <> 'C'
  AND OC.fecha BETWEEN @FechaInicio AND @FechaFin
  GROUP BY
    OCD.cc,
    OCD.insumo;


  INSERT INTO #tblPrecioCompraXPlaza(PlazaId, InsumoId, Cantidad, Importe)
  SELECT
    MP.c_codigo_pza,
    PC.Insumo,
    SUM(PC.Cantidad),
    SUM(PC.Importe)
  FROM #tblPrecioCompra AS PC
  INNER JOIN mej_plaza AS MP
    ON MP.cc = PC.CC
  WHERE 1=1
  GROUP BY
    MP.c_codigo_pza,
    PC.Insumo;

  INSERT INTO #tblFechaPrecioActual (PlazaId, InsumoId, Convenio, FechaPrecioFinal)
  SELECT
    VCP.c_codigo_pza,
    VCP.insumo,
    CASE WHEN CAST(VCP.c_codigo_pza AS varchar)+''+CAST(VCP.insumo AS varchar) IN
      (
        SELECT
          CAST(T1.c_codigo_pza AS varchar)+''+CAST(T1.insumo AS varchar)
          FROM viv_cat_precios AS T1
          WHERE T1.convenio = 1
          AND T1.fecha_captura BETWEEN @FechaInicio AND @FechaFin
      )
      THEN 1
      ELSE 0 END,
    MAX(VCP.fecha_captura)
  FROM viv_cat_precios AS VCP
  WHERE 1=1
  AND VCP.fecha_captura BETWEEN @FechaInicio AND @FechaFin
  AND CASE WHEN CAST(VCP.c_codigo_pza AS varchar)+''+CAST(VCP.insumo AS varchar) IN
      (
        SELECT
          CAST(T.c_codigo_pza AS varchar)+''+CAST(T.insumo AS varchar)
          FROM viv_cat_precios AS T
          WHERE T.convenio = 1
          AND T.fecha_captura BETWEEN @FechaInicio AND @FechaFin
      )
      THEN VCP.convenio
      ELSE 1 END = 1
  GROUP BY VCP.c_codigo_pza, VCP.insumo;

  INSERT INTO #tblPreciosInsumosActual
      (PlazaId, NombrePlaza, InsumoId, Cantidad, ImporteCompra, ImponteCompraIA, ImponteCompraIC, ImporteActual, ImporteConvenio)
  SELECT
    VCP.c_codigo_pza,
    TRIM(MP.v_nombre_pza),
    VCP.insumo,
    PCP.Cantidad,
    PCP.Importe,
    CASE WHEN TFP.Convenio = 0 THEN PCP.Importe ELSE 0 END,
    CASE WHEN TFP.Convenio = 1 THEN PCP.Importe ELSE 0 END,
    CASE WHEN TFP.Convenio = 0 THEN (PCP.Cantidad * ((VCP.precio * 100) / 116)) ELSE 0 END,
    CASE WHEN TFP.Convenio = 1 THEN (PCP.Cantidad * ((VCP.precio * 100) / 116)) ELSE 0 END
  FROM viv_cat_precios AS VCP
  INNER JOIN #tblFechaPrecioActual AS TFP
    ON TFP.PlazaId = VCP.c_codigo_pza
    AND TFP.InsumoId = VCP.insumo
    AND TFP.FechaPrecioFinal = VCP.fecha_captura
  INNER JOIN #tblPrecioCompraXPlaza AS PCP
    ON PCP.PlazaId = VCP.c_codigo_pza
    AND PCP.InsumoId = VCP.insumo
  INNER JOIN mej_plaza AS MP
    ON MP.c_codigo_pza = PCP.PlazaId
  WHERE 1=1
  AND VCP.fecha_captura BETWEEN @FechaInicio AND @FechaFin;

  INSERT INTO #tblPreciosInsumosXPlaza
    (PlazaId, NombrePlaza, InsumoId, Cantidad, ImporteCompra, ImponteCompraIA, ImponteCompraIC, ImporteActual, ImporteConvenio)
  SELECT
    PlazaId,
    NombrePlaza,
    InsumoId,
    Cantidad,
    ImporteCompra,
    ImponteCompraIA,
    ImponteCompraIC,
    ImporteActual,
    ImporteConvenio
  FROM #tblPreciosInsumosActual
  GROUP BY
    PlazaId,
    NombrePlaza,
    InsumoId,
    Cantidad,
    ImporteCompra,
    ImponteCompraIA,
    ImponteCompraIC,
    ImporteActual,
    ImporteConvenio;

  SELECT
    PlazaId,
    NombrePlaza,
    SUM(Cantidad),
    SUM(ImporteCompra),
    SUM(ImponteCompraIA),
    SUM(ImponteCompraIC),
    SUM(ImporteActual),
    SUM(ImporteConvenio),
    SUM(ImporteActual) - SUM(ImponteCompraIA) AS VsBase,
    SUM(ImporteConvenio) - SUM(ImponteCompraIC) AS VsConvenio,
    (SUM(ImporteActual) - SUM(ImponteCompraIA)) + (SUM(ImporteConvenio) - SUM(ImponteCompraIC)) AS Ahorro,
    (((SUM(ImporteActual) - SUM(ImponteCompraIA)) + (SUM(ImporteConvenio) - SUM(ImponteCompraIC))) / SUM(ImporteCompra)) * 100 ASPorcentAhorro
  FROM #tblPreciosInsumosXPlaza
  GROUP BY
    PlazaId,
    NombrePlaza;

END