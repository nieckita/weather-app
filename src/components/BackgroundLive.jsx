import { useEffect } from 'react';
import Granim from 'granim';

export default function BackgroundLive() {
	useEffect(() => {
		new Granim({
			element: '#canvas',
			direction: 'left-right',
			states: {
				'default-state': {
					gradients: [
						['#23747D', '#6CD3D9'],
						['#585ABF', '#2F8C96'],
						['#7BC7A7', '#585ABF'],
						['#6CD3D9', '#7BC7A7'],
					],
					transitionSpeed: 5000,
				},
			},
		});
	}, []);

	return (
		<div>
			<canvas
				className="canvas"
				id="canvas"
				data-granim=".site-wrapper"
			></canvas>
		</div>
	);
}
