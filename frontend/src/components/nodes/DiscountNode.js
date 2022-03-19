import React, {useEffect, useState} from 'react';
import {Handle, Position, useReactFlow} from 'react-flow-renderer';
import '../../css/custom_nodes.css'
import TextField from "@material-ui/core/TextField/TextField";
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

const DiscountNode = ({data,id}) => {
    const [discount, setDiscount] = useState(data.discount);
    const handleColumnKeysChange = e => {
        const value = e.target.value.replace(/\D/g, "");
        //ensure no more than 100% discount
        if (value<=100){
            setDiscount(e.target.value);
        }
    };
    useEffect(() => {
            data.discount = discount/100 //convert to a decimal for the backend
        },
        [discount]
    );
    const reactFlowInstance = useReactFlow();

    return (
        <div className="discount-node">
            <IconButton aria-label="delete" style={{float:'right',vertical_align: 'top',padding:'0px'}} size="small" onClick={(event) => onEdgeClick(event, id,reactFlowInstance)}>
                <HighlightOffIcon fontSize="inherit" />
            </IconButton>
            <Handle type="target" id="input_1" position={Position.Left} style={{  top: '50%',borderRadius: 0 }} />

            <div>Discount</div>
            <TextField  label="% discount from list price" onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }className="text-input-field" type="number" value={discount} onChange={handleColumnKeysChange} />

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