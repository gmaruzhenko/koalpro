import React from 'react';
import {Handle, Position, useReactFlow} from 'react-flow-renderer';
import '../../css/custom_nodes.css'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import defaultStartNodes from "../defaultStartNodes";
import deleteNodeHelper from "../deleteNodeHelper";
import Typography from "@material-ui/core/Typography";

const onEdgeClick = (evt, id, reactFlowInstance) => {
    evt.stopPropagation();
    deleteNodeHelper(reactFlowInstance, id);

};

const UpSellOutputNode = (props) => {
    const reactFlowInstance = useReactFlow();

    return (
        <div className="up-sell-output-node">
            <IconButton aria-label="delete" style={{float: 'right', vertical_align: 'top', padding: '0px'}} size="small"
                        onClick={(event) => onEdgeClick(event, props.id, reactFlowInstance)}>
                <HighlightOffIcon fontSize="inherit"/>
            </IconButton>
            <Handle type="target" position={Position.Left} />
            <Typography variant="h6" component="div" gutterBottom>
                <div>Up Sell Dashboard Output</div>
            </Typography>
        </div>
    );
};

export default UpSellOutputNode;