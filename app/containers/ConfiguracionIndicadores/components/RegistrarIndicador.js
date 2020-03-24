/* eslint-disable radix */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { compose } from 'redux';
import { withHandlers } from 'recompose';
import CancelIcon from '@material-ui/icons/Cancel';
import WarningIcon from '@material-ui/icons/Error';
import SuccessIcon from '@material-ui/icons/Check';

import ComboMultiple from 'components/FiltroSeleccion';

const styles = theme => ({
  title: {
    color: '#6d6d6d',
    textAlign: 'center',
    fontSize: 14,
  },
  stepIcon:{
    color: '#f9aa33 !important',
    width: 30,
    height: 30,
  },
  stepper:{
    marginTop: 16,
  },
  buttonNext: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    backgroundColor: '#3f51b5',
    '&:hover': {
      backgroundColor: '#3f51b5',
      transition: 'opacity ease-in-out 0.5s',
      opacity: '0.8',
    },
  },
  buttonPrevious: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    backgroundColor: '#f5f5f5',
    '&:hover': {
      backgroundColor: '#f5f5f5',
      transition: 'opacity ease-in-out 0.5s',
      opacity: '0.8',
    },
    color: '#3f51b5',
  },
  actionsContainer: {
    marginTop: 30,
    float: 'right',
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
    textAlign: 'right',
  },
  grid: {
    marginTop: 25,
  },
  semaforoTextField: {
    width: 80,
    marginRight: 30,
    backgroundColor: 'white',
  },
  cancelIcon: {
    color: '#ff0023',
    position: 'relative',
    top: -30,
  },
  hierarchyLine: {
    borderTop: '1px solid #c4c4c4',
    borderRight: '1px solid #c4c4c4',
    borderBottom: 'none',
    borderLeft: '1px solid #c4c4c4',
    borderImage: 'initial',
    width: 90,
    height: 56,
    position: 'relative',
    right: -140,
    top: -11,
    float: 'left',
    textAlign: 'center',
  },
  warningIcon: {
    color: '#f9aa33',
    position: 'relative',
    top: -30,
  },
  successIcon: {
    color: 'white',
    backgroundColor: '#28950f',
    borderRadius: '50%',
    position: 'relative',
    top: -30,
    width: 20,
    height: 20,
  },
  buttonSuccess: {
    marginLeft: 20,
    backgroundColor: '#28950F',
    '&:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)',
    },
    '&:hover': {
      backgroundColor: '#1d7109',
    },
    color: 'white',
    minWidth: 84.88,
  },
});

