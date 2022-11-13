import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ReactReadMoreReadLess from "react-read-more-read-less";
import ReactAudioPlayer from "react-audio-player";
import "./ArtistsStoryCards.css";

const useStyles = makeStyles({
	root: {
		width: "100%",
		minHeight: "550px",
		backgroundColor: "#ddd5f1",
		margin: "0 5%",
	},
	title: {
		fontSize: 24,
		fontFamily: "EB Garamond",
		textShadow: "1px 1px 1px white",
		color: "#1c555c",
		fontWeight: "bold",
	},
	image: {
		width: "100%",
		height: "280px",
	},
	video: {
		width: "100%",
		height: "280px",
	},
	pos: {
		marginBottom: "0.75em",
		fontFamily: "EB Garamond",
		fontSize: 20,
	},
	text: {
		fontFamily: "EB Garamond",
		fontSize: 20,
		minHeight: "70px",
	},
	audio: {
		display: "flex",
		width: "100%",
		height: "280px",
	},
});

const ArtistsStoryCards = ({ approvedArtwork }) => {
	const classes = useStyles();
	return (
		<div className="container">
			<div className="cards-wrapper">
				{approvedArtwork.map((artwork, index) => {
					return (
						<Card key={artwork.id} className={classes.root}>
							<CardActionArea className="card-action">
								{artwork.content_type === "image" && (
									<CardMedia
										className={`${classes.image} card-img`}
										component="img"
										alt={artwork.title}
										height="240"
										image={`/api/media/${artwork.content_link}`}
										title={artwork.title}
									/>
								)}
								{artwork.content_type === "video" && (
									<video
										className={classes.video}
										width="100%"
										height="240"
										controls
									>
										<source
											src={`/api/media/${artwork.content_link}`}
											type="video/mp4"
										/>
									</video>
								)}
								{artwork.content_type === "audio" && (
									<div className="audio-player">
										<ReactAudioPlayer
											className={classes.audio}
											src={`/api/media/${artwork.content_link}`}
											controls
										/>
									</div>
								)}
								<CardContent>
									<Typography
										gutterBottom
										variant="h5"
										component="h2"
										className={classes.title}
									>
										{artwork.title}
									</Typography>
									<Typography
										className={classes.pos}
										variant="body2"
										component="p"
									>
                    Name: {artwork.artist_name}
										<br />
                    Country: {artwork.country}
										<br />
                    City: &nbsp;
										{artwork.city === "undefined"
											? "No city provided"
											: artwork.city}
									</Typography>
									<Typography className={classes.text} variant="body1">
										{artwork.content_type !== "text" && (
											<ReactReadMoreReadLess
												className="read-more-read-less"
												id={index}
												charLimit={120}
												readMoreText={"Read more ▼"}
												readLessText={"Read less ▲"}
											>
												{artwork.content_text}
											</ReactReadMoreReadLess>
										)}
										{artwork.content_type === "text" && (
											<ReactReadMoreReadLess
												className={`${classes.text} read-more-read-less`}
												id={index}
												charLimit={550}
												readMoreText={"Read more ▼"}
												readLessText={"Read less ▲"}
											>
												{artwork.content_text}
											</ReactReadMoreReadLess>
										)}
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					);
				})}
			</div>
		</div>
	);
};

export default ArtistsStoryCards;
