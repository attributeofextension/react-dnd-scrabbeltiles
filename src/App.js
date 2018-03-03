import React, { Component } from 'react';
import Board from './components/Board';
import TileRack from './components/TileRack';
import Signature from './components/Signature';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component {
	render() {
		const slots = [
			{ id: 0, content: null },
			{ id: 1, content: null },
			{ id: 2, content: null },
			{ id: 3, content: null },
			{ id: 4, content: null },
			{ id: 5, content: null },
			{ id: 6, content: null },
			{ id: 7, content: null }
		];

		const tiles = [
			{ id: 0, letter: "A" },
			{ id: 1, letter: "T" },
			{ id: 2, letter: "S" },
			{ id: 3, letter: "R" },
			{ id: 4, letter: "C" },
			{ id: 5, letter: "F" },
			{ id: 6, letter: "E" },
			{ id: 7, letter: "M" },
		];
		
		return (
			<div>
				<Board slots={slots} />
				<TileRack tiles={tiles} />
				<Signature name="Leah Carr" 
									 portfolioLink="https://attributeofextension.github.io/"
									 githubLink="https://github.com/attributeofextension"
				/>
			</div>
		);
	};
}

export default DragDropContext(HTML5Backend)(App);