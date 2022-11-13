import React, { useEffect } from 'react';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
const HomeTab = ({ setView, showIntro, setShowIntro, hideIntro, setHideIntro }) => {

  const changeSelection = (value) => (e) => {
    setView(value);
    if (showIntro) setShowIntro(false);
    e.target.parentElement.childNodes.forEach((element, index) => {
      if (index !== 1) {
        element.className = "tab-button";
      };
    });
    e.target.className = "tab-button active";
  }

  useEffect(() => {
    if (!showIntro) {
      setTimeout(function () {
        setHideIntro('hidden');
      }, 2000);
    }
  }, [showIntro])

  return (
    <div className="tab-container">
      <button
        className="tab-button active"
        onClick={changeSelection("map")}
        style={{
          backgroundColor: '#4f3e7f',
          color: "antiquewhite",
          fontWeight: "normal",
          border: "3px solid #a8546c",
          boxSizing: "border-box",
          borderRadius: "7px",
          fontFamily: "EB Garamond",
          padding: "0.5em 1.75em",
          cursor: "pointer",
          whiteSpace: "nowrap",
          zIndex: "2"
        }}
      >
        MAP VIEW
      </button>
      <div className={showIntro ? "intro-wrapper" : `${hideIntro} animate intro-wrapper`}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => setShowIntro(false)}
          aria-label="close"
          style={{ float: 'right', color: '#a8546c', top: '0' }}
        >
          <CloseIcon />
        </IconButton>
        <h2 className="intro">
          Welcome to <span className='larger-text'>UCHI</span> World, a celebration of unity, identity and love! This is a place to share cultures, memories and stories of the homes we carry within us, wherever we go.  <br />

          UCHI provides a platform for you to upload your own personal piece of content and become part of the global family. You can share a small part of your story with the world as text, image, audio or video with a short description. We love to hear and see the specific things you relate to “home”; perhaps an old family recipe, a lullaby your grandma used to sing, a photo or video of a favourite memory - all contributions are valuable!  <br /> 

          Please also feel free to explore the site and enjoy other stories as we share and learn special pieces of people's lives from around the world.  <br />
        </h2>
      </div>
      <button
        className="tab-button"
        onClick={changeSelection("listing")}
        style={{
          backgroundColor: '#4f3e7f',
          color: "antiquewhite",
          fontWeight: "normal",
          border: "3px solid #a8546c",
          boxSizing: "border-box",
          borderRadius: "7px",
          fontFamily: "EB Garamond",
          padding: "0.5em 1.3em",
          cursor: "pointer",
          whiteSpace: "nowrap"
        }}
      >
        STORY VIEW
      </button>
    </div>
  );
}

export default HomeTab;