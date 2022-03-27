import React, {useEffect, useRef, useState} from 'react';
import {Handle, Position, useReactFlow, useStoreState} from 'react-flow-renderer';
import Button from '@material-ui/core/Button';
import '../../css/custom_nodes.css'
import '../../css/dnd.css'
import TextField from "@material-ui/core/TextField";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import defaultStartNodes from "../defaultStartNodes";
import deleteNodeHelper from "../deleteNodeHelper";
import Typography from "@material-ui/core/Typography";

const onEdgeClick = (evt, id,reactFlowInstance) => {
    evt.stopPropagation();
    deleteNodeHelper(reactFlowInstance,id);

};


const DummySalesforceImport = ({ data,id }) => {
    const inputFile = useRef(null);
    const [fileName, setFileName] = useState(data.csv_name);//TODO hook this up to data and default "None Selected"
    const [columnKeys, setColumnKeys] = useState("Company Name");
    const [columnValues, setColumnValues] = useState("Worldwide # of players");

    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };

    const handleUpdate = e => setFileName(e.target.value);
    const handleColumnKeysChange = e => {setColumnKeys(e.target.value)};
    const handleColumnValuesChange = e => setColumnValues(e.target.value);

    //Update data using effect after file browser or input text
    useEffect(() => {
            data.csv_name = fileName
        },
        [fileName]
    );
    useEffect(() => {
            data.column_keys = columnKeys
        },
        [columnKeys]
    );
    useEffect(() => {
            data.column_values = columnValues
        },
        [columnValues]
    );
    const reactFlowInstance = useReactFlow();

    return (
        <div className="csv-data-import-node">
            <IconButton aria-label="delete" style={{float:'right',vertical_align: 'top',padding:'0px'}} size="small" onClick={(event) => onEdgeClick(event, id,reactFlowInstance)}>
                <HighlightOffIcon fontSize="inherit" />
            </IconButton>
            <Typography variant="h6" component="div" gutterBottom>
                <div>Salesforce CRM import from: Region 1 Stick purchased British Columbia</div>
            </Typography>



                <Handle
                type="source"
                position={Position.Right}
                id="a"
            />
            <div className="row-cols-1">
                {/*<div className="row">*/}
                {/*    <Button variant="outlined" onClick={onButtonClick}>Select File</Button>*/}
                {/*    <input type='file' id='file' ref={inputFile} onChange={handleUpdate} style={{display: 'none'}}/>*/}

                {/*</div>*/}
                <div className="row">
                <TextField  label="company name header" className="text-input-field" type="text" disabled value={columnKeys}  />
                </div>
                    <div className="row">
                <TextField label="input value header" className="text-input-field" type="text" disabled value={columnValues}  />
                    </div>
            </div>
        </div>
    );
};

export default DummySalesforceImport;