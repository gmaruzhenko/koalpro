import React, {useState, useRef, useCallback, useEffect, useContext} from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    getConnectedEdges
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
import defaultStartNodes from "./defaultStartNodes";
import ProductNode from "./nodes/ProductNode";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import deleteNodeHelper from "./deleteNodeHelper";
import DummySnowflakeDBImport from "./nodes/DummySnowflakeDBImport";
import DummySalesforceImport from "./nodes/DummySalesforceImport";
import demodayRestoreState from "./demodayRestoreState";

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

const demodayUpsell = [
    {
        "id": "dndnode_9f15f029-4f62-4277-a5ed-0b43a3174f8e",
        "type": "up_sell_output",
        "position": {
            "x": 1056.6486731290977,
            "y": 43.27583995731925
        },
        "data": {
            "label": "up_sell_output node"
        },
        "positionAbsolute": {
            "x": 1056.6486731290977,
            "y": 43.27583995731925
        },
        "z": 0,
        "handleBounds": {
            "source": null,
            "target": [
                {
                    "id": null,
                    "position": "left",
                    "x": -3.999989987640066,
                    "y": 39.50002764584759,
                    "width": 14,
                    "height": 14
                }
            ]
        },
        "width": 262,
        "height": 93,
        "selected": false,
        "dragging": false
    },
    {
        "id": "dndnode_fff70f53-6877-46e2-bdd0-bfae25aa75aa",
        "type": "DummySnowflakeDBImport",
        "position": {
            "x": 19.129133229104553,
            "y": 10.458725565096074
        },
        "data": {
            "label": "DummySnowflakeDBImport node",
            "csv_name": "../../resources/Worldwide Current purchased sticks.csv",
            "column_keys": "Company Name",
            "column_values": "Budget Stick Sales"
        },
        "positionAbsolute": {
            "x": 19.129133229104553,
            "y": 10.458725565096074
        },
        "z": 0,
        "handleBounds": {
            "source": [
                {
                    "id": "a",
                    "position": "right",
                    "x": 252.00000181083385,
                    "y": 71.49994754696812,
                    "width": 14,
                    "height": 14
                }
            ],
            "target": null
        },
        "width": 262,
        "height": 157,
        "selected": false,
        "dragging": false
    },
    {
        "id": "dndnode_d30bb0f7-80fc-43b0-b4e9-539b35317895",
        "type": "discount",
        "position": {
            "x": 729.0721771295006,
            "y": 43.805393268382204
        },
        "data": {
            "label": "discount node",
            "discount": 0.1
        },
        "positionAbsolute": {
            "x": 729.0721771295006,
            "y": 43.805393268382204
        },
        "z": 1000,
        "handleBounds": {
            "source": [
                {
                    "id": "a",
                    "position": "right",
                    "x": 252.00001601640966,
                    "y": 47.50000564796327,
                    "width": 14,
                    "height": 14
                }
            ],
            "target": [
                {
                    "id": "input_1",
                    "position": "left",
                    "x": -3.9999981510309945,
                    "y": 47.50000564796327,
                    "width": 14,
                    "height": 14
                }
            ]
        },
        "width": 262,
        "height": 109,
        "selected": true,
        "dragging": false
    },
    {
        "id": "dndnode_9a2452c5-3fdb-496f-9cd2-77c3cecf0693",
        "type": "product",
        "position": {
            "x": 366,
            "y": 25.1875
        },
        "data": {
            "label": "product node",
            "product": [
                {
                    "unit_price": 10,
                    "product_name": "Stick"
                }
            ]
        },
        "positionAbsolute": {
            "x": 366,
            "y": 25.1875
        },
        "z": 0,
        "handleBounds": {
            "source": [
                {
                    "id": "a",
                    "position": "right",
                    "x": 252,
                    "y": 55.5,
                    "width": 14,
                    "height": 14
                }
            ],
            "target": [
                {
                    "id": "input_1",
                    "position": "left",
                    "x": -4,
                    "y": 55.5,
                    "width": 14,
                    "height": 14
                }
            ]
        },
        "width": 262,
        "height": 125,
        "selected": false,
        "dragging": false
    },
    {
        "source": "dndnode_d30bb0f7-80fc-43b0-b4e9-539b35317895",
        "sourceHandle": "a",
        "target": "dndnode_9f15f029-4f62-4277-a5ed-0b43a3174f8e",
        "targetHandle": null,
        "type": "button_edge",
        "id": "reactflow__edge-dndnode_d30bb0f7-80fc-43b0-b4e9-539b35317895a-dndnode_9f15f029-4f62-4277-a5ed-0b43a3174f8e"
    },
    {
        "source": "dndnode_9a2452c5-3fdb-496f-9cd2-77c3cecf0693",
        "sourceHandle": "a",
        "target": "dndnode_d30bb0f7-80fc-43b0-b4e9-539b35317895",
        "targetHandle": "input_1",
        "type": "button_edge",
        "id": "reactflow__edge-dndnode_9a2452c5-3fdb-496f-9cd2-77c3cecf0693a-dndnode_d30bb0f7-80fc-43b0-b4e9-539b35317895input_1"
    },
    {
        "source": "dndnode_fff70f53-6877-46e2-bdd0-bfae25aa75aa",
        "sourceHandle": "a",
        "target": "dndnode_9a2452c5-3fdb-496f-9cd2-77c3cecf0693",
        "targetHandle": "input_1",
        "type": "button_edge",
        "id": "reactflow__edge-dndnode_fff70f53-6877-46e2-bdd0-bfae25aa75aaa-dndnode_9a2452c5-3fdb-496f-9cd2-77c3cecf0693input_1"
    }
]

