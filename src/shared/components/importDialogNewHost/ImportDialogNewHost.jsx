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
import * as ImportHandler from 'handlers/ImportNewHostHandler';
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

const ImportDialogNewHost = props => {
  const classes = useStyles();
  const { open, handleClose, importCase } = props;

  const createFile = tfile => {
    const reader = new FileReader();
    reader.onload = e => {
      setFile(e.target.result);
    };
    reader.readAsDataURL(tfile);
  };
  const [message, setMessage] = useState('');
  const [importDisable, setImportDisable] = useState(true);
  const [hiddenProgress, setHiddenProgress] = useState(true);
  const [file, setFile] = useState(undefined);

  const handleImport = async () => {
    try {
      setImportDisable(true);
      setHiddenProgress(false);
      const response = await ImportHandler.GetUploadURL(importCase);
      logger.info('ImportDialogNewHost:: response: ', response);

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

      let res;
      let res1;
      let statusResponse;
      switch (importCase) {
        case 'YT':
        case 'TN': //QLBH
          res = await ImportHandler.GetImportQLBHInfo({
            type: importCase,
            fileKey: response.key,
            method: 'GET'
          });
          logger.info('ImportDialogNewHost:: res: ', res);

          if (res === undefined || res.success === false) {
            setSnackBarValue(wrongSnackBar);
            handleClose();
            break;
          }

          setMessage(res.message + '-' + res.newKey);

          res1 = await ImportHandler.GetImportQLBHInfo({
            type: importCase,
            fileKey: res.newKey,
            method: 'POST'
          });
          logger.info('ImportDialogNewHost:: res1: ', res1);

          const timerIdQLBH = setInterval(async () => {
            statusResponse = await ImportHandler.GetImportStatus(
              res.newKey
            );
            logger.info('ImportDialogNewHost:: statusResponse: ', statusResponse);
            const { Item } = statusResponse;
            const { data } = Item;

            if (data.total === data.currentAmount) {
              setSnackBarValue(successSnackBar);
              handleClose();
              clearInterval(timerIdQLBH);
            }
          }, 3000);
          break;
          case 'SVKT': case 'MGHP': case 'TCXH': case 'HTDX': case 'DTTS':{
            res = await ImportHandler.GetImportCDCSInfo({
              type: importCase,
              fileKey: response.key,
              method: 'GET'
            });
            logger.info('ImportDialogNewHost:: res: ', res);
  
            if (res === undefined || res.success === false) {
              setSnackBarValue(wrongSnackBar);
              handleClose();
              break;
            }
  
            setMessage(res.message + '-' + res.newKey);
  
            res1 = await ImportHandler.GetImportCDCSInfo({
              type: importCase,
              fileKey: res.newKey,
              method: 'POST'
            });
            logger.info('ImportDialogNewHost:: res1: ', res1);
  
            const timerIdCDCS = setInterval(async () => {
              statusResponse = await ImportHandler.GetImportStatus(
                res.newKey
              );
              logger.info('ImportDialogNewHost:: statusResponse: ', statusResponse);
              const { Item } = statusResponse;
              const { data } = Item;
  
              if (data.total === data.currentAmount) {
                setSnackBarValue(successSnackBar);
                handleClose();
                clearInterval(timerIdCDCS);
              }
            }, 3000);
            break;
          }
          case 'KT': case 'KL':{
            res = await ImportHandler.GetImportKTKLInfo({
              type: importCase,
              fileKey: response.key,
              method: 'GET'
            });
            logger.info('ImportDialogNewHost:: res: ', res);
  
            if (res.success === false) {
              setSnackBarValue(wrongSnackBar);
              handleClose();
              break;
            }
  
            setMessage(res.message + '-' + res.newKey);
  
            res1 = await ImportHandler.GetImportKTKLInfo({
              type: importCase,
              fileKey: res.newKey,
              method: 'POST'
            });
            logger.info('ImportDialogNewHost:: res1: ', res1);
  
            const timerIdKTKL = setInterval(async () => {
              statusResponse = await ImportHandler.GetImportStatus(
                res.newKey
              );
              logger.info('ImportDialogNewHost:: statusResponse: ', statusResponse);
              const { Item } = statusResponse;
              const { data } = Item;
  
              if (data.total === data.currentAmount) {
                setSnackBarValue(successSnackBar);
                handleClose();
                clearInterval(timerIdKTKL);
              }
            }, 3000);
            break;
          }
        default:
          break;
      }
    } catch (error) {
      logger.info(error);
      setSnackBarValue(errorSnackBar);
      handleClose();
    }
  };

  const onFileChange = tfile => {
    logger.info('Import Dialog:: onFile Change:: file: ', tfile);
    if (tfile.length > 0) {
      setImportDisable(false);
      createFile(tfile[0]);
    } else {
      setImportDisable(true);
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
  const wrongSnackBar = {
    open: true,
    type: 'error',
    message: 'Import sai File!'
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
          <div>{message}</div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleImport}
            color="primary"
            disabled={importDisable}
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

export default ImportDialogNewHost;
