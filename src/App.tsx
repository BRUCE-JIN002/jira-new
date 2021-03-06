import React from "react";
import "./App.css";
import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "./authenticated-app";
import { UnanthenticatedApp } from "./screens/unauthenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";
function App() {
	const { user } = useAuth();
	return (
		<div className="App">
			<ErrorBoundary fallbackRender={FullPageErrorFallback}>
				{user ? <AuthenticatedApp /> : <UnanthenticatedApp />}
			</ErrorBoundary>
		</div>
	);
}

export default App;
