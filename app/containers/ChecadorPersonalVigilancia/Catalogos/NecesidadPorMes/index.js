/* eslint-disable no-undef */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import withNotifier from 'components/HOC/withNotifier';
import{ DAEMON }from'utils/constants';
import {
  withStyles,
  Paper,
  Grid,
} from '@material-ui/core';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { enqueueSnackbar } from 'reducers/notifications/actions';
import Spinner from 'components/Spinner';
import { green } from '@material-ui/core/colors';
import Appbar from 'components/Appbar';
import AlertDialog from "components/Dialog/alertDialog";
import makeSelectNecesidadPorMes from './store/selectors';
import reducer from './store/reducer';
import saga from './store/saga';
import Actions from './store/actions';
import ListNeedsMonth from "./Components/ListNeedsMonth";
import ManageNeed from "./Components/ManageNeed";

const styles = () => ({
  paperRoot: {
    margin: '.5rem',
    padding: '.5rem',
    minHeight: '75vh',
  },
  buttonSuccess: {
    backgroundColor: '#28950F',
    color: 'white',
    '&:hover': {
      background: green[900],
    },
  },
  buttonExport: {
    float: 'right',
    marginBottom: '1rem',
    marginRight: '1rem',
  },
  container: {
    padding: '.5rem',
  },
  title: {
    textTransform: 'capitalize',
  },
})

export class NecesidadPorMes extends Component {
  componentDidMount() {
    const {
      actions: {
        getCompanysAction,
        getCurrentDateAction,
        getPlazasAction,
      },
    }= this.props;
    getCompanysAction()
    getCurrentDateAction()
    getPlazasAction()
  }

  handleSelectedCompany = event => {
    const {
      target: {
        value: companySelectedValue,
      },
    } = event;
    const {
      actions: {
        getListNeedsAction,
        getYearsNeedsAction,
        setCompanySelectedAction,
      },
      necesidadPorMes: {
        backend: {
          datasources: {
            currentDate: {
              Year,
            },
          },
        },
      },
    }= this.props;
    getYearsNeedsAction()
    setCompanySelectedAction(companySelectedValue)
    getListNeedsAction(companySelectedValue, Year)
  }

  handleSelectedPlaza = event => {
    const plaza = event.target.value
    const {
      necesidadPorMes:{
        frontend:{
          ui:{
            typeNeedSelected,
          },
        },
      },
    } = this.props;
    this.changeNeedPlazaSelected(plaza, typeNeedSelected)
  }

  changeNeedPlazaSelected = (PlazaId = 0, typeNeedSelected = 0) => {
    const needPlazaSelected = {
      IdPlaza: 0,
      Nombre: '',
      IdMes: 0,
      NombreMes: '',
      Meses: {},
      necesidad:0,
      especialActivo: false,
      especial:0,
      motivoEdita:"",
    }
    let needPlaza = {}
    let month = {}
    const {
      actions:{
        setNeedPlazaSelectedAction,
        setSelectedPlazaAction,
        setPoolDataAction,
      },
      necesidadPorMes:{
        backend:{
          datasources:{
            needs,
          },
        },
      },
    } = this.props;
    setSelectedPlazaAction(PlazaId)
    if (PlazaId) {
      needPlaza = needs.find(need => need.IdPlaza === PlazaId)
      switch (typeNeedSelected) {
        case 1:
          Object.assign(needPlazaSelected, {
            IdMes: needPlaza.IdMesNuevo,
            NombreMes: needPlaza.NombreMesNuevo,
          })
          month = needPlaza.Meses[needPlaza.NombreMesNuevo]
          break;
        case 2:
          Object.assign(needPlazaSelected, {
            IdMes: needPlaza.IdMesEditar,
            NombreMes: needPlaza.NombreMesEditar,
          })
          month = needPlaza.Meses[needPlaza.NombreMesEditar]
          break;
        default:
          break;
      }
      Object.assign(needPlazaSelected, {
        IdPlaza: needPlaza.IdPlaza,
        Nombre: needPlaza.Nombre,
        necesidad: month.necesidad || 0,
        especialActivo: Boolean(month.especialActivo),
        especial:  month.especial || 0,
        motivoEdita: month.motivoEdita,
      })
    }
    setNeedPlazaSelectedAction(needPlazaSelected)
    setPoolDataAction(needPlazaSelected)
  }

  handleFilterList = (year) => {
    const {
      actions: {
        getListNeedsAction,
        setYearSelectedAction,
      },
      necesidadPorMes: {
        frontend: {
          ui: {
            selectedCompany,
          },
        },
      },
    } = this.props;
    setYearSelectedAction(year)
    getListNeedsAction(selectedCompany, year)
  }

  handleNewNeed = () => {
    const {
      actions: {
        setTypeNeedSelectedAction,
      },
    }= this.props;
    setTypeNeedSelectedAction(1)
    this.handleChangeStep(1)
  }

