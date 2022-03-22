import React, {useEffect, useState} from 'react';
import {Handle, Position, useReactFlow} from 'react-flow-renderer';
import '../../css/custom_nodes.css'
import TextField from "@material-ui/core/TextField/TextField";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import defaultStartNodes from "../defaultStartNodes";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const onEdgeClick = (evt, id,reactFlowInstance) => {
    evt.stopPropagation();
    let after_edges = reactFlowInstance.getNodes().filter(node => node.id!== id);
    if (reactFlowInstance.getNodes().length===1){
        reactFlowInstance.setNodes(defaultStartNodes);

    }else{
        reactFlowInstance.setNodes(after_edges);

    }

};

const ProductNode = ({data,id}) => {
    const [product, setProduct] = useState(data.product||2);
    const handleChange = (event) => {
        setProduct(event.target.value);
    };
    const reactFlowInstance = useReactFlow();

    return (
        <div className="product-node">
            <IconButton aria-label="delete" style={{float:'right',vertical_align: 'top',padding:'0px'}} size="small" onClick={(event) => onEdgeClick(event, id,reactFlowInstance)}>
                <HighlightOffIcon fontSize="inherit" />
            </IconButton>
            <Handle type="target" id="input_1" position={Position.Left} style={{  top: '50%',borderRadius: 0 }} />

            <div>Product</div>
            <Select
                value={product}
                onChange={handleChange}
            >
                <MenuItem value={2}>Pucks 2$/unit</MenuItem>
                <MenuItem value={30}>Helmet 30$/unit</MenuItem>
                <MenuItem value={10}>Sticks 10$/unit</MenuItem>
            </Select>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                style={{ borderRadius: 0 }}
            />

        </div>
    );
};

export default ProductNode;