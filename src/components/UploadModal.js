import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import MapForm from "./MapForm";
import { useHistory } from "react-router-dom";
import UploadModalAlerts from "./UploadModalAlerts";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(() => ({
	appBar: {
		position: "relative",
		backgroundColor: "#7d69af",
		fontFamily: "EB Garamond",
	},
	title: {
		display: "flex",
		justifyContent: "space-between",
		width: "100%",
		margin: "auto",
		justifyContent: "center",
		alignItems: "center",
		fontFamily: "EB Garamond",
	},
	disclaimer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		width: "100%",
		margin: "auto",
		justifyContent: "center",
		alignItems: "center",
		fontFamily: "EB Garamond",
		textAlign: "justify",
	  textJustify: "inter-word"
	},
	icon: {
		marginRight: '-1em'
	},
	form: {
		display: "grid",
		width: "50%",
		margin: "auto",
		fontFamily: "EB Garamond",
		backgroundColor: "#ddd5f1",
	},
	input: {
		'&::placeholder': {
			fontFamily: "EB Garamond",
			fontSize: "1.2em"
		},
	},
	media: {
		borderRadius: "0.25em",
		margin: "auto",
		border: "1px solid #999",
		fontFamily: "EB Garamond",
		fontSize: "1.8rem",
		width: "100%",
	},
	file_input_wrapper: {
		width: "100%",
		margin: "auto",
	},
	story: {
		margin: "2em auto 0 auto"
	}
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const UploadModal = () => {
	const classes = useStyles();
	const history = useHistory();
	const [file, setFile] = useState("");
	const [open, setOpen] = useState(false);
	const [errorAlert, setErrorAlert] = useState(false);
	const [successAlert, setSuccessAlert] = useState(false);
	const [coordUploadForm, setCoordUploadForm] = useState({
		lat: "",
	});
	const [uploadingMessage, setUploadingMessage] = useState(false);

	const initialFormValues = {
		title: "",
		artist_name: "",
		content_type: "",
		story: "",
	};
	const [uploadForm, setUploadForm] = useState(initialFormValues);
	const [signed, setSigned] = useState({
		agreement: false,
	});

	const handleAgreement = (e) => {
		setSigned({ [e.target.name]: e.target.checked });
	};

	const validateForm = () =>{
		if (uploadForm.content_type === "") {
			return false;
		}
		if((uploadForm.content_type === "text"
			|| uploadForm.content_type === "image")
			&& Object.values(uploadForm).some((key) => key === "")) {
			return false;
		}
		if(uploadForm.content_type !== "text" && file === ""){
			return false;
		}
		if (
			(uploadForm.content_type === "audio"
        || uploadForm.content_type === "video")
      && (uploadForm.artist_name === ""
        || uploadForm.title === "")
		) {
			return false;
		}
		if(coordUploadForm.lat === ""){
			return false;
		}
		return true;
	};

	const handleMediaUpload = (e) =>{
		setFile(e.target.files[0]);
	};
	const handleChange = (e) => {
		setUploadForm({ ...uploadForm, [e.target.name]: e.target.value });
	};

	const handleTypeChange = (e) => {
		setUploadForm({ ...uploadForm, content_type: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const validate = validateForm();
		if (validate && signed.agreement) {
			const formData = new FormData();
			formData.append("image", file);
			console.log(file);
			for (let value of formData.values()) {
			}
			for(let key in uploadForm){
				formData.append(key, uploadForm[key]);
			}
			for (let key in coordUploadForm) {
				formData.append(key, coordUploadForm[key]);
			}
			for (let value of formData.values()) {
				console.log(value);
			}
			setUploadingMessage(true);
			fetch("/api/upload", {
				method: "POST",
				body: formData,
			}).then(() => {
				setUploadingMessage(false);
				setSuccessAlert(true);
				setUploadForm(initialFormValues);
				setFile("");
				setCoordUploadForm({ lat: "" });
				setTimeout(function () {
					setOpen(false);
					setSuccessAlert(false);
				}, 3000);
			});
			history.push("/");
		} else {
			setErrorAlert(true);
			setTimeout(function () {
				setErrorAlert(false);
			}, 3000);
		}
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button
				className="upload-btn"
				id="upload-button"
				style={{
					backgroundColor: "#1c555c",
					backgroundColor: '#563c96',
					backgroundColor: '#4f3e7f',
					color: "white",
					fontWeight: '900',
					fontWeight: "normal",
					border: "3px solid #a8546c",
					borderRadius: "7px",
					fontFamily: "EB Garamond",
					padding: "0.5em 1.75em",
					whiteSpace: "nowrap"
				}}
				variant="outlined"
				color="primary"
				onClick={handleClickOpen}
			>
        ADD STORY
			</Button>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<Typography variant="h5" className={classes.title}>
              Please read the Disclaimer, check the box and fill out the form below
						</Typography>
						<IconButton
						  className={classes.icon}
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<List className={`${classes.form} upload-modal`}>
					<ListItem className={classes.disclaimer}>
						<Typography variant="h4" className={classes.disclaimer}>
							Disclaimer
						</Typography>
						<Typography variant="h6" className={classes.disclaimer}>
							We welcome your contribution to this site. Your safety and wellbeing are our priorities.  Personal data and information you upload to this site will be processed according to UK data protection law. It will also be in the public domain for everyone to see. Please therefore do not upload your full postcode or other information which may precisely identify your location. Do not use your full name and limit other identifying information where possible. We moderate content uploaded to the site. We may edit information published at our absolute discretion.
						</Typography>
						<Typography>
							<FormControlLabel
								control={
									<Checkbox
										checked={signed.agreement}
										onChange={handleAgreement}
										name="agreement"
										color="primary"
									/>
								}
								label="Agreed"
							/>
						</Typography>
					</ListItem>
					<ListItem>
						<TextField
							InputProps={{
								classes: { input: classes.input }
							}}
							autoFocus
							margin="dense"
							placeholder="Title of your Artwork"
							type="text"
							name="title"
							fullWidth
							variant="outlined"
							value={uploadForm.title}
							onChange={handleChange}
						/>
					</ListItem>
					<ListItem>
						<TextField
							InputProps={{
								classes: { input: classes.input }
							}}
							margin="dense"
							placeholder="Your first name or nickname"
							type="text"
							name="artist_name"
							fullWidth
							variant="outlined"
							value={uploadForm.artist_name}
							onChange={handleChange}
						/>
					</ListItem>
					<ListItem>
						<Typography variant="h5" className={classes.title}>
							Please enter the name of your country or city and locate it on the
							map
						</Typography>
					</ListItem>
					<ListItem>
						<MapForm setCoordUploadForm={setCoordUploadForm} />
					</ListItem>
					<ListItem>
						<Typography variant="h5" className={classes.title}>
							Please choose the media type you would like to upload
						</Typography>
					</ListItem>
					<ListItem>
						<div className="center">
							<div className="radio-container">
								<input
									className="radio-input"
									id={"upload_video"}
									type="radio"
									name="media-type"
									value="video"
									onClick={handleTypeChange}
								/>
								<label className="radio-label" htmlFor={"upload_video"}>
                  Video
								</label>
								<input
									className="radio-input"
									id={"upload_audio"}
									type="radio"
									name="media-type"
									value="audio"
									onClick={handleTypeChange}
								/>
								<label className="radio-label" htmlFor={"upload_audio"}>
                  Audio
								</label>
								<input
									className="radio-input"
									id={"upload_image"}
									type="radio"
									name="media-type"
									value="image"
									onClick={handleTypeChange}
								/>
								<label className="radio-label" htmlFor={"upload_image"}>
                  Image
								</label>
								<input
									className="radio-input"
									id={"upload_text"}
									type="radio"
									name="media-type"
									value="text"
									onClick={handleTypeChange}
								/>
								<label className="radio-label" htmlFor={"upload_text"}>
                  Text
								</label>
							</div>
						</div>
					</ListItem>
					<ListItem>
						<UploadModalAlerts
							className={classes.alert}
							uploadingMessage={uploadingMessage}
							setUploadingMessage={setUploadingMessage}
						/>
					</ListItem>
					{uploadForm.content_type !== "text"
            && uploadForm.content_type !== "" && (
						<ListItem>
							<div className={classes.file_input_wrapper}>
								<input
									className={`${classes.media} media-input`}
									type="file"
									name="media"
									onChange={handleMediaUpload}
								/>
							</div>
						</ListItem>
					)}
					<ListItem className={classes.story}>
						<TextField
							InputProps={{
								classes: { input: classes.input }
							}}
							placeholder="Please type your story here"
							multiline
							variant="outlined"
							type="text"
							name="story"
							fullWidth
							value={uploadForm.story}
							onChange={handleChange}
						/>
					</ListItem>
					<ListItem>
						<UploadModalAlerts
							className={classes.alert}
							error={errorAlert}
							setError={setErrorAlert}
							success={successAlert}
							setSuccess={setSuccessAlert}
						/>
					</ListItem>
					<ListItem
						style={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Button
							style={{
								margin: "2em",
								fontFamily: "EB Garamond",
							}}
							type="cancel"
							color="secondary"
							variant="contained"
							onClick={handleClose}
						>
              Cancel
						</Button>
						<Button
							style={{
								margin: "2em",
								fontFamily: "EB Garamond",
							}}
							type="submit"
							color="primary"
							variant="contained"
							onClick={handleSubmit}
						>
              Submit
						</Button>
					</ListItem>
					<ListItem>
						<p>
							{" "}
              If you require additional information or help, feel free to visit
							<a href="https://refaid.com/" target="_blank" rel="noreferrer">
								{" "}
                Refaid.com!
							</a>
						</p>
					</ListItem>
				</List>
			</Dialog>
		</div>
	);
};

export default UploadModal;