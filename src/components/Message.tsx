import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useStore } from "../store/store";

function Alert(props: JSX.IntrinsicAttributes & AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars() {
  const classes = useStyles();
  const { state, dispatch } = useStore();
  const { message } = state;

  const handleClose = () => {
    dispatch({ type: "updateMessage", message: null });
  };

  return (
    <div className={classes.root}>
      {message && (
        <Snackbar
          onClose={handleClose}
          open={true}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={message!.type} onClose={handleClose}>
            {message!.text}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}
