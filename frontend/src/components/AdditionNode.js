import React from 'react';
import ReactFlow, { Handle, Position } from 'react-flow-renderer';


const customNodeStyles = {
    background: '#9CA8B3',
    color: '#FFF',
    padding: 10,
};

const AdditionNode = ({ data }) => {
    return (
        <div style={customNodeStyles}>
            <Handle type="target" position={Position.Left} style={{  top: '30%',borderRadius: 0 }} />
            <Handle type="target" position={Position.Left} style={{ top: '70%', borderRadius: 0 }} />

            <div>{data.text}</div>
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