import React, {useEffect, useRef, useState} from 'react';
import  { Handle, Position,useStoreState  } from 'react-flow-renderer';
import '../../css/custom_nodes.css'


const CsvDataImportNode = ({ data }) => {
    const inputFile = useRef(null);
    const [fileName, setFileName] = useState(data.csv_name);//TODO hook this up to data and default "None Selected"
    // const nodes = useStoreState((state) => state.nodes);

    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };
    const handleUpdate = event => setFileName(event.target.value);

    useEffect(() => {
            data.csv_name = fileName
        },
        [fileName]
    );
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
            <input type='file' id='file' ref={inputFile} onChange={handleUpdate} style={{display: 'none'}}/>
        </div>
    );
};

export default CsvDataImportNode;