import React from "react";
import Switch from "./Switch";
import UploadModal from './UploadModal';
import SearchBar from './SearchBar';
import logo from '../logo/uchi logo square jpeg.jpg';
import DonateLink from "./DonateLink";
import Sticky from "react-stickynode";

const AppHeader = ({ approvedArtwork, setApprovedArtwork, backupData, showIntro, setShowIntro }) => {
  return (
    <header className="app-header">
      <div
        className="header_bg"
        style={{
          position: "absolute",
          top: "0",
          bottom: "0",
          right: "0",
          left: "0",
          width: "100 %",
          height: "13em",
          backgroundImage: "linear-gradient(#7d69af, #7d69af)",
          transform: "skewY(-4deg)",
          transformOrigin: "top left",
        }}
      >
        <div className="header-contents">
          <div className="logo-container">
            <a href="/">
              <img className="logo" src={logo} alt={logo} />
            </a>
            <h1 className="brand-name">UCHI</h1>
          </div>
          <div className="search-and-switch">
            <SearchBar
              showIntro={showIntro}
              setShowIntro={setShowIntro}
              setApprovedArtwork={setApprovedArtwork}
              backupData={backupData}
            />
            <Switch
              showIntro={showIntro}
              setShowIntro={setShowIntro}
              approvedArtwork={approvedArtwork}
              setApprovedArtwork={setApprovedArtwork}
              backupData={backupData}
            />
          </div>
          <UploadModal />
        </div>
      </div>
      <Sticky innerZ="10" enabled={true}>
        <DonateLink />
      </Sticky>
    </header>
  );
};

export default AppHeader;