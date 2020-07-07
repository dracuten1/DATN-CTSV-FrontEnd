const { createMuiTheme } = require("@material-ui/core");

const themeFilter = createMuiTheme({
    overrides: {
        MuiOutlinedInput: {
            input: {
                '&': {
                    padding: '9.5px 14px',
                    width: '135px'
                }
            }
        },
        MuiInputLabel: {
            outlined: {
                '&': {
                    transform: 'translate(14px, 12px) scale(1)'
                }
            }
        }
    }
});

export default themeFilter;