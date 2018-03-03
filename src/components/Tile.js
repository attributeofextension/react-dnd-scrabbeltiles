import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { ItemTypes } from './types';

class Tile extends Component {
	score() {
		return 1;
	}
	
	render() {
		const { connectDragSource, isDragging, connectDropTarget } = this.props;
		const opacity = isDragging ? 0 : 1
		return connectDropTarget(connectDragSource(
			<div style={{...styles.tileStyle,opacity}}>
				<h1 style={styles.letterStyle}>{this.props.letter}<sub style={styles.scoreStyle}>{this.score()}</sub></h1>
			</div>
		));
	}
}
const styles = {
	tileStyle: {
		width: 40,
		height: 60,
		border: '1px solid black',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		backgroundColor: '#FFFFF0'
	},
	letterStyle: {
		fontSize: 35
	},
	scoreStyle: {
		fontSize: 15
	}
}

const tileSource = {
	beginDrag(props,monitor,component) {
		const item = { id: props.id, 
									letter: props.letter, 
									slotted: props.slotted, 
									index: props.index,
									original: false};
		return item;
	},
	endDrag(props,monitor) {
		const dropResult = monitor.getDropResult();
		if( dropResult ) {
			if( dropResult.moved === true ) {
				props.removeTile(props.index);
			}
		}
	}
}
const collectSource = (connect, monitor) => {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}
const tileTarget = {
	drop(props,monitor,component) {
		const item = monitor.getItem();
		if( item.slotted && props.id !== item.id ) {
			props.insertTile(props.id, item);
			return { moved: true}
		}
		return { moved: false };
	},
	hover(props,monitor, component) {
		if(props.slotted) {
			return;
		}
		const source = monitor.getItem();
		
		
		const sourceId = monitor.getItem().id;
		const targetId = props.id;
		if(sourceId === props.id) {
			return;
		}
		if( !source.slotted ) {
			props.moveTile(sourceId,targetId);
		}
	}
}
const collectTarget = (connect,monitor) => {
	return {
		connectDropTarget: connect.dropTarget()
	};
}


export default DropTarget(ItemTypes.TILE,tileTarget,collectTarget)(DragSource(ItemTypes.TILE,tileSource,collectSource)(Tile));