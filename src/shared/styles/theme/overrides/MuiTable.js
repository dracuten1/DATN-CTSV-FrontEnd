const { createMuiTheme } = require("@material-ui/core");

const themeTable = createMuiTheme({
    overrides: {
        MuiTableRow: {
            root: {
                '&:nth-of-type(odd)': {
                    backgroundColor: 'white !important'
                },
                '&[level="0"]:hover': {
                    backgroundColor: 'rgba(33, 150, 243, 0.5) !important'
                },
            },
            footer: {
                '&:hover': {
                    backgroundColor: 'white !important'
                }
            }
        },
        MuiTableCell: {
            head: {
                '&': {
                    backgroundColor: '#3274b6 !important'
                }
            }
        }
    }
});

export default themeTable;