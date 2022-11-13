import { useEffect, useState } from "react";
import "./Home.css";
import ArtistsStoryCards from "../components/ArtistsStoryCards";
import AppHeader from "../components/AppHeader";
import Footer from "../components/Footer";
import Map from "../components/Map";
import HomeTab from "../components/HomeTab";

export function Home() {
  const [approvedArtwork, setApprovedArtwork] = useState([]);
  const [backupData, setBackupData] = useState([]);
  const [view, setView] = useState("map");
  const [showIntro, setShowIntro] = useState(true);
  const [hideIntro, setHideIntro] = useState('');

  useEffect(() => {
    fetch("/api/artwork")
      .then((res) => res.json())
      .then((data) => {
        setApprovedArtwork(data);
        setBackupData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <main className="main" role="main">
        <AppHeader
          showIntro={showIntro}
          setShowIntro={setShowIntro}
          approvedArtwork={approvedArtwork}
          setApprovedArtwork={setApprovedArtwork}
          backupData={backupData}
        />
        <HomeTab
          hideIntro={hideIntro}
          setHideIntro={setHideIntro}
          showIntro={showIntro}
          setShowIntro={setShowIntro}
          setView={setView}
        />
        {view === "listing" && <ArtistsStoryCards approvedArtwork={approvedArtwork} />}
        {view === "map" && <Map approvedArtwork={approvedArtwork} />}
        <Footer />
      </main>
    </>
  );
}

export default Home;
