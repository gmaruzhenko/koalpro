import React from 'react';
import '../css/dnd.css';
import '../css/custom_nodes.css'

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
            <div className="addition_node" onDragStart={(event) => onDragStart(event, 'addition')} draggable>
                Addition
            </div>
            <div className="cross_sell_output_node" onDragStart={(event) => onDragStart(event, 'cross_sell_output')} draggable>
                Cross Sell Dashboard Output
            </div>
            <div className="csv_data_import_node" onDragStart={(event) => onDragStart(event, 'csv_data_import')} draggable>
                CSV Data Import
            </div>
        </aside>
    );
};