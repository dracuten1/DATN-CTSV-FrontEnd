const { createMuiTheme } = require("@material-ui/core");

const themeFilter = createMuiTheme({
    overrides: {
        MuiOutlinedInput: {
            root: {
                '&': {
                    width: 'min-content',
                }
            },
            input: {
                '&': {
                    padding: '9.5px 14px',
                    width: '135px'
                }
            }
        },
        MuiFormControl: {
            root: {
                '&': {
                    width: 'fit-content !important',
                    marginBottom: '0px !important',
                    minWidth: '0px !important'
                }
            }
        },
        MuiSelect: {
            selectMenu: {
                '&': {
                    paddingTop: '6.5px !important',
                    paddingBottom: '6.5px !important',
                    width: 'fit-content'
                }
            }
        },
        MuiButton: {
            root: {
                '&': {
                    padding: '4px 16px !important',
                    marginTop: '15px !important'
                }
            }
        },
        MuiInputLabel: {
            outlined: {
                '&': {
                    transform: 'translate(8px, 8px) scale(1)'
                }
            }
        }
    }
});

export default themeFilter;