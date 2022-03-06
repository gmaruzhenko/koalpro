import React, {useState, useRef, useCallback, useEffect} from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    removeElements,
    Controls,
} from 'react-flow-renderer';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import Sidebar from './Sidebar';

import '../css/dnd.css';
import CustomNodeExample from "./CustomNodeExample";
import AdditionNode from "./nodes/AdditionNode";
import CrossSellOutputNode from "./nodes/CrossSellOutputNode";
import CsvDataImportNode from "./nodes/CsvDataImportNode";






//TODO decide on formal of config
function flow_elements_to_config (elements) {
    elements.forEach(function(node, index, myArray) {
        if (node.type===undefined){
            node.type = 'connection'
        }
    });

    axios.post('http://127.0.0.1:5000/config', {
        elements
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    return elements

}
//TODO once format decided do reverse transformation
function config_to_flow_elements (config) {
    return config

}

const flowStyles = { height: 800 };


let id = 0;
const getId = () =>{
    const unique_id = uuid();
    return `dndnode_${unique_id}`};


const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState([]);
    useEffect(() => {
            axios.get('http://127.0.0.1:5000/config')
                .then(function (response) {
                    // handle success
                   setElements(response.data);
                });
        },
        []
    );

    const onConnect = (params) => setElements((els) => addEdge(params, els));
    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));

    const onLoad = (_reactFlowInstance) =>
        setReactFlowInstance(_reactFlowInstance);

    const onSave = () => {
            flow_elements_to_config(reactFlowInstance.toObject().elements)
    };

    const onClear = () => {
        setElements([]);
    };
    



    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (event) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });
        const newNode = {
            id: getId(),
            type,
            position,
            data: { label: `${type} node` },
        };

        setElements((es) => es.concat(newNode));
    };

    const nodeTypes = {
        addition: AdditionNode,
        cross_sell_output: CrossSellOutputNode,
        csv_data_import:CsvDataImportNode

    };



    return (
        <div className="row-cols-2">
            <div className="dndflow">
                <ReactFlowProvider >
                    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                        <ReactFlow elements={elements}
                                   onElementsRemove={onElementsRemove}
                                   onLoad={onLoad}
                                   onDrop={onDrop}
                                   onDragOver={onDragOver}
                                   onConnect={onConnect}
                                   style={flowStyles}
                                   nodeTypes={nodeTypes}/>
                    </div>

                <Sidebar />
                    <div className="save__controls">
                        <button onClick={onSave}>save</button>
                        <button onClick={onClear}>clear</button>
                    </div>
                </ReactFlowProvider>
                {/*<button className="primary" onClick={() => console.log(flow_elements_to_config(elements))}>Click to console log nodes JSON object and send to FLASK</button>*/}

            </div>
        </div>

    );
};

export default DnDFlow;