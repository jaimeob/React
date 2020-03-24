import 'react-sortable-tree/style.css';
import React, { Component } from 'react';
import T from 'prop-types';
import SortableTree from 'react-sortable-tree';
import{ isEqual } from 'lodash';
import AlertDialogSlide from '../AlertDialogSlide';
// import SortableTree, {  addNodeUnderParent, removeNodeAtPath  } from 'react-sortable-tree';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData1: [],
      treeData2: [],
      shouldCopyOnOutsideDrop: false,
      searchString: '',
      searchFocusIndex: 0,
    };
  }

  componentDidMount(){
    const {
      positions,
      jerarquia,
      idJerarquia,
    } = this.props;

    this.setState({
      treeData1: idJerarquia > 0 ? [] : positions,
      treeData2: jerarquia,
    })
  }

  componentDidUpdate(prevProps) {
    const {
      positions,
    } = this.props;

    if (!isEqual(prevProps.positions, positions)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        treeData1: positions,
        treeData2: [],
      })
    }
  }

  render() {
    const externalNodeType = 'yourNodeType';
    const { shouldCopyOnOutsideDrop } = this.state;

    // const getNodeKey = ({ treeIndex }) => treeIndex;
    
    const canDrop = ({ nextPath, nextTreeIndex }) => {      
      // Validar para que el primer nodo no pueda tener nodos hermanos
      if(nextPath[0] >= 1 || nextTreeIndex === 0) {
        return false;
      }
    
      return true;
    };

    const customSearchMethod = ({ node, searchQuery }) =>
      searchQuery &&
      node.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;

    const styles = {
      container: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      column: {
        minHeight: 450,
        width: '50% ',
      },
      tree: {
        margin: '20px 10px',
        border: 'solid lightgrey 1px',
        borderRadius: 4,
        height: '100%',
      },
      preview: {
        padding: 20,
        border: '1px solid lightgrey',
        borderRadius: 4,
      },
    }

    return (
      <React.Fragment>
        {
        /*
        <input
          id="find-box"
          type="text"
          placeholder="Búsqueda..."
          style={{ fontSize: '1rem' }}
          value={this.state.searchString}
          onChange={event =>
            this.setState({ searchString: event.target.value })
          }
        />
        */}
        <div style={styles.container}>
          <div style={styles.column}>
            <SortableTree
              searchMethod={customSearchMethod}
              searchQuery={this.state.searchString}
              searchFocusOffset={this.state.searchFocusIndex}
              style={styles.tree}
              treeData={this.state.treeData1}
              onChange={treeData1 => {
                this.setState({ treeData1 }, () => {
                  this.props.setJerarquiaAction(this.state.treeData2);
                  this.props.setTotalPositionsAction(treeData1.length);
                });
              }}
              // isVirtualized={false}
              dndType={externalNodeType}
              shouldCopyOnOutsideDrop={shouldCopyOnOutsideDrop}
              canNodeHaveChildren={() => (false)}
              canDrag={this.props.permisos.normales.editar === 1 || this.props.permisos.normales.registrar === 1}
              scaffoldBlockPxWidth={60}
            />
          </div>
          <div style={styles.column}>
            <SortableTree
              style={styles.tree}
              treeData={this.state.treeData2}
              onChange={treeData2 => {
                this.setState({ treeData2 }, () => {
                  this.props.setJerarquiaAction(this.state.treeData2);
                  // this.props.setTotalPositionsAction(treeData2.length);
                });
              }}
              // isVirtualized={false}
              dndType={externalNodeType}
              shouldCopyOnOutsideDrop={shouldCopyOnOutsideDrop}
              canDrop={canDrop}
              canDrag={this.props.permisos.normales.editar === 1 || this.props.permisos.normales.registrar === 1}
              scaffoldBlockPxWidth={60}
            />
          </div>
        </div>
        <AlertDialogSlide 
          open={this.props.openModal} 
          onClickModal={this.props.setToggleModalAction}
          onClickDownload={this.props.onClickDownload}
        >
          <div style={styles.preview}>
            <div id="my-node">
              <SortableTree
                treeData={this.state.treeData2}
                onChange={() => {}}
                isVirtualized={false}
                dndType={externalNodeType}
                shouldCopyOnOutsideDrop={shouldCopyOnOutsideDrop}
                canDrag={false}
              />
            </div>
          </div>
        </AlertDialogSlide>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  positions: T.array,
  jerarquia: T.array,
  setJerarquiaAction: T.func,
  setTotalPositionsAction: T.func,
  idJerarquia: T.number,
  permisos: T.object,
  setToggleModalAction: T.func,
  onClickDownload: T.func,
  openModal: T.bool,
};

export default App;
