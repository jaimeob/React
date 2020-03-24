/* eslint-disable react/jsx-no-undef */
import React from 'react';
import PropTypes from 'prop-types';
// import Autosuggest from 'react-autosuggest';
// import match from 'autosuggest-highlight/match';
// import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';


function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  // eslint-disable-next-line no-undef
  const matches = match(suggestion.Nombre, query);
  // eslint-disable-next-line no-undef
  const parts = parse(suggestion.Nombre, matches);

  return (
    <MenuItem 
      selected={isHighlighted} 
      component="div"
      style={{marginTop:16}}
    >
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          ),
        )}
      </div>
    </MenuItem>
  );
}


function getSuggestionValue(suggestion) {
  return suggestion.Nombre;
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 16,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class BuscadorAutocompleat extends React.Component {
  componentDidMount(){
  }

  state = {
    single: '',
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };

  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      // suggestions: this.state.suggestions,
      suggestions: this.props.articulos,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          
          inputProps={{
            classes,
            placeholder: 'Buscar artículo',
            value: this.state.single,
            onChange: this.handleChange('single'),
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              <label onClick={() => this.props.agregarRegistro(options.children.props)} onKeyPress={() => this.props.agregarRegistro(options.children)}>{options.children}</label>
            </Paper>
          )}
        />
      </div>
    );
  }
}

BuscadorAutocompleat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BuscadorAutocompleat);