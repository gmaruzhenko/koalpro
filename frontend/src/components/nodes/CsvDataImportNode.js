import React, {useEffect, useRef, useState} from 'react';
import  { Handle, Position } from 'react-flow-renderer';
import '../../css/custom_nodes.css'


const CsvDataImportNode = ({ data }) => {
    const inputFile = useRef(null);
    const [fileName, setFileName] = useState("None Selected");//TODO hook this up to data
    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };
    useEffect(() => {
        setFileName(inputFile.current.value);
    });

    return (
        <div className="csv_data_import_node">
            <div>CSV Data Import From {fileName}</div>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                style={{ borderRadius: 0 }}
            />
            <button onClick={onButtonClick}>Open file upload window</button>
            <input type='file' id='file' ref={inputFile} style={{display: 'none'}}/>
        </div>
    );
};

export default CsvDataImportNode;