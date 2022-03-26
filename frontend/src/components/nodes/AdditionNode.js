import React from 'react';
import {Handle, Position, useReactFlow} from 'react-flow-renderer';
import '../../css/custom_nodes.css'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import defaultStartNodes from "../defaultStartNodes";
import deleteNodeHelper from "../deleteNodeHelper";

const onEdgeClick = (evt, id,reactFlowInstance) => {
    evt.stopPropagation();
    deleteNodeHelper(reactFlowInstance,id);

};


const AdditionNode = (props) => {
    const reactFlowInstance = useReactFlow();

    return (
        <div className="addition-node">
            <IconButton aria-label="delete" style={{float:'right',vertical_align: 'top',padding:'0px'}} size="small" onClick={(event) => onEdgeClick(event, props.id,reactFlowInstance)}>
                <HighlightOffIcon fontSize="inherit" />
            </IconButton>

            <Handle type="target" id="input_1" position={Position.Left} style={{  top: '30%',borderRadius: 0 }} />
            <Handle type="target" id="input_2" position={Position.Left} style={{ top: '70%', borderRadius: 0 }} />

            <div>
                Addition

            </div>
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