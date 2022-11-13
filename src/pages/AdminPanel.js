import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import CopyrightIcon from "@material-ui/icons/Copyright";
import AdminStoryCards from "../components/AdminStoryCards";
import NewAdmin from "../components/NewAdmin";
import "./AdminPanel.css";
import logo from "../logo/uchi logo square jpeg.jpg";

const AdminPanel = ({ user, setUser }) => {
  let history = useHistory();

  const [approveMode, setApproveMode] = useState(true);
  const [createMode, setCreateMode] = useState(false);
  

  useEffect(() => {
    fetch("/api/ping", { credentials: "include" })
      .then((res) => {
        if (res.status === 401) {
          history.push("/login");
        } else {
          return res.json();
        }
      })
      .then((data) => setUser(data));
  }, []);

  const handleLogout = () => {
    fetch("/api/logout").then((res) => {
      if (res.status != 200) {
        alert("Could not log out");
      } else {
        history.push("/");
      }
    });
  };

  

  return (
    <>
      <main className="main" role="main">
        {user && user.username && (
          <>
            <header className="admin_panel_header">
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
                <div
                  style={{
                    display: "flex",
                    width: "95%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transform: "skewY(4deg)",
                  }}
                >
                  <div style={{ marginTop: "4em" }} className="logo-container">
                    <img className="logo" src={logo} alt={logo} />
                    <h1 className="brand-name">UCHI</h1>
                  </div>
                  <h1
                    style={{ color: "white", margin: "0 0 0.75em -1em" }}
                    id="welcome"
                  >
                    Welcome, {user.username}!
                  </h1>
                  <Button
                    id="logout"
                    onClick={handleLogout}
                    variant="contained"
                    style={{
                      backgroundColor: "#4f3e7f",
                      color: "white",
                      fontWeight: "normal",
                      border: "3px solid #a8546c",
                      boxSizing: "border-box",
                      borderRadius: "7px",
                      fontFamily: "EB Garamond",
                      padding: "0.5em 1.75em",
                      marginTop: "-3em",
                      marginRight: "-2em",
                    }}
                    color="primary"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </header>
            <Button
              id="create-admin"
              onClick={() => setCreateMode(!createMode)}
              style={{
                backgroundColor: "#4f3e7f",
                color: "white",
                fontWeight: "normal",
                border: "3px solid #a8546c",
                boxSizing: "border-box",
                borderRadius: "7px",
                fontFamily: "EB Garamond",
                padding: "0.5em 1.75em",
                marginLeft: "2.5em",
              }}
              variant="outlined"
              color="primary"
            >
              Create new admin
            </Button>
            {createMode && <NewAdmin setCreateMode={setCreateMode} />}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2 className="admin-title">
                {approveMode ? "Artwork to approve" : "All artwork"}
              </h2>
              <Button
                onClick={() => setApproveMode(!approveMode)}
                style={{
                  backgroundColor: "#4f3e7f",
                  color: "white",
                  fontWeight: "normal",
                  border: "3px solid #a8546c",
                  boxSizing: "border-box",
                  borderRadius: "7px",
                  fontFamily: "EB Garamond",
                  padding: "0.5em 1.75em",
                  maxWidth: "300px",
                  marginBottom: "20px",
                }}
                variant="outlined"
                color="primary"
                id="artwork-toggle"
              >
                {approveMode
                  ? "See all artwork"
                  : "See only artwork to approve"}
              </Button>
              <AdminStoryCards user={user} approveMode={approveMode} />
            </div>

            <footer>
              <div
                className="footer_bg"
                style={{
                  position: "relative",
                  top: "0",
                  bottom: "0",
                  right: "0",
                  left: "0",
                  width: "100 %",
                  height: "13em",
                  backgroundImage: "linear-gradient(#7d69af, #7d69af)",
                  transform: "skewY(-4deg)",
                  transformOrigin: "bottom right",
                }}
              >
                <div className="footer-content">
                  <div className="copy-right">
                    Copyright
                    <CopyrightIcon />
                    DevNinjas
                  </div>
                </div>
              </div>
            </footer>
          </>
        )}
      </main>
    </>
  );
};

export default AdminPanel;
