import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth-context";
import { Provider } from "react-redux";
import { store } from "strore";

export const AppProvider = ({ children }: { children: ReactNode }) => {
	return (
		<Provider store={store}>
			{/* redux-store */}
			<QueryClientProvider client={new QueryClient()}>
				<AuthProvider>{children}</AuthProvider>
			</QueryClientProvider>
		</Provider>
	);
};
