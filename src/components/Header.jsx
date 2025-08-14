import TopInfo from './TopInfo';

export default function Header() {
	return (
		<header className="site-header content-padding background-glass  ">
			<div className="site-logo content-display ">
				<h1>🌤️ Weather </h1>
			</div>
			<div className="top-info content-display">
				<TopInfo />
			</div>
		</header>
	);
}
