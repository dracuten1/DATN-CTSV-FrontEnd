/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as ImportHandler from 'handlers/SHCDHandler';
import { logger } from 'core/services/Apploger';
import { LinearProgress } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import CustomizedSnackbars from '../snackBar/SnackBar';

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
    border: '1px solid #0077c4',
    background: '#9cd8f6',
    borderRadius: '8px',
    minHeight: '100px',
    maxHeight: '100px',
    padding: '15px',
    whiteSpace: 'pre'
    // width: 500,
  }
}));

const DropZone = withStyles({
  uploadIconSize: {
    display: 'none'
  }
})(DropzoneArea);

const ImportDialogSHCD = props => {
  const classes = useStyles();
  const { open, handleClose, NamHoc, HocKy, handleAdd } = props;

  const createFile = tfile => {
    const reader = new FileReader();
    reader.onload = e => {
      setFile(e.target.result);
    };
    reader.readAsDataURL(tfile);
  };
  // const [message, setMessage] = useState('');
  const [filter, setFilter] = useState({
    fileName: '',
    importDisable: true
  });

  const [hiddenProgress, setHiddenProgress] = useState(true);
  const [file, setFile] = useState(undefined);

  const handleImport = async () => {
    try {
      setFilter({
        ...filter,
        importDisable: true
      });
      setHiddenProgress(false);
      const response = await ImportHandler.GetUploadURL(filter.fileName, NamHoc, HocKy);
      logger.info('ImportDialogSHCD:: response: ', response);

      if (response.message !== "ok"){
        setSnackBarValue(errorSnackBar);
        handleClose();
        return;
      }

      const binary = atob(file.split(',')[1]);
      const array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      const blobData = new Blob([new Uint8Array(array)], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      await fetch(response.uploadURL, {
        method: 'PUT',
        body: blobData
      });
      
      handleAdd();
      setSnackBarValue(successSnackBar);
    } catch (error) {
      logger.info(error);
      setSnackBarValue(errorSnackBar);
    }
    handleClose();
  };

  const onFileChange = tfile => {
    logger.info('Import Dialog:: onFile Change:: file: ', tfile);
    if (tfile.length > 0) {
      setFilter({
        ...filter,
        fileName: tfile[0].name,
        importDisable: false
      });
      createFile(tfile[0]);
    } else {
      setFilter({
        ...filter,
        fileName: '',
        importDisable: true
      });
    }
  };

  const successSnackBar = {
    open: true,
    type: 'success',
    message: 'Import thành công!'
  };
  const errorSnackBar = {
    open: true,
    type: 'error',
    message: 'Đã xảy ra lỗi, vui lòng kiểm tra lại!'
  };
  const hiddenSnackBar = { open: false };
  const [snackBarValue, setSnackBarValue] = React.useState(hiddenSnackBar);
  const handleSnackBarClose = current => event => {
    setSnackBarValue({ ...current, ...hiddenSnackBar });
  };

  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <div style={{ height: 10 }}>
          <LinearProgress color="secondary" hidden={hiddenProgress} />
        </div>
        <DialogTitle id="form-dialog-title">
          <b>Import</b>
        </DialogTitle>
        <DialogContent className={classes.container}>
          <DropZone
            dropzoneClass={classes.dropzoneInput}
            dropzoneText="Drag and drop an file here or click."
            acceptedFiles={[
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ]}
            filesLimit={1}
            showPreviews
            showPreviewsInDropzone={false}
            showFileNamesInPreview
            onChange={onFileChange}
          />
          {/* <div>{message}</div> */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleImport}
            color="primary"
            disabled={filter.importDisable}
          >
            Import
          </Button>
          <Button onClick={handleClose} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
      <CustomizedSnackbars
        value={snackBarValue}
        handleClose={handleSnackBarClose}
      />
    </div>
  );
};

export default ImportDialogSHCD;
