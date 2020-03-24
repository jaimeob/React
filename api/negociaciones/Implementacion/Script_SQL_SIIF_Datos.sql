USE SIIF
GO
/*
SELECT * FROM Modulo --13
SP_HELP Parametros
SELECT * FROM Parametros
*/
INSERT INTO Parametros (IdParametro, Clave, Descripcion, Valor, ModuloId, EmpleadoCreacionId)
SELECT 1, 'APIN', 'Años Porcentaje de Impacto Negociaciones', '[2016,2017,2018,2019]', 13, 25919

INSERT INTO Parametros (IdParametro, Clave, Descripcion, Valor, ModuloId, EmpleadoCreacionId)
SELECT 2, 'PIAN', 'Porcentaje de Impacto por Año Negociaciones', '{"A2016": 9,"A2017": 9,"A2018": 9,"A2019": 9}', 13, 25919

/*
INSERT INTO Parametros (IdParametro, Clave, Descripcion, Valor, ModuloId, EmpleadoCreacionId)
SELECT 'RFACN', 'Rango de Fechas Ahorro Compras Negociaciones', '{"minima": "2016-01-01","maxima": "2019-12-31"}', 13, 25919
*/
INSERT INTO Parametros (IdParametro, Clave, Descripcion, Valor, ModuloId, EmpleadoCreacionId)
SELECT 3, 'MACN', 'Meta Ahorro Compras Negociaciones', '{"A2016": 1,"A2017": 1,"A2018": 1,"A2019": 1}', 13, 25919

UPDATE Plaza SET IdPlazaFincasin = 6 WHERE IdPlaza = 1
UPDATE Plaza SET IdPlazaFincasin = 1 WHERE IdPlaza = 2
UPDATE Plaza SET IdPlazaFincasin = 4 WHERE IdPlaza = 3
UPDATE Plaza SET IdPlazaFincasin = 5 WHERE IdPlaza = 4
UPDATE Plaza SET IdPlazaFincasin = 7 WHERE IdPlaza = 5
UPDATE Plaza SET IdPlazaFincasin = 2 WHERE IdPlaza = 6
UPDATE Plaza SET IdPlazaFincasin = 11 WHERE IdPlaza = 8
UPDATE Plaza SET IdPlazaFincasin = 12 WHERE IdPlaza = 10

INSERT INTO Parametros (IdParametro, Clave, Descripcion, Valor, ModuloId, EmpleadoCreacionId)
SELECT 4, 'MDPN', 'Meta Dias Promedio Negociaciones', '{"A2016": 1,"A2017": 1,"A2018": 1,"A2019": 1}', 13, 25919