  handleEditMesPlaza = id => {
    const {
      actions: {
        setTypeNeedSelectedAction,
      },
    } = this.props;
    setTypeNeedSelectedAction(2)
    this.handleChangeStep(1)
    this.changeNeedPlazaSelected(id, 2)
  }

  handleChangeStep = (step = 0) =>{
    const {
      actions: {
        changeStepAction,
      },
      necesidadPorMes:{
        frontend:{
          steps:{
            last,
            current,
          },
        },
      },
    } = this.props;
    changeStepAction( {last: !step || current, current: step || last})
  }

  handleChangeStatusSpecialService = () => {
    const {
      actions:{
        changeStatusSpecialServiceAction,
      },
      necesidadPorMes:{
        frontend:{
          needPlazaSelected:{
            especialActivo,
          },
        },
      },
    } = this.props;
    changeStatusSpecialServiceAction(0, !especialActivo)
  }

  handleChangeNeedSpecialService = event => {
    const need = event.target.value
    const {
      actions:{
        changeNeedSpecialServiceAction,
      },
    } = this.props;
    if(this.validateRegExpOnlyNumbers(need)) changeNeedSpecialServiceAction(need)
  }

  handleChangeNeed = (event) => {
    const need = event.target.value
    const {
      actions: {
        changeNeedAction,
      },
    } = this.props;
    if(this.validateRegExpOnlyNumbers(need)) changeNeedAction(need)
  }

  validateRegExpOnlyNumbers = value => {
    const rgx = new RegExp(/^[0-9]*$/)
    return rgx.test(value)
  }

  handleCancelNewNeed = () => {
    this.handleChangeStep()
    this.changeNeedPlazaSelected()
  }

  requestCancelNewNeed = () => {
    const {
      necesidadPorMes:{
        frontend:{
          needPlazaSelected,
          poolData,
        },
      },
    }=this.props;
    if(!(JSON.stringify(needPlazaSelected) === JSON.stringify(poolData))) {
      this.handleModal(true)
    }else{
      this.handleCancelNewNeed()
    }
  }

  handleModal = (status = false) => {
    const {
      actions:{
        changeStatusModalAction,
      },
    }=this.props;
    changeStatusModalAction(status)
  }

  handleModalReasonChange = (status = false) => {
    const {
      actions:{
        changeStatusModalReasonChangeAction,
      },
    }=this.props;
    changeStatusModalReasonChangeAction(status)
  }

  validateRequiredFiles = () => {
    const {
      necesidadPorMes:{
        frontend:{
          needPlazaSelected,
          ui:{
            typeNeedSelected,
          },
        },
      },
      enqueueSnackbar: enqueueSnackbarAction,
    }=this.props;

    const required = [
      'IdPlaza',
      'IdMes',
      'necesidad',
    ]
    const result = []
    if(needPlazaSelected.especialActivo) required.push('especial')
    required.forEach(require => {
      if(!needPlazaSelected[require]) result.push(require)
    })
    if (result.length > 0) {
      enqueueSnackbarAction({
        message: "Faltan datos obligatorios por captura",
        options: {
          variant: 'error',
        },
      })
    }
    else if ( typeNeedSelected === 1 ) {
      this.handleSaveNewNeed()
    }
    else{
      this.handleSaveEditNeed()
    }
  }

  handleSaveNewNeed = () => {
    const {
      actions:{
        saveNewNeedAction,
      },
      necesidadPorMes:{
        backend:{
          datasources:{
            currentDate:{
              Year,
            },
          },
        },
        frontend:{
          ui:{
            typeNeedSelected,
            selectedCompany,
            selectedYear,
          },
          needPlazaSelected:{
            IdPlaza,
            IdMes,
            necesidad,
            especialActivo,
            especial,
            motivoEdita,
          },
        },
      },
      usuarioGlobal:{
        IdEmpleado,
      },
    }=this.props;
    const newNeed ={
      Empleado: IdEmpleado,
      IdEmpresa: selectedCompany ,
      AnioRetail: selectedYear || Year,
      IdPlaza,
      MesRetail: IdMes,
      Necesidad: parseInt(necesidad, 10),
      EspecialActivo: especialActivo ? 1 : 0,
      Especial: parseInt(especial, 10),
      MotivoEdita: typeNeedSelected === 1 ? 'N/A' : motivoEdita,
    }
    saveNewNeedAction(parseInt(typeNeedSelected, 10), newNeed)
    this.changeNeedPlazaSelected()
  }

  handleSaveEditNeed = () => {
    this.handleModalReasonChange(true)
  }

  handleGoBack = () => {
    this.requestCancelNewNeed()
  }

  handleYesCancelNewNeed = () => {
    this.handleModal(false)
    this.handleCancelNewNeed()
  }

  handleNotCancelNewNeed = () => {
    this.handleModal(false)
  }

  handleCloseModalReasonChange = () => {
    this.handleModalReasonChange(false)
  }

  handleAcceptReasonChange = () => {
    this.handleModalReasonChange(false)
    this.handleSaveNewNeed()
  }

