const demodayRestoreState = {
    "nodes": [
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
            "id": "dndnode_6829fc25-69fe-4eec-baf8-c66a793ce395",
            "type": "DummySalesforceImport",
            "position": {
                "x": 34.14374494827491,
                "y": 188.0695224135203
            },
            "data": {
                "label": "DummySalesforceImport node",
                "csv_name": "../../resources/Region 1 British Columbia Current purchased sticks.csv",
                "column_keys": "Company Name",
                "column_values": "Number of Sticks Sold"
            },
            "positionAbsolute": {
                "x": 34.14374494827491,
                "y": 188.0695224135203
            },
            "z": 0,
            "handleBounds": {
                "source": [
                    {
                        "id": "a",
                        "position": "right",
                        "x": 252.0000278650151,
                        "y": 55.50005088681185,
                        "width": 14,
                        "height": 14
                    }
                ],
                "target": null
            },
            "width": 262,
            "height": 125,
            "selected": false,
            "dragging": false
        },
        {
            "id": "dndnode_3c351a0e-28a7-4c73-bb74-1bb4fdaa94a1",
            "type": "cross_sell_output",
            "position": {
                "x": 1078.8159456587905,
                "y": 243.15983923263002
            },
            "data": {
                "label": "cross_sell_output node"
            },
            "positionAbsolute": {
                "x": 1078.8159456587905,
                "y": 243.15983923263002
            },
            "z": 0,
            "handleBounds": {
                "source": null,
                "target": [
                    {
                        "id": null,
                        "position": "left",
                        "x": -3.999914411536319,
                        "y": 39.50004356723257,
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
            "id": "dndnode_d30bb0f7-80fc-43b0-b4e9-539b35317895",
            "type": "discount",
            "position": {
                "x": 727.0721771295006,
                "y": 31.805393268382204
            },
            "data": {
                "label": "discount node",
                "discount": 0.1
            },
            "positionAbsolute": {
                "x": 727.0721771295006,
                "y": 31.805393268382204
            },
            "z": 0,
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
            "selected": false,
            "dragging": false
        },
        {
            "id": "dndnode_8e501957-700d-4d73-99a5-dec4f62ae71a",
            "type": "csv_data_import",
            "position": {
                "x": 37.64279393169373,
                "y": 341.5182005725437
            },
            "data": {
                "label": "csv_data_import node",
                "csv_name": "../../resources/Region 2 Alberta Current purchased sticks.csv",
                "column_keys": "Company Name",
                "column_values": "Number of Sticks Sold"
            },
            "positionAbsolute": {
                "x": 37.64279393169373,
                "y": 341.5182005725437
            },
            "z": 0,
            "handleBounds": {
                "source": [
                    {
                        "id": "a",
                        "position": "right",
                        "x": 252,
                        "y": 121.75,
                        "width": 14,
                        "height": 14
                    }
                ],
                "target": null
            },
            "width": 262,
            "height": 258,
            "selected": false,
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
        }
    ],
    "edges": [
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
    ],
    "viewport": {
        "x": 59.532033010614214,
        "y": 144.84514253688883,
        "zoom": 0.7236346238225786
    }
};
export default demodayRestoreState;
