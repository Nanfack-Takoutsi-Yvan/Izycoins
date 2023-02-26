import { createTheme } from "@mui/material/styles"

const Theme = createTheme({
  palette: {
    primary: {
      main: "#41519a",
    },
    secondary: {
      main: "#f4d432",
    },
  },
  typography: {
    fontFamily: [
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      "-apple-system",
    ].join(","),
  },
})

export default Theme
