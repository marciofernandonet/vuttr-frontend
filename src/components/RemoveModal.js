import React, { Component } from 'react';
import { withStyles, Modal, Backdrop, Fade, Button, Box } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Clear';

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
    width: 400
  },
  buttonCanc: {
    marginRight: 15
  },
  teste: {
    paddingTop: 8
  }
});

class RemoveModal extends Component{

  handleClose = () => {
    this.props.close();
  };

  handleRemove = () => {
    this.props.remove();
  };

  render(){
    const { classes, openRM } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openRM}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openRM}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title"><RemoveIcon className={classes.teste} />Remove tool</h2>
              <p id="transition-modal-description">Are your sure you want to remove hotel?</p>
              <Box align="right" >
                <Button className={classes.buttonCanc} onClick={this.handleClose} variant="outlined" size="small">Cancel</Button>
                <Button onClick={this.handleRemove} variant="outlined" size="small">Yes, remove</Button>
              </Box>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RemoveModal);