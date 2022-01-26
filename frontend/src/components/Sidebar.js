import React from 'react';
import '../css/dnd.css';
import AdditionNode from "./AdditionNode";
const customNodeStyles = {
    background: '#9CA8B3',
    color: '#FFF',
    padding: 10,
};
export default () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside>
            <div className="description">You can drag these nodes to the pane on the right.</div>
            <div className="react-flow__node-input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
                Input Node
            </div>
            <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'default')} draggable>
                Default Node
            </div>
            <div className="react-flow__node-output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
                Output Node
            </div>
            <div className="react-flow__node-AdditionNode" onDragStart={(event) => onDragStart(event, 'AdditionNode')} draggable>
                Addition Node
            </div>
        </aside>
    );
};