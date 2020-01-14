import React, { Component } from 'react';
import api from './services/api';
import { withStyles } from '@material-ui/core/styles';
import { 
  CssBaseline, 
  Typography, 
  Container, 
  Box,
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

import Item from './components/Item';
import AddModal from './components/AddModal';
import RemoveModal from './components/RemoveModal';

const styles = theme => ({
  main: {
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(3)
  },
  elements: {
    display: 'flex',
    height: 33
  },
  search: {
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 14
  }
});

class App extends Component {

  state = {
    vuttrs: [],
    openRemove: false,
    idRemove: null,
    check: false,
    filter: []
  };

  componentDidMount = async () => {
    await api.get('tools').then(resp => {
      if(resp.status === 200)
        this.setState({ vuttrs: resp.data, filter: resp.data });
    });
  };

  newItem = data => {
    this.setState({
      vuttrs: [...this.state.vuttrs, data],
      filter: [...this.state.vuttrs, data]
    });
  };

  openRemoveModal = id => {
    this.setState({ 
      openRemove: true,
      idRemove: id
    });
  };

  removeItem = async () => {
    const id = this.state.idRemove;
    await api.delete(`tools/${id}`).then(resp => {
      if(resp.status === 204){
        const vuttrs = [...this.state.vuttrs];
        const index = vuttrs.findIndex(i => i._id === id);
        if(index !== -1){
          vuttrs.splice(index, 1);
          this.setState({ vuttrs, filter: vuttrs, openRemove: false });
        }
      }
    });
  };

  handleSearchChange = event => {
    const { value } = event.target;
    const lowercasedFilter = value.toLowerCase();
    this.setState(prevState => {
      const filter = prevState.vuttrs.filter(result =>{
        result = Object.values(result);
        result.splice(1,1);
        result.pop();
        const item = this.state.check ? result.splice(0,1) : result;
        return Object.keys(item).some(key => 
          String(item[key]).toLowerCase().includes(lowercasedFilter) 
        );
      });
      return { filter };
    });
  };

  render(){
    const { classes } = this.props;
    const { filter } = this.state;
    
    return (
      <div>
        <CssBaseline />
        <Container component="main" className={classes.main} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            VUTTR
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Very Useful Tools to Remember
          </Typography>
          <Box className={classes.elements} position="relative" mb={2}>
            <TextField
              style={{ background: "#FFF" }}
              onChange={this.handleSearchChange}
              variant="outlined"
              size="small"
              InputProps={{
                classes: { input: classes.search },
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              style={{ paddingLeft: 20 }}
              control={
                <Checkbox  
                  checked={this.state.check}
                  onChange={() => this.setState({ check: !this.state.check })}
                  color="default"
                  style={{ width: 28, height: 28 }}
                  icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 20 }} />}
                  checkedIcon={<CheckBoxIcon style={{ fontSize: 20 }} />}
                />
              }
              label={<Typography variant="caption">Search in tags only</Typography>}
            />
            <AddModal new={this.newItem.bind(this)} />
          </Box>
          {filter.map((result, index) => (    
            <Item vuttr={result} key={index} removeModal={this.openRemoveModal.bind(this)} />
          ))}
        </Container>
        <RemoveModal openRM={this.state.openRemove} close={() => { this.setState({ openRemove: false }) }} remove={this.removeItem.bind(this)} />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);