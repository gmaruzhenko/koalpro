import React from 'react';
import  { Handle, Position } from 'react-flow-renderer';
import '../../css/custom_nodes.css'


const CrossSellOutputNode = () => {
    return (
        <div className="cross_sell_output_node">
            <Handle type="target" position={Position.Left} style={{  top: '50%',borderRadius: 0 }} />
            <div>Cross Sell Dashboard Output</div>
        </div>
    );
};

export default CrossSellOutputNode;