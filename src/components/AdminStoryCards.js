import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { Button } from "@material-ui/core";
import "./ArtistsStoryCards.css";

const useStyles = makeStyles({
  root: {
    width: "100%",
    minHeight: "610px",
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
    fontFamily: "Garamond",
    fontSize: 20,
    minHeight: "70px",
  },
  audio: {
    display: "flex",
    width: "100%",
    height: "280px",
  },
});

const AdminStoryCards = ({ user, approveMode}) => {
  const classes = useStyles();

  const [submittedArtwork, setSubmittedArtwork] = useState([]);
  const [filteredArtwork, setFilteredArtwork] = useState([]);
  const [search, setSearch] = useState(" ");

  const applySearch = (data) => {
    const filteredData = data.filter(
      (artwork) =>
        (artwork.title && artwork.title.toLowerCase().includes(search)) ||
        (artwork.artist_name &&
          artwork.artist_name.toLowerCase().includes(search))
    );
    return filteredData;
  };

  useEffect(() => {
    if (!approveMode) {
      setFilteredArtwork(applySearch(submittedArtwork));
    } else {
      setFilteredArtwork(submittedArtwork);
    }
  }, [submittedArtwork, search]);

  useEffect(() => {
    if (approveMode) {
      fetch("/api/admin-artwork?status=submitted")
        .then((res) => res.json())
        .then((data) => setSubmittedArtwork(data))
        .catch((err) => console.log(err));
    } else {
      fetch("/api/admin-artwork")
        .then((res) => res.json())
        .then((data) => setSubmittedArtwork(data))
        .catch((err) => console.log(err));
    }
  }, [approveMode]);

  // function to accept/reject submitted artwork
  const changeStatus = (id, newStatus) => {
    fetch(`/api/artwork/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artwork_status: newStatus,
        decision_date: new Date(),
        admin_id: user.id,
      }),
    })
      .then((res) => {
        if (res.status === 401) {
          return "Unauthorised";
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data.success) {
          alert(`Item successfully ${newStatus}`);
          fetch("/api/artwork?status=submitted")
            .then((res) => res.json())
            .then((data) => setSubmittedArtwork(data))
            .catch((err) => console.log(err));
        } else {
          alert("Could not change artwork status");
        }
      });
  };

  // function to delete an artwork item
  const deleteArtwork = (id) => {
    fetch(`/api/artwork/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 401) {
          return "Unauthorised";
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data.success) {
          alert(data.success);
          fetch("/api/admin-artwork?status=submitted")
            .then((res) => res.json())
            .then((data) => setSubmittedArtwork(data))
            .catch((err) => console.log(err));
        } else {
          alert("Could not delete item");
        }
      });
  };

  return (
    <>
      {!approveMode && (
        <div
          key="searchbar"
          className="search-input-wrapper"
          style={{ width: "400px", marginBottom: "20px" }}
        >
          <i className="fas fa-search"></i>
          <input
            type="text"
            className="search-bar"
            placeholder="Search by artist name or title"
            id="search"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <div className="container">
        <div className="cards-wrapper">
          {filteredArtwork.length > 0 &&
            filteredArtwork.map((artwork) => {
              return (
                <Card key={artwork.id} className={classes.root}>
                  <CardContent className="card-action">
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
                      <audio className={classes.audio} controls>
                        <source src={`/api/media/${artwork.content_link}`} />
                      </audio>
                    )}

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
                      City: {artwork.city !== "undefined" && artwork.city}
                    </Typography>
                    {(artwork.content_type === "text" ||
                      artwork.content_type === "image") && (
                      <Typography
                        className={`${classes.text} admin-card-story`}
                        variant="body1"
                      >
                        <ReactReadMoreReadLess
                          className="read-more-read-less"
                          charLimit={80}
                          readMoreText={"Read more ▼"}
                          readLessText={"Read less ▲"}
                        >
                          {artwork.content_text}
                        </ReactReadMoreReadLess>
                      </Typography>
                    )}
                    <Typography variant="body1">
                      <strong>Status: </strong>
                      {artwork.artwork_status}
                    </Typography>
                    <Link
                      to={{
                        pathname: "/edit",
                        state: {
                          artwork: artwork,
                        },
                      }}
                    >
                      <Button style={{ color: "#1c555c" }} className="about">
                        Edit
                      </Button>
                    </Link>
                    {artwork.artwork_status === "submitted" && (
                      <>
                        <Button
                          style={{ color: "#1c555c" }}
                          className="about"
                          onClick={() => changeStatus(artwork.id, "approved")}
                        >
                          Accept
                        </Button>
                        <Button
                          style={{ color: "#1c555c" }}
                          className="about"
                          onClick={() => changeStatus(artwork.id, "rejected")}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    <Button
                      color="primary"
                      className="about delete-button"
                      style={{ color: "#1c555c" }}
                      onClick={() => deleteArtwork(artwork.id)}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          {submittedArtwork.length === 0 && <div>No artwork to approve</div>}
        </div>
      </div>
    </>
  );
};

export default AdminStoryCards;
