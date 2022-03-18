import React from 'react';
import Paper from "@material-ui/core/Paper";

import '../css/dnd.css';
import '../css/custom_nodes.css'

export default () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside>
            <div className="description">Drag these nodes to the pane on the right.</div>
            <div className="addition-node" onDragStart={(event) => onDragStart(event, 'addition')} draggable>
                Addition
            </div>
            <div className="cross-sell-output-node" onDragStart={(event) => onDragStart(event, 'cross_sell_output')} draggable>
                Cross Sell Dashboard Output
            </div>
            <div className="up-sell-output-node" onDragStart={(event) => onDragStart(event, 'up_sell_output')} draggable>
                Up Sell Dashboard Output
            </div>
            <div className="csv-data-import-node" onDragStart={(event) => onDragStart(event, 'csv_data_import')} draggable>
                CSV Data Import
            </div>
        </aside>
    );
};