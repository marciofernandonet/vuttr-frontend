import React, { Component } from 'react';
import { withStyles, Backdrop, Fade, Modal, Typography, Button, TextField, Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import api from '../services/api';

const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 3, 3),
  },
  root: {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(1),
      width: 400
    }
  },
  buttonAdd:{
    position: 'absolute',
    right: 0,
    textTransform: 'capitalize'
  },
  buttonAT: {
    margin: theme.spacing(2, 0, 1),
    textTransform: 'capitalize'
  }
});

class AddModal extends Component{

  state = {
    title: '',
    link: '',
    description: '',
    tags: '',
    error: {},
    open: false
  };

  handleOpen = () => {
    this.setState({
      title: '',
      link: '',
      description: '',
      tags: '',
      error: {},
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleValidation = () => {
    let formIsValid = true;
    this.setState({ error: {} });

    const { title, link, description } = this.state;

    if(!title){
      formIsValid = false;
      this.setState(prevState => ({
        error: {...prevState.error, errorTitle: true, labelTitle: 'Campo obrigatório!'}
      }));
    }

    if(!link){
      formIsValid = false;
      this.setState(prevState => ({
        error: {...prevState.error, errorLink: true, labelLink: 'Campo obrigatório!'}
      })); 
    }

    if(!description){
      formIsValid = false;
      this.setState(prevState => ({
        error: {...prevState.error, errorDesc: true, labelDesc: 'Campo obrigatório!'}
      })); 
    }
 
    return formIsValid;
  }

  handleSubmit = async event => {
    event.preventDefault();

    if(this.handleValidation()){
      let { tags, title, link, description } = this.state;
      tags = tags.split(" ");
      const data = {
        tags,
        title,
        link,
        description
      }
      await api.post('/tools', data).then(resp => {
        if(resp.status === 201){
          this.handleClose();
          this.props.new({...data, _id: resp.data._id});
        }
      });
    }
  }

  render(){
    const { classes } = this.props;
    return (
      <div>
        <Button style={{ background: "#FFF" }} className={classes.buttonAdd} variant="outlined" onClick={this.handleOpen} size="small" startIcon={<AddIcon/>}>
          Add
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.open}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">+ Add new tool</h2>
              <form onSubmit={this.handleSubmit} className={classes.root} autoComplete="off">
                <Typography variant="subtitle1">Tool Name</Typography>
                <TextField
                  id="title"
                  error={this.state.error.errorTitle}
                  label={this.state.error.labelTitle}
                  variant="outlined"
                  size="small"
                  value={this.state.title}
                  onChange={event => this.setState({title: event.target.value})}
                />
                <Typography variant="subtitle1">Tool Link</Typography>
                <TextField
                  id="link"
                  error={this.state.error.errorLink}
                  label={this.state.error.labelLink}
                  variant="outlined"
                  size="small"
                  value={this.state.link}
                  onChange={event => this.setState({link: event.target.value})}
                />
                <Typography variant="subtitle1">Tool Description</Typography>
                <TextField
                  id="description"
                  error={this.state.error.errorDesc}
                  label={this.state.error.labelDesc}
                  multiline
                  rows="3"
                  variant="outlined"
                  value={this.state.description}
                  onChange={event => this.setState({description: event.target.value})}
                />
                <Typography variant="subtitle1">Tags</Typography>
                <TextField
                  id="tags"
                  variant="outlined"
                  size="small"
                  value={this.state.tags}
                  onChange={event => this.setState({tags: event.target.value})}
                />
                <Box align="right">
                  <Button type="submit" size="small" className={classes.buttonAT} variant="outlined">Add tool</Button>
                </Box>
              </form>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AddModal);