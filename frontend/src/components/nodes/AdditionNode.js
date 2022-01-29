import React from 'react';
import  { Handle, Position } from 'react-flow-renderer';
import '../../css/custom_nodes.css'


const AdditionNode = ({ data }) => {
    return (
        <div className="addition_node">
            <Handle type="target" id="input_1" position={Position.Left} style={{  top: '30%',borderRadius: 0 }} />
            <Handle type="target" id="input_2" position={Position.Left} style={{ top: '70%', borderRadius: 0 }} />

            <div>Addition</div>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                style={{ borderRadius: 0 }}
            />

        </div>
    );
};

export default AdditionNode;