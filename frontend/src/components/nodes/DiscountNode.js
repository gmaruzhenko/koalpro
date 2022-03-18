import React, {useEffect, useState} from 'react';
import  { Handle, Position } from 'react-flow-renderer';
import '../../css/custom_nodes.css'
import TextField from "@material-ui/core/TextField/TextField";


const DiscountNode = ({ data }) => {
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

    return (
        <div className="discount-node">
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