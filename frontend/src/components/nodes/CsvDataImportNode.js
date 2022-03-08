import React, {useEffect, useRef, useState} from 'react';
import  { Handle, Position,useStoreState  } from 'react-flow-renderer';
import Button from '@material-ui/core/Button';
import '../../css/custom_nodes.css'
import '../../css/dnd.css'
import TextField from "@material-ui/core/TextField";



const CsvDataImportNode = ({ data }) => {
    const inputFile = useRef(null);
    const [fileName, setFileName] = useState(data.csv_name);//TODO hook this up to data and default "None Selected"
    const [columnKeys, setColumnKeys] = useState(data.column_keys);
    const [columnValues, setColumnValues] = useState(data.column_values);

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

    return (
        <div className="csv-data-import-node">
            <div>CSV Data Import From {fileName}</div>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                style={{ borderRadius: 0 }}
            />
            <div className="row-cols-1">
                <div className="row">
                    <Button variant="outlined" onClick={onButtonClick}>Select File</Button>
                    <input type='file' id='file' ref={inputFile} onChange={handleUpdate} style={{display: 'none'}}/>

                </div>
                <div className="row">
                <TextField className="text-input-field" type="text" value={columnKeys} onChange={handleColumnKeysChange} placeholder={"company name header"}/>
                </div>
                    <div className="row">
                <TextField className="text-input-field" type="text" value={columnValues} onChange={handleColumnValuesChange} placeholder={"associated data header"}/>
                    </div>
            </div>
        </div>
    );
};

export default CsvDataImportNode;