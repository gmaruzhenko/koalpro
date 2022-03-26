import React, {useEffect, useState} from 'react';
import {Handle, Position, useReactFlow} from 'react-flow-renderer';
import '../../css/custom_nodes.css'
import TextField from "@material-ui/core/TextField/TextField";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import defaultStartNodes from "../defaultStartNodes";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import deleteNodeHelper from "../deleteNodeHelper";

const onEdgeClick = (evt, id, reactFlowInstance) => {
    evt.stopPropagation();
    deleteNodeHelper(reactFlowInstance,id);

};

const productLibrary = {
    "product": [
        {
            "unit_price": 2,
            "product_name": "Puck"
        },
        {
            "unit_price": 30,
            "product_name": "Helmet"
        },
        {
            "unit_price": 10,
            "product_name": "Stick"
        },

    ]

};

const ProductNode = ({data, id}) => {
    const [productPrice, setProductPrice] = useState(data.product || 2); //default to a state to ensure controlled
    const handleChange = (event) => {
        setProductPrice(event.target.value);
    };
    useEffect(() => {
            // data.product.unit_price = productPrice;
            data.product = productLibrary.product.filter(unit => unit.unit_price === productPrice);
        },
        [productPrice]
    );
    const reactFlowInstance = useReactFlow();

    return (
        <div className="product-node">
            <IconButton aria-label="delete" style={{float: 'right', vertical_align: 'top', padding: '0px'}} size="small"
                        onClick={(event) => onEdgeClick(event, id, reactFlowInstance)}>
                <HighlightOffIcon fontSize="inherit"/>
            </IconButton>
            <Handle type="target" id="input_1" position={Position.Left} style={{top: '50%', borderRadius: 0}}/>

            <div>Product</div>
            <Select
                value={productPrice}
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
                style={{borderRadius: 0}}
            />

        </div>
    );
};

export default ProductNode;