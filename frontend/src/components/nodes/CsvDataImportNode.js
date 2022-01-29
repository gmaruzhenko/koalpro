import React from 'react';
import  { Handle, Position } from 'react-flow-renderer';
import '../../css/custom_nodes.css'


const CsvDataImportNode = ({ data }) => {
    return (
        <div className="csv_data_import_node">
            <div>CSV Data Import From {data.import_source_name}</div>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                style={{ borderRadius: 0 }}
            />
        </div>
    );
};

export default CsvDataImportNode;