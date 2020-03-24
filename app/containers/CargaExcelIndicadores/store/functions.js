import XLSX from 'xlsx';
// import moment from 'moment';
// import espanol from 'moment/src/locale/es';

let errorsLayout = [];

const directionCell = (value) =>{
  const alignDefault = 'left'
  const directions = [
    {
      type: ['date', 'int'],
      align: 'center',
    },
    {
      type: ['varchar'],
      align: 'left',
    },
    {
      type: ['money', 'percent'],
      align: 'right',
    },
  ]
  value = value ? value.toLowerCase(): value
  const result = directions.find( items => items.type.some( item => item === value))
  return result ? result.align : alignDefault
}

const transformValue = (type, value) =>{
  let result = ''
  switch (type) {
    case 'int':
    case 'smallint':
      if (typeof value === 'undefined') {
        value = 0;
      } else {
        value = parseInt(value, 10);
      }
      result = value
      break;
    case 'percent':
      if (typeof value === 'undefined') {
        value = 0.00;
      } else{
        value = `${value} %`
      }
      result = value;
      break;
    case 'numeric':
      if (typeof value === 'undefined') {
        value = 0.00;
      } else {
        value = parseFloat(value).toLocaleString('es-MX', { style:'currency', currency:'MXN', minimumFractionDigits: 2, maximumFractionDigits: 2})
      }
      result = value;
      break;
    default:
      if (typeof value === 'undefined') {
        value = "";
      } else {
        value = value.toString().toUpperCase();
      }
      result = value;
      break;
  }

  return result
}

const validateDataTypes = (rows, headers) => {
  const response = {
    result: true,
    errorsLayout: [],
    msjError: '',
    rows: [],
  }
  response.rows = rows.map((row, idxRow) => {
    Object.keys(row).forEach((cell, idxCell) => {
      const type = headers[idxCell].Type
      const column = (headers[idxCell].Column).toLowerCase()
      let value = row[column]
      switch (type) {
        case 'int':
        case 'smallint':
        case 'numeric':
          try {
            // eslint-disable-next-line no-restricted-globals
            if (typeof value === 'undefined') {
              value = 0;
            }
            if(typeof value === 'string'){
              if (Number(value)) {
                value = value.replace(',', '');
                value = value.replace('$', '');
                value = Number(value)
              } else {
                addErrorDataType(idxRow, column, value)
              }
            }
            if(typeof value === 'string' && value.includes('.')){
              if (Number(value)) {
                value = Number(value)
              } else {
                addErrorDataType(idxRow, column, value)
              }
            }
          } catch (err) {
            addErrorDataType(idxRow, column, value)
          }
          break;
        case 'percent':
          try {

            if (typeof value === 'undefined') {
              value = 0;
            }
            if(typeof value === 'string'){
              value = value.replace('%', '');
              value = Number(value)
            }
          } catch (err) {
            addErrorDataType(idxRow, column, value)
          }
          break;
        case 'varchar':
          // eslint-disable-next-line no-restricted-globals
          if (typeof value === 'undefined') {
            value = " ";
          }
          try{
            value = value.toString()
          }catch(err){
            addErrorDataType(idxRow, column, value)
          }
          break;
        case 'date':
          if (typeof value === 'undefined') {
            value = " ";
          }
          if(value){
            if (!(value.match('-') || value.match('/'))) {
              addErrorDataType(idxRow, column, value)
            }
          } else {
            addErrorDataType(idxRow, column, value)
          }
          break;
        default:
          addErrorDataType(idxRow, column, value)
          break;
      }
      row[column] = value;
      value = '';
    });
    return row;
  })

  if(errorsLayout.length > 0) {
    const columns = {}
    const columnsError = []
    errorsLayout.forEach(err => {
      err.cell.forEach(c => {
        Object.assign(columns, {[c.column]: c.column})
      })
    });
    columnsError.push(Object.keys(columns));
    Object.assign(response, {
      result : false,
      errorsLayout : columnsError,
      errorsComplete: errorsLayout,
      msjError : `La(s) siguientes celdas cuenta con datos corruptos.`,
    });
  }
  errorsLayout = [];
  return response
}

const validateColumnRequired = ( columsRequired = [], columnsContent = []) => {
  const response = {
    result: false,
    errorsColumns: [],
    msjError: '',
  };
  const required = columsRequired.map(col =>  col.toLocaleLowerCase().trim())
  const content = columnsContent.map(col => col.toLocaleLowerCase().trim())
  if(content.length !== required.length) {
    response.msjError = 'Cantidad de columnas incorrectas, favor de consultar ayuda.'
  }else{
    required.forEach(cont => {
      if(!content.some(req => req === cont)) response.errorsColumns.push(cont)
    })
    if(response.errorsColumns.length > 0) {
      response.msjError = `Las siguientes columnas no coinciden "${response.errorsColumns}", favor de consultar layout de ayuda.`
    }else{
      response.result = true
    }
  }
  return response
}

const addErrorDataType = (idxRow, column, value) => {
  const rowError = errorsLayout.findIndex( err => err.row === idxRow)
  if(rowError >= 0){
  // if(errorsLayout.some(error => error.row === idxRow)){
    errorsLayout[rowError].cell.push(
      { column,
        value,
      })
  }else{
    errorsLayout.push({
      row: idxRow,
      cell: [
        {
          column,
          value,
        }],
    })
  }
}

const downloadExcel = ( headers = [], rows = [], layoutName = 'Descarga') => {
  const response = { result: true };
  if (rows && rows.length) {
    try{
      const data = [
        headers,
        ...rows,
      ]
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
      XLSX.writeFile(wb, layoutName.concat('.xlsx'));

    }catch(err){
      Object.assign(response, {
        result: false,
        message: 'Ocurrio un problema al descargar, favor de comunicarse con Soporte.',
        variant: 'error' ,
      })
      return response;
    }
  }else{
    Object.assign(response, {
      result: false,
      message: 'Ocurrio un problema al descargar, favor de comunicarse con Soporte.',
      variant: 'error' ,
    })
    return response;
  }
  return response;
}

const exportLayout = (content = [], layoutName = "Carga Indicadores") => {
  const responseExport = { result: true }
  const headers = content && content.length > 0 ? content[0].Content.map(cont => cont.Column) : [];
  const rows = content.map(dt => dt.Content.map(cont => cont.Value))
  const responseDownload = downloadExcel(
    headers,
    rows,
    `Ejemplo Layout ${layoutName}`,
  )
  if (!responseDownload.result) {
    return responseDownload
  }
  return responseExport;
}

export {
  directionCell,
  transformValue,
  validateDataTypes,
  validateColumnRequired,
  exportLayout,
};
