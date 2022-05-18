import React from "react";
import "./App.css";
import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "./authenticated-app";
import { UnanthenticatedApp } from "./screens/unauthenticated-app";
function App() {
	const { user } = useAuth();
	return (
		<div className="App">
			{user ? <AuthenticatedApp /> : <UnanthenticatedApp />}
		</div>
	);
}

export default App;
