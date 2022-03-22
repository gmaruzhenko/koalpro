import React from 'react';
import {Handle, Position, useReactFlow} from 'react-flow-renderer';
import '../../css/custom_nodes.css'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import defaultStartNodes from "../defaultStartNodes";

const onEdgeClick = (evt, id,reactFlowInstance) => {
    evt.stopPropagation();
    let after_edges = reactFlowInstance.getNodes().filter(node => node.id!== id);
    if (reactFlowInstance.getNodes().length===1){
        reactFlowInstance.setNodes(defaultStartNodes);

    }else{
        reactFlowInstance.setNodes(after_edges);

    }

};

const UpSellOutputNode = (props) => {
    const reactFlowInstance = useReactFlow();

    return (
        <div className="up-sell-output-node">
            <IconButton aria-label="delete" style={{float:'right',vertical_align: 'top',padding:'0px'}} size="small" onClick={(event) => onEdgeClick(event, props.id,reactFlowInstance)}>
                <HighlightOffIcon fontSize="inherit" />
            </IconButton>
            <Handle type="target" position={Position.Left} style={{  top: '50%',borderRadius: 0 }} />
            <div>Up Sell Dashboard Output</div>
        </div>
    );
};

export default UpSellOutputNode;