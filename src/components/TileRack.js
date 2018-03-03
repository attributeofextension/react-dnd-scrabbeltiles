import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './types';

import Tile from './Tile';

class TileRack extends Component {
	constructor(props) {
		super(props);

		this.state = { tiles: this.props.tiles };

		this.removeTile = this.removeTile.bind(this);
		this.moveTile = this.moveTile.bind(this);
		this.insertTile = this.insertTile.bind(this);
	}
	pushTile(tile) {
		const tiles = this.state.tiles;
		tiles.push(tile);
		this.setState({tiles: tiles.concat([])});
	}
	removeTile(index) {
		const tiles = this.state.tiles;
		tiles.splice(index,1);
		this.setState({ tiles: tiles.concat([])});
	}
	insertTile(targetId, tile) {
		const tiles = this.state.tiles;
		const targetIndex = tiles.findIndex((t) => t.id === targetId);
		tiles.splice(targetIndex,0,tile);
		this.setState({tiles: tiles.concat([])});
	}
	moveTile(sourceId, targetId) {			
		const tiles = this.state.tiles;
		const sourceIndex = tiles.findIndex((t)=> t.id === sourceId);
		const source = tiles.splice(sourceIndex,1);
		
		const targetIndex = tiles.findIndex((t) => t.id === targetId);
		const offset = targetIndex < sourceIndex ? 0 : 1;
		
		tiles.splice(targetIndex + offset,0,source[0]);
		this.setState({tiles: tiles.concat([])});
	}
	renderTiles(tiles) {
		return tiles.map((tile,i) => {
			return <Tile
							key={tile.id}
							id={tile.id}
							letter={tile.letter} 
							removeTile={this.removeTile}
							moveTile={this.moveTile}
							insertTile={this.insertTile}
							slotted={false}
							index={i}
						/>
		});
	}
	render() {
		const { connectDropTarget } = this.props;
		return connectDropTarget(
			<div style={styles.rackStyle}>
				{this.renderTiles(this.state.tiles)}
			</div>
		);
	}
}
const styles = {
	rackStyle: {
		width: 500,
		height: 80,
		backgroundColor: 'green',
		border: '3px solid black',
		margin: 'auto',
		marginTop: 60,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	}
}

const rackTarget = {
	drop(props,monitor,component) {
		if(monitor.getItem().slotted) {
			component.pushTile(monitor.getItem());
			return { moved : true };
		}
	}
}
const collect = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget()
	};
}
export default DropTarget(ItemTypes.TILE,rackTarget,collect)(TileRack);