//TODO decide on formal of config
function flow_elements_to_config(elements) {

    console.log(elements)
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


const getId = () => {
    const unique_id = uuid();
    return `dndnode_${unique_id}`
};


const nodeTypes = {
    addition: AdditionNode,
    cross_sell_output: CrossSellOutputNode,
    up_sell_output: UpSellOutputNode,
    csv_data_import: CsvDataImportNode,
    discount: DiscountNode,
    product: ProductNode,
    DummySnowflakeDBImport: DummySnowflakeDBImport, //TODO wire up dummy snowflake
    DummySalesforceImport:DummySalesforceImport,

};

const edgeTypes = {
    button_edge: ButtonEdge,
};


const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(defaultStartNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [restoreFlag, setRestoreFlag] = useState(false);
    const [openUnconnectedNodeDialog, setOpenUnconnectedNodeDialog] = React.useState(false);
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
                    const elements = response.data;
                    const nodesLoaded = elements.filter(elements => !elements.source);
                    const edgesLoaded = elements.filter(elements => elements.source);
                    setNodes(nodesLoaded);
                    setEdges(edgesLoaded);
                });
        },
        [restoreFlag]
    );

    const onConnect = (params) => setEdges((eds) => addEdge({...params, type: 'button_edge'}, eds));

    const onInit = (_reactFlowInstance) =>
        setReactFlowInstance(_reactFlowInstance);

    const onSave = () => {
        if (getUnconnectedNodes().length > 0) {
            setOpenUnconnectedNodeDialog(true)
        } else {
            const cleanedEdges = reactFlowInstance.getEdges().filter(function(edge){
                return edge.type !== undefined}); // workaround the {} edges from button edge last edge removal
            let nodes = reactFlowInstance.toObject().nodes;
            // nodes.forEach(function (node) {
            //     if (node.type === "DummySnowflakeDBImport" || "DummySalesforceImport") {
            //         console.log(node.data)
            //         node.data.label = "csv_data_import node"
            //     }
            // });
            flow_elements_to_config([...nodes, ...cleanedEdges])
        }

    };

    function getUnconnectedNodes() {
        let unconnectedNodes = [];
        reactFlowInstance.getNodes().forEach(function (node) {
            let sources = node.handleBounds.source;
            let targets = node.handleBounds.target;
            if (sources === null) {
                sources = []
            }
            if (targets === null) {
                targets = []
            }

            const numEdgesShouldBeConnected = sources.length + targets.length;
            if (getConnectedEdges([node], reactFlowInstance.getEdges()).length < numEdgesShouldBeConnected) {
                unconnectedNodes.push(node);
            }
        });
        return unconnectedNodes
    }

    const onRestartDemo = () => {
        //    console.log(reactFlowInstance.toObject())
        config_to_flow_elements(demodayUpsell);
        setNodes(demodayRestoreState.nodes);
        setEdges(demodayRestoreState.edges);

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

    const onDrop = (event) => {
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
            data: {label: `${type} node`,},
        };

        setNodes((nds) => nds.concat(newNode));
    };


    const handleClose = () => {
        setOpenUnconnectedNodeDialog(false);
    };
    const handleAutoRemoveUnconnectedNodesClose = () => {
        const nodesToDelete = getUnconnectedNodes();
        const nodesToDeleteIds = nodesToDelete.map(n => n.id);

        let afterEdges = reactFlowInstance.getEdges().filter(edge => nodesToDeleteIds.indexOf(edge.source) === -1 || nodesToDeleteIds.indexOf(edge.target) === -1);
        console.log(afterEdges);
        const afterNodes = reactFlowInstance.getNodes().filter(function (node) {
            return nodesToDeleteIds.indexOf(node.id) === -1;
        });
        console.log(afterNodes);

        if (afterNodes.length===0){
            reactFlowInstance.setNodes(defaultStartNodes);
            reactFlowInstance.setEdges([{}]);
            // console.log(reactFlowInstance.getEdges())

        }else if (afterEdges.length ===0){
            reactFlowInstance.setNodes(afterNodes);
            reactFlowInstance.setEdges([{}]);
        }
        else{
            reactFlowInstance.setNodes(afterNodes);
            reactFlowInstance.setEdges(afterEdges);
        }
        setOpenUnconnectedNodeDialog(false);
    };


    return (
        <Paper style={{height: '100%', width: '100%'}}>
            <div className="dndflow">


                <Dialog
                    open={openUnconnectedNodeDialog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Some Nodes still not connected, did you mean to connect them?"}
                    </DialogTitle>
                    <DialogActions style={{justifyContent: "center"}}>
                        {/*<RestoreButton onClick={handleAutoRemoveUnconnectedNodesClose}>Remove unconnected nodes for me*/}
                        {/*    and Save</RestoreButton>*/}
                        <SaveButton onClick={handleClose} autoFocus>
                            Take me back to editor without saving to review
                        </SaveButton>
                    </DialogActions>
                </Dialog>

                <ReactFlowProvider>
                    <Grid item xs={9} style={{display: "grid", alignItems: "stretch"}}>
                        <div className="reactflow-wrapper" ref={reactFlowWrapper}
                             style={{height: 'flex', width: 'flex'}}>
                            <ReactFlow nodes={nodes}
                                       edges={edges}
                                       onNodesChange={onNodesChange}
                                       onEdgesChange={onEdgesChange}
                                       onConnect={onConnect}
                                       onDrop={onDrop}
                                       onDragOver={onDragOver}
                                       style={flowStyles}
                                       edgeTypes={edgeTypes}
                                       nodeTypes={nodeTypes}
                                       onInit={setReactFlowInstance}
                                       nodesDraggable={true}/>
                        </div>
                        <Controls/>
                    </Grid>
                    <Grid item xs={3} style={{display: "grid", alignItems: "stretch"}}>
                        <Paper elevation={10}>
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <SaveButton variant="outlined" onClick={onSave}>save</SaveButton>
                                <ClearButton onClick={onRestartDemo}>RestartDemo</ClearButton>
                                <RestoreButton onClick={onRestore}>restore</RestoreButton>
                            </ButtonGroup>
                            <Sidebar nodes={nodes}/>
                        </Paper>
                    </Grid>

                </ReactFlowProvider>
            </div>
        </Paper>

    );
};

export default DnDFlow;