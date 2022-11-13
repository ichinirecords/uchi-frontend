import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import Edit from "./pages/Edit";
import ResetRequest from "./pages/ResetRequest";
import Reset from "./pages/Reset";

const App = () => {
	const [user, setUser] = useState("");
	return (
		<Switch>
			<Route path="/" exact>
				<Home />
			</Route>
			<Route exact path="/login">
				<AdminLogin setUser={setUser} />
			</Route>
			<Route exact path="/admin">
				<AdminPanel user={user} setUser={setUser} />
			</Route>
			<Route exact path="/edit">
				<Edit user={user} setUser={setUser} />
			</Route>
			<Route exact path="/request-reset">
				<ResetRequest />
			</Route>
			<Route exact path="/reset">
				<Reset />
			</Route>
		</Switch>
	);
};

export default App;
