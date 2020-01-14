import React, { Component } from 'react';
import { withStyles, Paper , Typography, Button } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Clear';

const styles = theme => ({
    root: {
        padding: theme.spacing(2),
        marginBottom: 15
    },
    title: {
      fontSize: 16
    },
    desc: {
      fontSize: 13,
    },
    tags: {
        fontSize: 13,
        fontWeight: 600
    },
    closeImg: {
        float:'right', 
        marginTop: -6,
        marginRight: -6,
        textTransform: 'lowercase'
    }
});

class Item extends Component {
    
    handleClick = id => () => {
        this.props.removeModal(id);
    }

    render(){
        const { classes, vuttr } = this.props;
        return (
            <Paper className={classes.root}>
                <Button onClick={this.handleClick(vuttr._id)} size="small" className={classes.closeImg} startIcon={<RemoveIcon />}>
                    remove
                </Button>
                <Typography color="primary" className={classes.title}>
                    { vuttr.title } 
                </Typography>
                <Typography className={classes.desc} >
                    { vuttr.description }
                </Typography>
                <Typography className={classes.tags}>
                    { vuttr.tags.map(result => `#${result} `) }
                </Typography>
            </Paper>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Item);