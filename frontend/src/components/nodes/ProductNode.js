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
import Typography from "@material-ui/core/Typography";

const onEdgeClick = (evt, id, reactFlowInstance) => {
    evt.stopPropagation();
    deleteNodeHelper(reactFlowInstance, id);

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
    // const price = data.product[0].unit_price
    if (data.product === undefined) {
        data.product = productLibrary.product;
    }
    const [productPrice, setProductPrice] = useState(data.product[0].unit_price); //default to a state to ensure controlled
    // const [productName, setProductName] = useState(productLibrary.product.); //default to a state to ensure controlled
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
            <Typography variant="h6" component="div" gutterBottom>
                Product Sales Opportunity
            </Typography>
            <div className="row-cols-1">
                <Select
                    value={productPrice}
                    onChange={handleChange}
                >
                    {/*<MenuItem value={2}>5 Pucks per Stick at 2$/unit</MenuItem>*/}
                    <MenuItem value={30}>1 Helmet per Stick at 30$/unit</MenuItem>
                    <MenuItem value={10}>1 Sticks per Stick at 10$/unit</MenuItem>
                </Select>
            </div>
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