import React from 'react';
import ReactFlow, { Handle, Position } from 'react-flow-renderer';
import '../css/custom_nodes.css'
//
// const customNodeStyles = {
//     background: '#9CA8B3',
//     color: '#FFF',
//     padding: 10,
// };

const AdditionNode = ({ data }) => {
    return (
        <div className="addition_node">
            <Handle type="target" position={Position.Left} style={{  top: '30%',borderRadius: 0 }} />
            <Handle type="target" position={Position.Left} style={{ top: '70%', borderRadius: 0 }} />

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