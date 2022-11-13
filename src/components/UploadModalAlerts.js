import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
	},
}));

const UploadModalAlerts = ({ error, setError, success, setSuccess, uploadingMessage, setUploadingMessage }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Alert
				className={error ? "error-alert" : "d-none"}
				severity="error"
				onClose={() => setError(false)}
			>
				<AlertTitle>Error</AlertTitle>
        Failed to submit! — <strong>Please fill in the empty field/s and make sure the disclaimer box is checked!</strong>
			</Alert>
			<Alert
				className={success ? "success-alert" : "d-none"}
				onClose={() => setSuccess(false)}
				severity="success"
			>
				<AlertTitle>Success</AlertTitle>
				<strong>
          Your story is successfully uploaded, waiting to be verified!
				</strong>
			</Alert>
			<Alert
				className={uploadingMessage ? "uploading-alert" : "d-none"}
				onClose={() => setUploadingMessage(false)}
			>
				<AlertTitle>Uploading</AlertTitle>
				<strong>Uploading your file...</strong>
			</Alert>
		</div>
	);
};

export default UploadModalAlerts;