import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './types';

class BoardSlot extends Component {
	render() {		
		const { connectDropTarget, canDrop, isOver } = this.props;
		
		return connectDropTarget(
			<div style={styles.slotStyle}>
				{this.props.children}
			</div>
		);
	}
}
const styles = {
	slotStyle: {
		width: 42,
		height: 62,
		border: '1px dotted black',
		margin: '0px 5px'
	}
}

const slotTarget = {
	drop(props,monitor,component) {
		props.addTile(props.id,monitor.getItem());
		return { moved: true };
	},
	canDrop(props,monitor) {
		if(props.children) {
			return false;
		} else {
			return true;
		}
	}
}
const collect = (connect,monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		canDrop: monitor.canDrop(),
		isOver: monitor.isOver()
	}
}

export default DropTarget(ItemTypes.TILE,slotTarget,collect)(BoardSlot);