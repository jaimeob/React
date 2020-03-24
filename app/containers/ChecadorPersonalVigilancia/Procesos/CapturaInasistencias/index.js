/**
 *
 * CapturaInasistencias
 *
 */

import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { DAEMON } from 'utils/constants';
import {
  withStyles,
  Grid,
} from '@material-ui/core';

import { enqueueSnackbar } from 'reducers/notifications/actions';
import Appbar from 'components/Appbar';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCapturaInasistencias from './store/selectors';
import reducer from './store/reducer';
import saga from './store/saga';
import Actions from './store/actions';
import Captura from './components/Captura';


const styles = () => ({})

/* eslint-disable react/prefer-stateless-function */
export class CapturaInasistencias extends React.Component {
  componentDidMount = () => {
    const {
      actions: {
        requestGetCompanysAction,
        requestGetPlazasAction,
      },
    } = this.props
    requestGetCompanysAction();
    requestGetPlazasAction();
  }

  getContentByStep = () => {
    const {
      usuarioGlobal: {
        IdEmpleado,
      },
      capturaInasistencias: {
        selectedStep,
        backend: {
          companys,
          plazas,
          weekData,
        },
        frontend: {
          companySelected,
          plazaSelected,
          absence,
          filesReady,
          dialogClean,
          required: {
            companysFill,
            plazasFill,
            absenceFill,
            filesFill,
          },
        },
      },
      actions: {
        handleChangeCompanyAction,
        requestGetWeekAction,
        handleChangeAbsenceAction,
        handlePrepareFilesAction,
        handleDeleteFileAction,
        handleClickSaveAction,
        handleCleanWindowsAction,
        handleClickDialogConfirmAction,
        handleSearchRequiredAction,
      },
      enqueueSnackbar: Snackbar,
    } = this.props

    const startParams = {
      IdEmpleado,
      companys,
      plazas,
      companySelected,
      plazaSelected,
      weekData,
      absence,
      filesReady,
      dialogClean,
      companysFill,
      plazasFill,
      absenceFill,
      filesFill,
    }

    const startActions = {
      handleChangeCompanyAction,
      requestGetWeekAction,
      handleChangeAbsenceAction,
      handlePrepareFilesAction,
      notification: Snackbar,
      handleDeleteFileAction,
      handleClickSaveAction,
      handleCleanWindowsAction,
      handleClickDialogConfirmAction,
      handleSearchRequiredAction,
    }

    switch (selectedStep) {
      case 0:
        return (
          <Captura
            params={startParams}
            actions={startActions}
          />
        )
      default:
        return null;
    }
  }

  render() {
    const {
      capturaInasistencias: {
        topbarTitle,
      },
    } = this.props

    const component = this.getContentByStep();

    return (
      <div>
        <Helmet>
          <title>CapturaInasistencias</title>
          <meta
            name="description"
            content="Description of CapturaInasistencias"
          />
        </Helmet>
        <Appbar
          texto={topbarTitle}
        />
        <Grid container style={{padding: 10}}>
          <Grid item sm={12}>
            {component}
          </Grid>
        </Grid>
      </div>
    );
  }
}

CapturaInasistencias.propTypes = {
  usuarioGlobal: T.shape({
    Activo: T.bool,
    IdDepartamento: T.number,
    IdEmpleado: T.number,
    IdPlaza: T.number,
    IdPuesto: T.number,
    Imagen: T.string,
    Nombre: T.string,
    UsuarioDominio: T.string,
    UsuarioId: T.number,
  }),
  capturaInasistencias: T.shape({
    topbarTitle: T.string,
    selectedStep: T.number,
    backend: T.shape({
      companys: T.array,
      plazas: T.array,
      weekData: T.object,
    }),
    frontend: T.shape({
      companySelected: T.number,
      plazaSelected: T.number,
      absence: T.string,
      filesReady: T.array,
      dialogClean: T.bool,
      required: T.shape({
        companysFill: T.bool,
        plazasFill: T.bool,
        absenceFill: T.bool,
        filesFill: T.bool,
      }),
    }),
  }),
  actions: T.shape({
    requestGetCompanysAction: T.func,
    handleChangeCompanyAction: T.func,
    requestGetPlazasAction: T.func,
    requestGetWeekAction: T.func,
    handleChangeAbsenceAction: T.func,
    handlePrepareFilesAction: T.func,
    handleDeleteFileAction: T.func,
    handleClickSaveAction: T.func,
    handleCleanWindowsAction: T.func,
    handleClickDialogConfirmAction: T.func,
    handleSearchRequiredAction: T.func,
  }),
  enqueueSnackbar: T.func,
};

const mapStateToProps = createStructuredSelector({
  capturaInasistencias: makeSelectCapturaInasistencias(),
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

const withReducer = injectReducer({ key: 'capturaInasistencias', reducer });
const withSaga = injectSaga({ key: 'capturaInasistencias', saga, mode:DAEMON });
const withActions = Actions.bindReduxStore();
const withStyle = withStyles(styles);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withActions,
  withStyle,
)(CapturaInasistencias);