class RegistrarIndicador extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  getSteps = () => ['Datos Generales', 'Datos del indicador', 'Parámetros', 'Configuración de corte', 'Semáforo'];
  
  limitInputs = (limitBy = 2) => (e) => {
    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0, limitBy)
  }

  decimalInputs = (limitBy = 2) => (e) => {
    e.target.value = e.target.value.toString().slice(0, limitBy)
  }

  getStepContent = (step) => {
    const {
      classes,
      onInputChangeProxy,
      actions: {
        setTextFieldAction,
        setBonusAction,
        validateInputMinimumLengthAction,
        validateSemaphoreAction,
        requestIndicatorsWeightAction,
      },
      params: {
        indicatorDescription,
        selectedIndicator,
        selectedDepartment,
        selectedPosition,
        indicators,
        departments,
        positions,
        indicatorType,
        selectedIndicatorType,
        indicatorMeasurement,
        selectedIndicatorMeasurement,
        indicatorWeight,
        indicatorMinimum,
        indicatorObjective,
        indicatorMaximum,
        bonus,
        indicatorDataTypes,
        selectedIndicatorDataType,
        comparisonValue,
        indicatorOptimization,
        selectedOptimization,
        modules,
        selectedModule,
        storedProcedures,
        selectedStoredProcedure,
        indicatorCuts,
        selectedIndicatorCut,
        indicatorCutsPeriod,
        selectedIndicatorCutPeriod,
        maloMin,
        maloMax,
        regularMin,
        regularMax,
        buenoMin,
        buenoMax,
        moduleOptions,
        selectedModuleOption,
        errors,
        edit,
        activeIndicator,
        selectedIndicatorDetail,
        idsIndicators,
        grupos,
        selectedGrupo,
      },
      permisos,
    } = this.props;


    // selectedGrupo.value === null || selectedGrupo.value===1 || edit
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <Grid container className={classes.grid} spacing={24}>
              <Grid item xs={6}>
                <ComboMultiple
                  inhabilitado={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0}
                  valor={selectedIndicator}
                  onChange={onInputChangeProxy}
                  opciones={selectedIndicatorDetail === 0 ? indicators.filter(el => !idsIndicators.includes(el.value)) : indicators}
                  campoValido
                  requerido
                  label='Seleccione el indicador'
                  indice={1}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="indicator-description"
                  disabled
                  value={indicatorDescription}
                  onChange={(e) => setTextFieldAction('indicatorDescription', e.target.value)}
                  placeholder="Capture una descripción corta para el indicador"
                  margin="normal"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container className={classes.grid} spacing={24}>
              <Grid item xs={6}>
                <ComboMultiple
                  inhabilitado={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0 || edit}
                  valor={selectedGrupo}
                  onChange={onInputChangeProxy}
                  opciones={selectedIndicatorDetail === 0 ? grupos.filter(el => !grupos.includes(el.Nombre)) : grupos}
                  campoValido
                  requerido
                  label='Seleccione grupo'
                  indice={13}
                />
              </Grid>
              <Grid item xs={6}>
                <ComboMultiple
                  inhabilitado={selectedGrupo.value === null || selectedGrupo.value===1 || edit}
                  valor={selectedDepartment === null && selectedGrupo.value === 3 ? 0 : selectedDepartment}
                  onChange={onInputChangeProxy}
                  opciones={departments}
                  multiple={selectedGrupo.value===3}
                  campoValido
                  requerido
                  label='Seleccione el departamento'
                  indice={2}
                />
              </Grid>
            </Grid>
            <Grid container className={classes.grid} spacing={24}>
              <Grid item xs={6}>
                <ComboMultiple
                  inhabilitado={positions.length === 0 || edit || selectedGrupo.value === null || selectedGrupo.value===1 || selectedGrupo.value===3 }
                  valor={selectedPosition === null && selectedGrupo.value === 2 ? 0 : selectedPosition}
                  onChange={onInputChangeProxy}
                  opciones={positions}
                  multiple={selectedGrupo.value === 2}
                  campoValido
                  requerido
                  label='Seleccione el puesto a los que aplicará el indicador'
                  indice={3}
                />
              </Grid>
              <Grid item xs={6}>
                <ComboMultiple
                  inhabilitado={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0}
                  valor={selectedIndicatorType}
                  onChange={onInputChangeProxy}
                  opciones={indicatorType}
                  campoValido
                  requerido
                  label='Indique el tipo de indicador a configurar'
                  indice={4}
                />
              </Grid>
            </Grid>
            <Grid container className={classes.grid} spacing={24}>
              <Grid item xs={6}>
                <ComboMultiple
                  inhabilitado={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0}
                  valor={selectedIndicatorMeasurement}
                  onChange={onInputChangeProxy}
                  opciones={indicatorMeasurement}
                  campoValido
                  requerido
                  label='Seleccione la medida del indicador'
                  indice={5}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <Grid container className={classes.grid} spacing={24}>
              <Grid item xs={6}>
                <TextField
                  disabled={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0}
                  id="indicator-weight"
                  onInput = {this.limitInputs(3)}
                  value={indicatorWeight}
                  onChange={(e) => {
                    setTextFieldAction('indicatorWeight', e.target.value);
                    requestIndicatorsWeightAction();
                  }}
                  placeholder="Ingrese el peso del indicador"
                  label="Peso"
                  margin="normal"
                  fullWidth
                  type="number"
                  helperText="*Requerido"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0}
                  id="indicator-minimum"
                  onInput = {this.limitInputs(3)}
                  value={indicatorMinimum}
                  onChange={(e) => {
                    setTextFieldAction('indicatorMinimum', e.target.value);
                    validateInputMinimumLengthAction('indicatorMinimum', 3, 'El valor tiene que ser mayor o igual 100');
                  }}
                  placeholder="Indique el mínimo del indicador"
                  label="Mínimo"
                  margin="normal"
                  fullWidth
                  type="number"
                  helperText="*Requerido"
                />
              </Grid>
            </Grid>
            <Grid container className={classes.grid} spacing={24}>
              <Grid item xs={6}>
                <TextField
                  disabled={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0}
                  id="indicator-objective"
                  onInput = {this.limitInputs(3)}
                  value={indicatorObjective}
                  onChange={(e) => {
                    setTextFieldAction('indicatorObjective', e.target.value);
                    validateInputMinimumLengthAction('indicatorObjective', 3, 'El valor tiene que ser mayor a 100');
                  }}
                  placeholder="Indique el objetivo del indicador"
                  label="Objetivo"
                  margin="normal"
                  fullWidth
                  type="number"
                  helperText={errors.indicatorObjective.message}
                  error={errors.indicatorObjective.error}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0}
                  id="indicator-maximum"
                  onInput = {this.limitInputs(3)}
                  value={indicatorMaximum}
                  onChange={(e) =>  {
                    setTextFieldAction('indicatorMaximum', e.target.value);
                    validateInputMinimumLengthAction('indicatorMaximum', 3, 'El valor tiene que ser mayor a 100');
                  }}
                  placeholder="Indique el máximo del indicador"
                  label="Máximo"
                  margin="normal"
                  fullWidth
                  type="number"
                  helperText={errors.indicatorMaximum.message}
                  error={errors.indicatorMaximum.error}
                />
              </Grid>
            </Grid>
            <Grid container className={classes.grid} spacing={24}>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Switch
                      disabled={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0}
                      checked={bonus}
                      onChange={setBonusAction}
                      value={bonus}
                      color="primary"
                    />
                  }
                  label="Detona bono"
                />
              </Grid>
            </Grid>
          </React.Fragment>
        );
      case 2:
        return(
          <React.Fragment>
            <Grid container className={classes.grid} spacing={24}>
              <Grid item xs={6}>
                <ComboMultiple
                  inhabilitado={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0}
                  valor={selectedIndicatorDataType}
                  onChange={onInputChangeProxy}
                  opciones={indicatorDataTypes}
                  campoValido
                  requerido
                  label='Seleccione el tipo de datos'
                  indice={6}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0}
                  id="indicator-comparisonvalue"
                  onInput = {this.decimalInputs(3)}
                  value={comparisonValue}
                  onChange={(e) => {
                    setTextFieldAction('comparisonValue', e.target.value);
                  }}
                  placeholder="Ingrese el valor de comparación del indicador"
                  label="Ingrese el valor de comparación del indicador"
                  fullWidth
                  type="text"
                  helperText={errors.comparisonValue.message}
                  error={errors.comparisonValue.error}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container className={classes.grid} spacing={24}>
              <Grid item xs={6}>
                <ComboMultiple
                  inhabilitado={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0}
                  valor={selectedOptimization}
                  onChange={onInputChangeProxy}
                  opciones={indicatorOptimization}
                  campoValido
                  requerido
                  label='Indique la optimización del indicador'
                  indice={7}
                />
              </Grid>
              <Grid item xs={6}>
                <ComboMultiple
                  inhabilitado={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0}
                  valor={selectedModule}
                  onChange={onInputChangeProxy}
                  opciones={modules}
                  campoValido
                  requerido
                  label='Seleccione el módulo al que hace referencia el indicador'
                  indice={8}
                />
              </Grid>
            </Grid>
            <Grid container className={classes.grid} spacing={24}>
              <Grid item xs={6}>
                <ComboMultiple
                  inhabilitado={selectedModule === null || storedProcedures.length === 0 || activeIndicator === 0}
                  valor={selectedStoredProcedure}
                  onChange={onInputChangeProxy}
                  opciones={storedProcedures}
                  campoValido
                  requerido
                  label='Seleccione el procedimiento que ejecuta el indicador'
                  indice={9}
                />
              </Grid>
              {
                moduleOptions.length > 0 && (
                  <Grid item xs={6}>
                    <ComboMultiple
                      inhabilitado={selectedModule === null || moduleOptions.length === 0 || activeIndicator === 0}
                      valor={selectedModuleOption}
                      onChange={onInputChangeProxy}
                      opciones={moduleOptions}
                      campoValido
                      requerido
                      label='Seleccione la opción del módulo'
                      indice={12}
                    />
                  </Grid>
                )
              }
            </Grid>
          </React.Fragment>
        )
      case 3:
        return (
          <React.Fragment>
            <Grid container className={classes.grid} spacing={24}>
              <Grid item xs={6}>
                <ComboMultiple
                  inhabilitado={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0}
                  valor={selectedIndicatorCut}
                  onChange={onInputChangeProxy}
                  opciones={indicatorCuts}
                  campoValido
                  requerido
                  label='Seleccione el corte del indicador'
                  indice={10}
                />
              </Grid>
              <Grid item xs={6}>
                <ComboMultiple
                  inhabilitado={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0}
                  valor={selectedIndicatorCutPeriod}
                  onChange={onInputChangeProxy}
                  opciones={indicatorCutsPeriod}
                  campoValido
                  requerido
                  label='Seleccione el corte del periodo del indicador'
                  indice={11}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        )
      case 4:
        return (
          <React.Fragment>
            <Grid container className={classes.grid} spacing={24}>
              <Grid item xs={4}>
                <div className={classes.hierarchyLine}>
                  <CancelIcon className={classes.cancelIcon} />
                </div>
                <TextField
                  disabled={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0}
                  id="malo-min"
                  onInput = {this.limitInputs(2)}
                  className={classes.semaforoTextField}
                  value={maloMin}
                  onChange={(e) => {
                    setTextFieldAction('maloMin', e.target.value);
                    validateSemaphoreAction('maloMin', '', 'maloMax');
                  }}
                  margin="normal"
                  variant="outlined"
                  type="number"
                  error={errors.maloMin.error}
                  helperText={errors.maloMin.message}
                />
                <TextField
                  disabled={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0}
                  id="malo-max"
                  onInput = {this.limitInputs(2)}
                  className={classes.semaforoTextField}
                  value={maloMax}
                  onChange={(e) => {
                    setTextFieldAction('maloMax', e.target.value);
                    validateSemaphoreAction('maloMax', 'maloMin', 'regularMin');
                  }}
                  margin="normal"
                  variant="outlined"
                  type="number"
                  error={errors.maloMax.error}
                  helperText={errors.maloMax.message}
                />
              </Grid>
              <Grid item xs={4}>
                <div className={classes.hierarchyLine}>
                  <WarningIcon className={classes.warningIcon} />
                </div>
                <TextField
                  disabled={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0}
                  id="regular-min"
                  onInput = {this.limitInputs(2)}
                  className={classes.semaforoTextField}
                  value={regularMin}
                  onChange={(e) => {
                    setTextFieldAction('regularMin', e.target.value);
                    validateSemaphoreAction('regularMin', 'maloMax', 'regularMax');
                  }}
                  margin="normal"
                  variant="outlined"
                  type="number"
                  error={errors.regularMin.error}
                  helperText={errors.regularMin.message}
                />
                <TextField
                  disabled={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0}
                  id="regular-max"
                  onInput = {this.limitInputs(2)}
                  className={classes.semaforoTextField}
                  value={regularMax}
                  onChange={(e) => {
                    setTextFieldAction('regularMax', e.target.value);
                    validateSemaphoreAction('regularMax', 'regularMin', 'buenoMin');
                  }}
                  margin="normal"
                  variant="outlined"
                  type="number"
                  error={errors.regularMax.error}
                  helperText={errors.regularMax.message}
                />
              </Grid>
              <Grid item xs={4}>
                <div className={classes.hierarchyLine}>
                  <SuccessIcon className={classes.successIcon} />
                </div>
                <TextField
                  disabled={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0}
                  id="bueno-min"
                  onInput = {this.limitInputs(2)}
                  className={classes.semaforoTextField}
                  value={buenoMin}
                  onChange={(e) => {
                    setTextFieldAction('buenoMin', e.target.value);
                    validateSemaphoreAction('buenoMin', 'regularMax', 'buenoMax');
                  }}
                  margin="normal"
                  variant="outlined"
                  type="number"
                  error={errors.buenoMin.error}
                  helperText={errors.buenoMin.message}
                />
                <TextField
                  disabled={(permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0}
                  id="bueno-max"
                  onInput = {this.limitInputs(3)}
                  className={classes.semaforoTextField}
                  value={buenoMax}
                  onChange={(e) => {
                    setTextFieldAction('buenoMax', e.target.value);
                    validateSemaphoreAction('buenoMax', 'buenoMin', '');
                  }}
                  margin="normal"
                  variant="outlined"
                  type="number"
                  error={errors.buenoMax.error}
                  helperText={errors.buenoMax.message}
                />
              </Grid>  
            </Grid>
          </React.Fragment>
        )
      default:
        return 'Unknown step';
    }
  }

  render() {
    const { 
      classes,
      params: {
        selectedIndicator,
        selectedDepartment,
        selectedIndicatorMeasurement,
        selectedPosition,
        indicatorWeight,
        indicatorMinimum,
        indicatorObjective,
        indicatorMaximum,
        selectedIndicatorDataType,
        comparisonValue,
        selectedOptimization, 
        selectedModule,
        selectedStoredProcedure,
        selectedIndicatorCut,
        selectedIndicatorCutPeriod,
        maloMin,
        maloMax,
        regularMin,
        regularMax,
        buenoMin,
        buenoMax,
        errors,
        activeIndicator,
        selectedIndicatorDetail,
        selectedGrupo,
      },
      permisos,
      actions: {
        requestPostIndicatorAction,
      },
    } = this.props;
   
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div>
        <Typography className={classes.title}>
          Ingresa los datos solicitados para registrar el indicador.
        </Typography>
        <Paper>
          <Stepper className={classes.stepper} activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}  {...(activeStep === steps.length ? {active: true} : {} )}>
                <StepLabel
                  StepIconProps={{
                    classes: { root: classes.stepIcon },
                  }}
                >{label}</StepLabel>
                <StepContent>
                  <div>
                    {this.getStepContent(index)}
                  </div>
                  <div className={classes.actionsContainer}>
                    {
                      activeStep === steps.length
                        ? null
                        : <div>
                          <Button
                            disabled={activeStep === 0}
                            variant="contained"
                            color="primary"
                            onClick={this.handleBack}
                            className={classes.buttonPrevious}
                          >
                          Anterior
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            className={classes.buttonNext}
                            {
                            ...(
                              activeStep === 0 && (
                                selectedIndicator === null || 
                                (selectedGrupo.value === 3 && selectedDepartment === null) || 
                                selectedIndicatorMeasurement === null || 
                                (selectedGrupo.value === 2 && selectedPosition === null) || selectedGrupo.value === null) 
                                ? {disabled: true} 
                                : {} 
                            )}
                            {
                            ...(
                              activeStep === 1 && (
                                indicatorWeight === '' || 
                                indicatorMinimum === '' || 
                                indicatorObjective === '' || 
                                errors.indicatorObjective.error === true ||
                                indicatorMaximum === '' ||
                                errors.indicatorMaximum.error === true) 
                                ? {disabled: true} 
                                : {} 
                            )}
                            {
                            ...(
                              activeStep === 2 && (
                                selectedIndicatorDataType === null || 
                                comparisonValue === '' || 
                                errors.comparisonValue.error === true ||
                                selectedOptimization === null || 
                                selectedModule === null ||
                                selectedStoredProcedure === null) 
                                ? {disabled: true} 
                                : {} 
                            )}
                            {
                            ...(
                              activeStep === 3 && (
                                selectedIndicatorCut === null || 
                                selectedIndicatorCutPeriod === null) 
                                ? {disabled: true} 
                                : {} 
                            )}  
                          >
                            {activeStep === steps.length - 1 ? 'Vista previa' : 'Siguiente'}
                          </Button>
                        </div>
                    }
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Button 
                onClick={requestPostIndicatorAction} 
                className={classes.buttonSuccess}
                disabled={
                  maloMin === '' ||
                  errors.maloMin.error === true ||
                  maloMax === '' ||
                  errors.maloMin.error === true ||
                  regularMin === '' ||
                  errors.regularMin.error === true ||
                  regularMax === '' ||
                  errors.regularMax.error === true ||
                  buenoMin === '' ||
                  errors.buenoMin.error === true ||
                  buenoMax === '' ||
                  errors.buenoMax.error === true ||
                  (permisos.normales.sololectura === 1 && permisos.normales.editar === 0) || activeIndicator === 0
                }
              >
                {selectedIndicatorDetail !== 0 ? 'Actualizar' : 'Guardar'}
              </Button>
            </Paper>
          )}
        </Paper>
      </div>
    );
  }
}

RegistrarIndicador.propTypes = {
  classes: PropTypes.object,
  params: PropTypes.object,
  actions: PropTypes.object,
  onInputChangeProxy: PropTypes.func,
};


export default compose(
  withStyles(styles),
  withHandlers({
    onInputChangeProxy: (props) => (id) => (e) => {    
      const {
        actions: {
          onChangeComboAction,
        },
      } = props;
      if(id === 1)
        onChangeComboAction(id, e);
      else if(id === 2)
        onChangeComboAction(id, e);
      else
        onChangeComboAction(id, e);
    },
  })
)(RegistrarIndicador);
