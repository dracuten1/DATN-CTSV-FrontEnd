const { createMuiTheme } = require('@material-ui/core');

const themeTable = createMuiTheme({
  palette: {
    secondary: {
      main: '#4caf50'
    }
  },
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
        }
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
          color: 'black !important'
        }
      }
    },
    MuiInputBase: {
      root: {
        '&': {
          margin: '5px 0px !important'
        }
      }
    },
    MuiPaper: {
      root: {
        '&': {
          width: '100% !important'
        }
      },
      rounded: {
        '&': {
          width: 'auto !important'
        }
      }
    },
    MuiCheckbox: {
      colorSecondary: {
        '&$checked': {
          color: '#2979ff !important'
        }
      }
    },
    MuiIconButton: {
      colorSecondary: {
        '&:hover': {
          backgroundColor: '#2979ff0a !important'
        }
      }
    }
  }
});

export default themeTable;
