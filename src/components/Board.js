import React, { Component } from 'react';

import { score } from '../Game';

import BoardSlot from './BoardSlot';
import Tile from './Tile';


class Board extends Component {	
	constructor(props) {
		super(props);

		this.state = {slots: this.props.slots};

		this.addTile = this.addTile.bind(this);
		this.removeTile = this.removeTile.bind(this);
	}
	addTile(id,tile) {
		const slots = this.state.slots;
		const index = slots.findIndex((s) => s.id === id);
		slots[index].content = tile;
		this.setState({slots: slots});
	}
	removeTile(index) {;
		const slots = this.state.slots.concat([]);
		slots[index].content = null;
		this.setState({slots: slots});
	}
	renderSlots(slots) {
		return slots.map((slot,i) => {
			const {id, content, original} = slot;
			return ( 
				<BoardSlot 
					key={id}
					id={id} 
					content={content}
					addTile={this.addTile}
				>
					{content&&<Tile 
											id={content.id} 
											letter={content.letter} 
											score={score(content.letter)} 
											slotted={true}
											removeTile={this.removeTile}
											index={i}
											/>}
				</BoardSlot>
			);
		});
	}
	render() {
		
		return (
			<div style={styles.boardStyle}>
				{this.renderSlots(this.state.slots)}
			</div>
		);
	}
}
const styles = {
	boardStyle: {
		width: 600,
		height: 80,
		backgroundColor: 'd3d3d3',
		border: '3px solid black',
		borderRadius: '5px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 'auto'
	}
};


export default Board;

