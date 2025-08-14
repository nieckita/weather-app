import Footer from './Footer.jsx';
import Header from './Header.jsx';

export default function Layout({ children }) {
	return (
		<>
			<div className="container content-padding">
				<Header />

				<main id="content" className="site-content content-padding">
					{children}
				</main>
				<Footer />
			</div>
		</>
	);
}
