import React, {useState, useRef, useCallback, useEffect, useContext} from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
} from 'react-flow-renderer';
import axios from 'axios';
import {v4 as uuid} from 'uuid';
import Button from '@material-ui/core/Button';
import Sidebar from './Sidebar';
import styled from '@material-ui/core/styles/styled'
import '../css/dnd.css';
import AdditionNode from "./nodes/AdditionNode";
import CrossSellOutputNode from "./nodes/CrossSellOutputNode";
import CsvDataImportNode from "./nodes/CsvDataImportNode";
import ButtonEdge from "./edges/ButtonEdge"

import ButtonGroup from "@material-ui/core/ButtonGroup";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import UpSellOutputNode from "./nodes/UpSellOutputNode";
import DiscountNode from "./nodes/DiscountNode";

const navy_color = '#444c5c';
const ocean_color = '#78a5a3';
const warmorange_color = '#e1b16a';
const redpunch = '#ce5a57';
const greenery_color = '#6fb98f';


const SaveButton = styled(Button)(({theme}) => ({
    color: theme.palette.getContrastText(ocean_color),
    backgroundColor: ocean_color,
    '&:hover': {
        backgroundColor: warmorange_color,
    },
}));

const ClearButton = styled(Button)(({theme}) => ({
    color: theme.palette.getContrastText(ocean_color),
    backgroundColor: ocean_color,
    '&:hover': {
        backgroundColor: redpunch,
    },
}));
const RestoreButton = styled(Button)(({theme}) => ({
    color: theme.palette.getContrastText(ocean_color),
    backgroundColor: ocean_color,
    '&:hover': {
        backgroundColor: greenery_color,
    },
}));


//TODO decide on formal of config
function flow_elements_to_config(elements) {
    elements.forEach(function (node, index, myArray) {
        if (node.type === undefined) {
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
function config_to_flow_elements(config) {
    return config

}

const flowStyles = {height: 800};


let id = 0;
const getId = () => {
    const unique_id = uuid();
    return `dndnode_${unique_id}`
};
const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: { label: 'input node' },
        position: { x: 250, y: 5 },
    },
];

const nodeTypes = {
    addition: AdditionNode,
    cross_sell_output: CrossSellOutputNode,
    up_sell_output: UpSellOutputNode,
    csv_data_import: CsvDataImportNode,
    discount: DiscountNode,

};

const edgeTypes = {
    button_edge: ButtonEdge,
};

const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [elements, setElements] = useState([]);
    const [restoreFlag, setRestoreFlag] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const updateWidthAndHeight = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    useEffect(() => {
            axios.get('http://127.0.0.1:5000/config')
                .then(function (response) {
                    // handle success
                    setElements(response.data);
                });
        },
        [restoreFlag]
    );

    const onConnect = (params) => setEdges((eds) => addEdge(params, eds))


    const deleteEdge = (edge_id) => {
        let edge = {};
        reactFlowInstance.toObject().elements.forEach(function (node) {
            if (node.id == edge_id) {
                edge = node
                console.log(node);
            }
        });
        console.log(edge)
    };

    const onInit = (_reactFlowInstance) =>
        setReactFlowInstance(_reactFlowInstance);

    const onSave = () => {
        flow_elements_to_config(reactFlowInstance.toObject().elements)
    };

    const onClear = () => {
        setNodes([]);
        setEdges([]);
    };
    const onRestore = () => {
        setNodes([]);
        setEdges([]); //TODO this a janky way of making it work but smoother way of matching positions should be possible
        setRestoreFlag(!restoreFlag)
    };


    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop =(event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

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

            setNodes((nds) => nds.concat(newNode));
        };




    return (
        <Paper style={{height: '100%', width: '100%'}}>
            <div className="dndflow">
                <ReactFlowProvider>
                    <Grid item xs={9} style={{display: "grid", alignItems: "stretch"}}>
                        <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{height: '800px', width: '800px'}}>
                            <ReactFlow nodes={nodes}
                                       edges={edges}
                                       onNodesChange={onNodesChange}
                                       onEdgesChange={onEdgesChange}
                                       onConnect={onConnect}
                                       onInit={setReactFlowInstance}
                                       onDrop={onDrop}
                                       onDragOver={onDragOver}
                                       style={flowStyles}
                                       edgeTypes={edgeTypes}
                                       nodeTypes={nodeTypes}
                                       onInit={onInit}
                                       nodesDraggable ={true}/>
                        </div>
                        <Controls />
                    </Grid>
                    <Grid item xs={3} style={{display: "grid", alignItems: "stretch"}}>
                        <Paper elevation={10}>
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <SaveButton variant="outlined" onClick={onSave}>save</SaveButton>
                                <ClearButton onClick={onClear}>clear</ClearButton>
                                <RestoreButton onClick={onRestore}>restore</RestoreButton>
                            </ButtonGroup>
                            <Sidebar />
                        </Paper>
                    </Grid>

                </ReactFlowProvider>
            </div>
        </Paper>

    );
};

export default DnDFlow;