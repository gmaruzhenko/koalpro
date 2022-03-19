import React, {useEffect} from 'react';
import ReactFlow ,{useReactFlow} from 'react-flow-renderer';
import {
    getBezierPath,
    getEdgeCenter,
    getMarkerEnd,
} from 'react-flow-renderer';


const foreignObjectSize = 40;

const onEdgeClick = (evt, id,reactFlowInstance) => {
    evt.stopPropagation();
    let after_edges = reactFlowInstance.getEdges().filter(edges => edges.id!== id);
    if (reactFlowInstance.getEdges().length===1){
        reactFlowInstance.setEdges([{}]);

    }else{
        reactFlowInstance.setEdges(after_edges);

    }

};

export default function ButtonEdge({
                                       id,
                                       sourceX,
                                       sourceY,
                                       targetX,
                                       targetY,
                                       sourcePosition,
                                       targetPosition,
                                       style = {},
                                       arrowHeadType,
                                       markerEndId,
                                   }) {
    const reactFlowInstance = useReactFlow();

    const edgePath = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });



    const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
    const [edgeCenterX, edgeCenterY] = getEdgeCenter({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <foreignObject
                width={foreignObjectSize}
                height={foreignObjectSize}
                x={edgeCenterX - foreignObjectSize / 2}
                y={edgeCenterY - foreignObjectSize / 2}
                className="edgebutton-foreignobject"
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <body>
                <button
                    className="edgebutton"
                    onClick={(event) => onEdgeClick(event, id,reactFlowInstance)}
                >
                    ×
                </button>
                </body>
            </foreignObject>
        </>
    );
}