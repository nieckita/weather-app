import React from 'react';
import ReactDOM from 'react-dom/client';
import BackgroundLive from './components/BackgroundLive.jsx';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity, // Daten, die einmal im Cache sind, werden nicht nochmal geladen
			gcTime: Infinity, // Zeit, nach der unbenutzte Daten aus dem Cache gelöscht werden. Default sind 5 Minuten.
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BackgroundLive />
			<App />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</React.StrictMode>
);
