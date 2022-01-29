import React from 'react';
import  { Handle, Position } from 'react-flow-renderer';
import '../../css/custom_nodes.css'


const CrossSellOutputNode = ({ data }) => {
    return (
        <div className="addition_node">
            <Handle type="target" position={Position.Left} style={{  top: '30%',borderRadius: 0 }} />
            <div>Cross Sell Dashboard Output</div>
        </div>
    );
};

export default CrossSellOutputNode;