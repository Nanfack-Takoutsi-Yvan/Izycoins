import * as React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { Grid } from "@mui/material"
import images from "@images/index"

type DialogPropos = {
  isDialogOpen: boolean
  onCloseDialog: () => void
}

const LoginDialog: React.FC<DialogPropos> = ({
  isDialogOpen,
  onCloseDialog,
}) => {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={onCloseDialog}
      sx={{ minHeight: "50vh" }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          alignItems="center"
          sx={{
            background: "#41519a9e",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <img
            style={{ maxWidth: "200px" }}
            src={images.loginImage}
            alt="Login image"
          />
        </Grid>
        <Grid item xs={12} md={6} alignItems="center">
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onCloseDialog}>Cancel</Button>
            <Button onClick={onCloseDialog}>Login</Button>
          </DialogActions>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default LoginDialog
