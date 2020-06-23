const { createMuiTheme } = require("@material-ui/core");

const themeTable = createMuiTheme({
    overrides: {
        MuiTableRow: {
            root: {
                '&:nth-of-type(odd)': {
                    backgroundColor: 'white !important'
                },
                '&[level="0"]:nth-of-type(even)': {
                    backgroundColor: '#f7fbff !important'
                },
                '&[level="0"]:hover': {
                    backgroundColor: 'rgba(60, 163, 244, 0.3) !important'
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
                    backgroundColor: 'rgba(33, 150, 243, 0.5) !important',
                    color: "black !important",
                }
            }
        }
    }
});

export default themeTable;