import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ReactReadMoreReadLess from "react-read-more-read-less";

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "white",
    height: "auto",
  },
  title: {
    fontSize: 22,
    fontFamily: "EB Garamond",
    textShadow: "1px 1px 1px white",
    color: "#1c555c",
    fontWeight: "bold",
  },
  pos: {
    marginBottom: 3,
    fontFamily: "EB Garamond",
    fontSize: 18,
  },
});

const ArtPopup = ({
	id,
	title,
	content_type,
	artist_name,
	content_text,
	content_link,
	city,
	country,
}) => {
	const classes = useStyles();

	return (
    <Card key={id} className={classes.root}>
      <CardContent>
        {content_type === "image" && (
          <CardMedia
            className="card-img"
            component="img"
            alt={title}
            height="240"
            image={`/api/media/${content_link}`}
            title={title}
          />
        )}
        {content_type === "video" && (
          <video width="100%" height="240" controls>
            <source src={`/api/media/${content_link}`} type="video/mp4" />
          </video>
        )}
        {content_type === "audio" && (
          <audio controls style={{ display: "flex", width: "100%" }}>
            <source src={`/api/media/${content_link}`} />
          </audio>
        )}
        <Typography variant="h3" className={classes.title} gutterBottom>
          {title}
        </Typography>
        <Typography className={classes.pos} style={{ fontWeight: "700" }}>
          By {artist_name} from {city !== "undefined" && `${city},`} {country}
        </Typography>
        {(content_type === "text" || content_type === "image") && (
          <Typography variant="body1">
            <ReactReadMoreReadLess
              charLimit={250}
              readMoreText={"Read more ▼"}
              readLessText={"Read less ▲"}
            >
              {content_text}
            </ReactReadMoreReadLess>
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtPopup;
