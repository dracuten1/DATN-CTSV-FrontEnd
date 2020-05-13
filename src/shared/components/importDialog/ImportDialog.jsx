/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import * as ImportHandler from 'handlers/ImportHandler';
import { logger } from 'core/services/Apploger';
import { valueOrEmpty } from 'core/ultis/stringUtil';
import { LinearProgress } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { withStyles } from '@material-ui/styles';
import Axios from 'axios';
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

const convertTTSVCase = ttsvCase => {
  switch (ttsvCase) {
      case 'SINH VIÊN NƯỚC NGOÀI':
        return 'NN';
      case 'ĐIỂM TRUNG BÌNH':
        return 'DTB';
      case 'TỐT NGHIỆP':
        return 'TotNghiep';
      case 'HOÀN TẤT CHƯƠNG TRÌNH':
        return 'HTCT';
      case 'ĐANG HỌC':
        return 'DangHoc';
      case 'CẢNH CÁO HỌC VỤ':
        return 'CanhCaoHV';
      case 'BUỘC THÔI HỌC':
        return 'BuocThoiHoc';
      case 'BẢO LƯU':
        return 'BaoLuu';
      case 'ĐĂNG KÝ HỌC PHẦN':
        return 'DKHP';
      default:
        return '';
  }
};

const DropZone = withStyles({
  uploadIconSize: {
    display: 'none'
  }
})(DropzoneArea);

const ImportDialog = props => {
  const classes = useStyles();
  const { open, handleClose, importCase } = props;

  const convertImportCase = ipCase => {
    switch (ipCase) {
      case 1:
        return 'import-drl';
      case 2:
        return 'import-luu-tru-ktx';
      case 3:
        return 'import-luu-tru-all';
      case 4:
        const { ttsvCase } = props;
        return convertTTSVCase(ttsvCase);
      default:
        return '';
    }
  };

  const Case = convertImportCase(importCase);

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
      const response = await ImportHandler.GetUploadURL(Case);
      logger.info('ImportDialog:: response: ', response);

      const binary = atob(file.split(',')[1]);
      const array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      const blobData = new Blob([new Uint8Array(array)], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const result = await fetch(response.uploadURL, {
        method: 'PUT',
        body: blobData
      });

      let res; let res1; let statusResponse;
      switch (importCase) {
        case 1: //DRL
          res = await ImportHandler.GetImportDRLInfo(response.key);
          logger.info('ImportDialog:: res: ', res);

          setMessage(res.message + '-' + res.nh + '-' + res.hk);

          res1 = await ImportHandler.ImportDRLInfo({
            key: res.jsonKey,
            importType: 2,
            startStudentID: res.startStudentID,
            endStudentID: res.endStudentID,
            nh: res.nh,
            hk: res.hk
          });
          logger.info('ImportDialog:: res1: ', res1);

          const timerIdDRL = setInterval(async () => { 
            statusResponse = await ImportHandler.GetImportStatus();
            logger.info('ImportDialog:: statusResponse: ', statusResponse);
            const { log } = statusResponse;
            
            if (log.message === "thành công"){
              setSnackBarValue(successSnackBar);
              handleClose();              
              clearInterval(timerIdDRL);
            } 
          }, 3000);
          break;
        case 2: case 3: //Luu tru KTX
          res = await ImportHandler.GetImportQLLTInfo(importCase, response.key);
          logger.info('ImportDialog:: res: ', res);

          setMessage(res.message + '-' + res.newKey);

          res1 = await ImportHandler.ImportQLLTInfo(importCase, {
            checkImportResult: res.checkImportResult,
            jsonkey          : res.newKey,
            // type             : res.checkImportResult.conflict ? "Conflict" : "NotInConflict"
          });
          logger.info('ImportDialog:: res1: ', res1);
          
          const timerIdQLLT = setInterval(async () => { 
            statusResponse = await ImportHandler.GetImportStatusQLLT(res.newKey);
            logger.info('ImportDialog:: statusResponse: ', statusResponse);
            const { Item } = statusResponse;
            const { data } = Item;
            
            if (data.total === data.currentAmount){
              setSnackBarValue(successSnackBar);
              handleClose();              
              clearInterval(timerIdQLLT);
            } 
          }, 3000);
          break;
        case 4: //TTSV
          const { ttsvCase } = props;
          res = await ImportHandler.GetImportTTSVInfo(Case, response.key);
          logger.info('ImportDialog:: res: ', res);

          setMessage(res.message + '-' + res.newKey);

          res1 = await ImportHandler.ImportTTSVInfo(Case, {
            checkImportResult: res.checkImportResult,
            importedStructure: res.importedStructure,
            jsonkey          : res.newKey,
            type             : Case
          });
          logger.info('ImportDialog:: res1: ', res1);
          
          const timerIdTTSV = setInterval(async () => { 
            statusResponse = await ImportHandler.GetImportStatusTTSV(res.newKey);
            logger.info('ImportDialog:: statusResponse: ', statusResponse);
            const { Item } = statusResponse;
            const { data } = Item;
            
            if (data.total === data.currentAmount){
              setSnackBarValue(successSnackBar);
              handleClose();              
              clearInterval(timerIdTTSV);
            } 
          }, 3000);
          break;  
        default:
          break;
      }
    
      // setSnackBarValue(successSnackBar);
      // handleClose();
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

export default ImportDialog;
