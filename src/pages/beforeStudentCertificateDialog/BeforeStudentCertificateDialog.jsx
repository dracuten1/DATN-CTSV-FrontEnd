/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextFieldWithLabel from 'shared/components/textFieldWithLabel/TextFieldWithLabel';
import { Divider } from '@material-ui/core';
import Filter from 'shared/components/filter/Filter';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
    groupContent: {
        display: 'flex',
        flexDirection: 'row',
    },
    divider: {
        width: '95%',
        alignSelf: 'center'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function CustomizedDialogs() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" className={classes.button} onClick={handleClickOpen}>
                Thêm
      </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Xác nhận trước khi thêm
                </DialogTitle>
                <Divider className={classes.divider} />
                <DialogContent className={classes.groupContent}>
                    <TextFieldWithLabel label='MSSV' />
                    <TextFieldWithLabel label='Họ và tên' />
                </DialogContent>
                <Divider className={classes.divider} />
                <DialogContent >
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <span >Tỉnh huyện</span>
                        <Filter data={['HCM', 'Ha Noi']} />
                        <Filter data={['Thi xa Dien Ban', 'Cam Ranh', 'Nha Trang']} />
                        <Filter data={['Linh Van', 'Cam Linh']} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <span >Số nhà</span>
                        <TextFieldWithLabel />
                    </div>
                </DialogContent>
                <Divider className={classes.divider} />
                <DialogContent >
                    <div>
                        <Filter label='Ngôn ngữ' data={['Tiếng Việt', 'Tiếng Anh']} />
                        <Filter label='Loại xác nhận' data={['Chờ Xét HTCT', 'Bảo lưu']} />
                        <Filter label='Tình trạng' data={['Đang học']} />
                        <Filter label='Lý do ' data={['Xin việc làm', 'Thực tập']} />
                    </div>
                    <div>
                        test
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Hủy
          </Button>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Thêm
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}