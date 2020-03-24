import React from 'react';
import T from 'prop-types';
import { TextoCorto } from '../TextoCorto';
import MultipleSelection  from '../MultipleSelection';
import SimpleSelection  from '../SimpleSelection';
import ListDesplegable from '../ListDesplegable';
import CargarArchivo from '../CargarArchivo';
import Catalogo from '../Catalogo';
import {
  BouncyDiv,
} from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class ComponentConfi extends React.Component {
  
  render() {
    const {
      idTipoComponente,
      componentes,
      divSelecionado,
      titulo,
      valor,
      valorNumero,
      requerido,
      relacionaOtro,
      requeridoRelacion,
      longitud,
      onChangeTipo,
      onChangeObligatorio,
      onClickedDelete,
      onClickedButtom,
      onInputChange,
      onChangeLongitud,
      error,
      error2,
      errorTipo,
      errorLongitud,
      helpertext,
      helpertext2,
      TamañoArchivos,
      CantidadArchivos,
      onChangeText,
      tipoArchivo,
      onChangeTipoArchivo,
      onChangeTamañosArchivos,      
      arrCatalogos,
      obtenerCatalogos,
      onChangeValueCatalogo,
      onChangeSwitchRelacion,
      onChangeSwitchRelacionaOtro,
      notificacion,
    } = this.props;
    const data = componentes[divSelecionado].config.opciones
    switch(idTipoComponente) {
      case 0:
        return (
          <BouncyDiv >
            <TextoCorto
              titulo={titulo} 
              valor={valor}
              requerido={requerido}
              onChangeTipo={onChangeTipo}
              divSelecionado={divSelecionado}
              onChangeObligatorio ={onChangeObligatorio}
              longitud={longitud}
              onChangeLongitud={onChangeLongitud}
              error={error}
              errorTipo={errorTipo}
              errorLongitud={errorLongitud}
              helpertext={helpertext}
              idTipoComponente={idTipoComponente}
            />
          </BouncyDiv>
        )
      case 1:
        return (
          <BouncyDiv >
            <TextoCorto
              titulo={titulo} 
              valor={valor}
              requerido={requerido}
              onChangeTipo={onChangeTipo}
              divSelecionado={divSelecionado}
              onChangeObligatorio ={onChangeObligatorio}
              longitud={longitud}
              onChangeLongitud={onChangeLongitud}
              error={error}
              errorTipo={errorTipo}
              errorLongitud={errorLongitud}
              helpertext={helpertext}
              idTipoComponente={idTipoComponente}
            />
          </BouncyDiv>
        )
      case 2:
        return (
          <BouncyDiv >
            <MultipleSelection
              titulo={titulo}
              requerido={requerido}
              opciones={data}
              onClickedDelete={onClickedDelete}
              onClickedButtom={onClickedButtom}
              onInputChange={onInputChange}
              idTipoComponente={idTipoComponente}
              divSelecionado={divSelecionado}
              onChangeObligatorio ={onChangeObligatorio}
            /> </BouncyDiv>
        )
      case 3:
        return (
          <BouncyDiv > 
            <SimpleSelection
              titulo={titulo}
              requerido={requerido}
              opciones={data}
              onClickedDelete={onClickedDelete}
              onClickedButtom={onClickedButtom}
              onInputChange={onInputChange}
              idTipoComponente={idTipoComponente}
              divSelecionado={divSelecionado}
              onChangeObligatorio ={onChangeObligatorio}
            />
          </BouncyDiv>
        )
      case 4:
        return (
          <BouncyDiv > 
            <ListDesplegable
              titulo={titulo}
              opciones={data}
              onClickedDelete={onClickedDelete}
              onClickedButtom={onClickedButtom}
              onInputChange={onInputChange}
              idTipoComponente={idTipoComponente}
              divSelecionado={divSelecionado}
              onChangeObligatorio ={onChangeObligatorio}
            />
          </BouncyDiv>
        )
      case 5:
        return (
          <BouncyDiv > 
            <CargarArchivo
              requerido={requerido}
              CantidadArchivos={CantidadArchivos}
              TamañoArchivos={TamañoArchivos}
              divSelecionado={divSelecionado}
              onChangeObligatorio ={onChangeObligatorio}
              onChangeText={onChangeText}
              tipoArchivo={tipoArchivo}
              onChangeTipoArchivo={onChangeTipoArchivo}
              error={error}
              error2={error2}
              helpertext={helpertext}
              helpertext2={helpertext2}
              onChangeTamañosArchivos={onChangeTamañosArchivos}
            />
          </BouncyDiv>
        )
      case 6:
        return(
          <BouncyDiv> 
            <Catalogo
              titulo={titulo} 
              valorNumero={valorNumero}
              requerido={requerido}
              relacionaOtro={relacionaOtro}
              requeridoRelacion={requeridoRelacion}
              onChangeTipo={onChangeTipo}
              divSelecionado={divSelecionado}
              onChangeObligatorio ={onChangeObligatorio}
              longitud={longitud}
              onChangeLongitud={onChangeLongitud}
              error={error}
              helpertext={helpertext}
              idTipoComponente={idTipoComponente}
              arrCatalogos={arrCatalogos}
              obtenerCatalogos={obtenerCatalogos}
              onChangeValueCatalogo={onChangeValueCatalogo}
              onChangeSwitchRelacion={onChangeSwitchRelacion}
              onChangeSwitchRelacionaOtro={onChangeSwitchRelacionaOtro}
              notificacion={notificacion}
            />
          </BouncyDiv>
        )
        
      default:
        return null;
    }
  }
}

ComponentConfi.propTypes = {
  idTipoComponente: T.number,
  componentes: T.arrayOf(T.object),
  divSelecionado: T.number,
  titulo: T.string,
  valor: T.string,
  valorNumero: T.number,
  requerido: T.bool,
  relacionaOtro: T.bool,
  requeridoRelacion: T.bool,
  longitud: T.string,
  onChangeTipo: T.func,
  onChangeObligatorio: T.func,
  onClickedDelete: T.func,
  onClickedButtom: T.func,
  onInputChange: T.func,
  onChangeLongitud: T.func,
  arrCatalogos:T.array,
  error: T.bool,
  errorTipo: T.bool,
  errorLongitud: T.bool,
  error2: T.bool,
  helpertext: T.string,
  helpertext2: T.string,
  TamañoArchivos: T.string,
  CantidadArchivos: T.string,
  onChangeText: T.func,
  tipoArchivo: T.string,
  onChangeTipoArchivo: T.func,
  onChangeTamañosArchivos: T.func,
  obtenerCatalogos: T.func,
  onChangeValueCatalogo:  T.func,
  onChangeSwitchRelacion: T.func,
  onChangeSwitchRelacionaOtro: T.func,
  notificacion: T.func,
};

export default ComponentConfi;
