import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Reset = () => {
  const [isValid, setIsValid] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userId = window.location.search.slice(
    window.location.search.indexOf("id=") + 3,
    window.location.search.indexOf("&")
  );

  const classes = useStyles();
  let history = useHistory();

  useEffect(() => {
    fetch("/api/reset" + window.location.search).then((res) => {
      if (res.ok) {
        setIsValid(true);
      }
    });
  }, []);

  const handleReset = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      fetch(`/api/admin/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pass: newPassword }),
      }).then((res) => {
        if (res.status === 200) {
          alert(
            "Password reset successful. You can now log in with your new credentials"
          );
          history.push("/login");
        } else {
          alert("Could not reset password");
        }
      });
    } else {
      alert("Your passwords don't match");
    }
  };

  return (
    <>
      {!isValid && <div>Your token is not valid</div>}
      {isValid && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Request password reset
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="newPassword"
                label="New password"
                name="newPassword"
                type="password"
                autoFocus
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="confirmedPassword"
                label="Confirmed password"
                name="confirmedPassword"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="submit"
                id="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleReset}
              >
                Reset password
              </Button>
            </form>
          </div>
        </Container>
      )}
    </>
  );
};

export default Reset;
