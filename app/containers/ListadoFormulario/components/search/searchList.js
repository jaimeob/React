import React from "react";
import T from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
// import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Tooltip from '@material-ui/core/Tooltip';
import ClearIcon from '@material-ui/icons/Clear';
import BlueGrey from '@material-ui/core/colors/blueGrey';

const styles = theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${BlueGrey[100]}`,
    margin: '5px, 5px, 5px, 3px',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});

function SearchList (props) {
  // Variables
  const { classes, searchActive, textSearch } = props;
  // Funciones
  const { onClickSearch, onChangeTextSearch } = props;

  const typeButtonSearch = searchActive ? <ClearIcon /> : <SearchIcon />;
  // const showTextSearch = searchActive ? 'visible' : 'hidden';

  return (
    <div className={classes.root} elevation={1}>
      <Tooltip title={ searchActive ? 'Limpiar' : 'Buscar'}>
        <IconButton
          className={classes.iconButton}
          aria-label="Search"
          onClick={() => onClickSearch()} 
        >
          {typeButtonSearch}
        </IconButton>
      </Tooltip>
      {searchActive ?
        <InputBase
          type='text'
          className={classes.input}
          placeholder="Buscar..."
          value={textSearch}
          maxLength='5'
          onChange={(event) => onChangeTextSearch(event.target.value)}
          autoFocus />
        : null}
    </div>
  );
}

SearchList.propTypes = {
  classes: T.object.isRequired,
  searchActive: T.bool,
  textSearch: T.string,
  onClickSearch: T.func,
  onChangeTextSearch: T.func,
};

export default withStyles(styles, { withTheme: true })(SearchList);