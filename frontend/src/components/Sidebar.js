import React, {useEffect, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import ReactFlow, { useReactFlow } from 'react-flow-renderer';
import '../css/dnd.css';
import '../css/custom_nodes.css'

export default ({nodes}) => {
    const [crossSellCount, setCrossSellCount] = useState(0);
    const [upSellCount, setUpSellCount] = useState(0);
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };
    useEffect(() => {
            let upsellcount = 0;
            let crosssellcount = 0;

            nodes&&nodes.forEach(function (node) {
                if (node.type === "cross_sell_output") {
                    crosssellcount = crosssellcount+1;
                }
                if (node.type === "up_sell_output") {
                    upsellcount = upsellcount+1
                }
            });
            setCrossSellCount(crosssellcount);
            setUpSellCount(upsellcount);
        },
        [nodes]
    );


    return (
        <aside>
            <div className="description">Drag these nodes to the pane on the right.</div>
            <div className="addition-node" onDragStart={(event) => onDragStart(event, 'addition')} draggable>
                Addition
            </div>
            <div className="discount-node" onDragStart={(event) => onDragStart(event, 'discount')} draggable>
                Discount

            </div>
            {0 === crossSellCount &&
            <div className="cross-sell-output-node" onDragStart={(event) => onDragStart(event, 'cross_sell_output')}
                 draggable>
                Cross Sell Dashboard Output
            </div>}
            {0 === upSellCount &&
            <div className="up-sell-output-node" onDragStart={(event) => onDragStart(event, 'up_sell_output')}
                 draggable>
                Up Sell Dashboard Output
            </div>}
            <div className="csv-data-import-node" onDragStart={(event) => onDragStart(event, 'csv_data_import')}
                 draggable>
                CSV Data Import
            </div>
            <div className="product-node" onDragStart={(event) => onDragStart(event, 'product')}
                 draggable>
                Product
            </div>
        </aside>
    );
};