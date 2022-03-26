import React from 'react';
import {Handle, Position, useReactFlow} from 'react-flow-renderer';
import '../../css/custom_nodes.css'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import defaultStartNodes from "../defaultStartNodes";
import deleteNodeHelper from "../deleteNodeHelper";

const onEdgeClick = (evt, id,reactFlowInstance) => {
    evt.stopPropagation();
    deleteNodeHelper(reactFlowInstance,id)

};

const CrossSellOutputNode = ({id}) => {
    const reactFlowInstance = useReactFlow();

    return (
        <div className="cross-sell-output-node">
            <IconButton aria-label="delete" style={{float:'right',vertical_align: 'top',padding:'0px'}} size="small" onClick={(event) => onEdgeClick(event, id,reactFlowInstance)}>
                <HighlightOffIcon fontSize="inherit" />
            </IconButton>
            <Handle type="target" position={Position.Left} style={{  top: '50%',borderRadius: 0 }} />
            <div>Cross Sell Dashboard Output</div>
        </div>
    );
};

export default CrossSellOutputNode;