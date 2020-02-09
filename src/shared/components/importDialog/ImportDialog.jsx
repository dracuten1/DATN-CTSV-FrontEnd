/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import * as DRLHandler from 'handlers/DRLHandler';
import * as AdminHandler from 'handlers/AdminHandler';
import { logger } from 'core/services/Apploger';
import { valueOrEmpty } from 'core/ultis/stringUtil';
import { LinearProgress } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { withStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        margin: theme.spacing(1),
        width: 400
    },
    dropzoneInput: {
        border: "1px solid #0077c4",
        background: "#9cd8f6",
        borderRadius: "8px",
        minHeight: "100px",
        maxHeight: "100px",
        padding: "15px",
        whiteSpace: "pre",
        // width: 500,

    },
}));

const DropZone = withStyles(
    {
        uploadIconSize: {
            display: 'none',
        },
    })(DropzoneArea);

const AddDialog = props => {

    const classes = useStyles();
    const { open, handleClose, handleImport } = props;

    return (
        <div>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <div style={{ height: 10 }}>
                    <LinearProgress color="secondary" />
                </div>
                <DialogTitle id="form-dialog-title">
                    <b>Import</b>
                </DialogTitle>
                <DialogContent className={classes.container}>
                    <DropZone
                        dropzoneClass={classes.dropzoneInput}
                        dropzoneText="Drag and drop an file here or click."
                        filesLimit={1}
                        showPreviews
                        showPreviewsInDropzone={false}
                        showFileNamesInPreview
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" disabled>
                        Import
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
};

export default AddDialog;
