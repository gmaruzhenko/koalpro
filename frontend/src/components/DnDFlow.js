import React, { useState, useRef } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    removeElements,
    Controls,
} from 'react-flow-renderer';

import Button from 'react-bootstrap/Button';


import Sidebar from './Sidebar';

import '../css/dnd.css';
import CustomNodeExample from "./CustomNodeExample";

const initialElements = [
    {
        id: '1',
        type: 'input',
        data: { label: 'input node' },
        position: { x: 250, y: 5 },
    },
];
//TODO decide on formal of config
function flow_elements_to_config (elements) {
    return {name:"king",age:elements,city:"New York"}

}
//TODO once format decided do reverse transformation
function config_to_flow_elements (config) {
    return {name:"king",age:config,city:"New York"}

}

const flowStyles = { height: 800 };


let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState(initialElements);
    const onConnect = (params) => setElements((els) => addEdge(params, els));
    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));

    const onLoad = (_reactFlowInstance) =>
        setReactFlowInstance(_reactFlowInstance);

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
    // const BasicFlow = () => <ReactFlow elements={elements} style={flowStyles} />;


    return (
        <div className="row-cols-2">
            <div className="dndflow">
                <ReactFlowProvider>
                    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                        <ReactFlow elements={elements}
                                   onElementsRemove={onElementsRemove}
                                   onLoad={onLoad}
                                   onDrop={onDrop}
                                   onDragOver={onDragOver}
                                   onConnect={onConnect}
                                   style={flowStyles} />
                    </div>

                <Sidebar/>
                </ReactFlowProvider>
                <button className="primary" onClick={() => console.log(flow_elements_to_config(elements))}>Primary</button>

            </div>

            <CustomNodeExample style={flowStyles}/>

        </div>

    );
};

export default DnDFlow;