import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth-context";

export const AppProvider = ({ children }: { children: ReactNode }) => {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<AuthProvider>{children}</AuthProvider>
		</QueryClientProvider>
	);
};