  handleChangeReasonChange = event => {
    const reason = event.target.value
    const {
      actions:{
        changeReasonAction,
      },
    } = this.props;
    changeReasonAction(reason)
  }

  getContentByStep = () => {
    const {
      necesidadPorMes:{
        backend: {
          datasources: {
            companys,
            plazas,
            years,
            currentDate: {
              Year,
              Week,
            },
            needs,
          },
        },
        frontend: {
          ui: {
            selectedCompany,
            selectedYear,
            selectedPlaza,
            typeNeedSelected,
            reason,
            modalReasonChange,
          },
          specialService,
          steps:{
            current,
          },
          needPlazaSelected,
          month,
          poolData,
        },
      },
    }= this.props;

    const propsManageNeed = {
      data:{
        company: {
          companys,
          selectedCompany,
        },
        plaza: {
          plazas,
          needs,
          selectedPlaza,
        },
        month,
        specialService,
        needPlazaSelected,
        typeNeedSelected,
        reason,
        poolData,
      },
      foo:{
        handleSelectedPlaza: this.handleSelectedPlaza,
        handleChangeStatusSpecialService: this.handleChangeStatusSpecialService,
        handleChangeNeedSpecialService: this.handleChangeNeedSpecialService,
        handleChangeNeed: this.handleChangeNeed,
        requestCancelNewNeed: this.requestCancelNewNeed,
        // handleSaveNewNeed: this.handleSaveNewNeed,
        // handleSaveEditNeed: this.handleSaveEditNeed,
        validateRequiredFiles: this.validateRequiredFiles,
      },
    }

    const propsListNeedsMonth = {
      data:{
        needs,
        currentYear: Year,
        selectedYear,
        Week,
      },
      foo:{
        handleEditMesPlaza: this.handleEditMesPlaza,
      },
    }

    const propsFilterHeader = {
      data: {
        Year,
        Week,
        selectedYear,
        company:{
          companys,
          selectedCompany,
        },
      },
      foo: {
        handleSelectedCompany: this.handleSelectedCompany,
      },
    }

    const propsFilterTable = {
      data: {
        years,
        currentYear: Year,
        selectedCompany,
        selectedYear,
      },
      foo: {
        handleFilterList: this.handleFilterList,
        handleNewNeed: this.handleNewNeed,
      },
    }

    const propsReasonChange = {
      data:{
        modalReasonChange,
        needPlazaSelected,
      },
      foo:{
        handleCloseModalReasonChange: this.handleCloseModalReasonChange,
        handleAcceptReasonChange: this.handleAcceptReasonChange,
        handleChangeReasonChange: this.handleChangeReasonChange,
      },
    }

    switch (current) {
      case 0:
        return (
          <ListNeedsMonth
            propsListNeedsMonth={propsListNeedsMonth}
            propsFilterHeader={propsFilterHeader}
            propsFilterTable={propsFilterTable}
          />
        )
      case 1:
        return(
          <ManageNeed
            propsManageNeed={propsManageNeed}
            propsReasonChange={propsReasonChange}
          />
        );
      default:
        return <h1>Default</h1>;
    }
  }

  render() {
    const {
      classes,
      necesidadPorMes:{
        frontend: {
          ui: {
            modal,
          },
          steps: {
            current,
          },
          activeChanges,
        },
      },
    } = this.props;

    const component = this.getContentByStep(current);

    return (
      <div>
        <Helmet>
          <title>NecesidadPorMes</title>
          <meta name="description" content="Description of NecesidadPorMes" />
        </Helmet>
        <Spinner />
        <AlertDialog
          open={modal}
          typeAlert = "Report"
          typeOptions= "Select"
          title= "CONFIRMAR..."
          message= "¿Existen datos pendientes por guardar, Desea continuar?"
          handleCloseModal= {()=>{}}
          onClickAccept= { ()=> this.handleYesCancelNewNeed() }
          onClickCancel= { ()=> this.handleNotCancelNewNeed()}
        />
        <Appbar
          onClickRegresar={ current > 0 ?  ()=> this.handleGoBack() : null}
          texto="Necesidad por Mes"
          hayCambios={activeChanges}>
        </Appbar>
        <Paper className={classes.paperRoot} elevation={current ? 0 : 1}>
          <Grid container className={classes.container}>
            <Grid item xs={12}>
              {component}
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

NecesidadPorMes.propTypes = {
  enqueueSnackbar: PropTypes.func,
  actions: PropTypes.object,
  classes: PropTypes.object,
  necesidadPorMes: PropTypes.object,
  usuarioGlobal: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  necesidadPorMes: makeSelectNecesidadPorMes(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    enqueueSnackbar,
  }, dispatch);
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'necesidadPorMes', reducer });
const withSaga = injectSaga({ key: 'necesidadPorMes', saga, mode:DAEMON });
const withActions = Actions.bindReduxStore()
const withStyle = withStyles(styles)

export default compose(
  withNotifier,
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withStyle,
)(NecesidadPorMes);
