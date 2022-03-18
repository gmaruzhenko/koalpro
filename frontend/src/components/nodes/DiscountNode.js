import React from 'react';
import  { Handle, Position } from 'react-flow-renderer';
import '../../css/custom_nodes.css'


const DiscountNode = ({ data }) => {
    return (
        <div className="discount-node">
            <Handle type="target" id="input_1" position={Position.Left} style={{  top: '50%',borderRadius: 0 }} />

            <div>Discount</div>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                style={{ borderRadius: 0 }}
            />

        </div>
    );
};

export default DiscountNode;