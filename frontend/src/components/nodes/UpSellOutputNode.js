import React from 'react';
import  { Handle, Position } from 'react-flow-renderer';
import '../../css/custom_nodes.css'


const UpSellOutputNode = () => {
    return (
        <div className="up-sell-output-node">
            <Handle type="target" position={Position.Left} style={{  top: '50%',borderRadius: 0 }} />
            <div>Up Sell Dashboard Output</div>
        </div>
    );
};

export default UpSellOutputNode;