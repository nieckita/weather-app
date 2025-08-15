import Layout from './components/Layout.jsx';
import MainContent from './components/MainContent.jsx';
import { WeatherProvider } from './context/WeatherContext.jsx';
export default function App() {
	return (
		<>
			<WeatherProvider>
				<Layout>
					<MainContent />
				</Layout>
			</WeatherProvider>
		</>
	);
}
