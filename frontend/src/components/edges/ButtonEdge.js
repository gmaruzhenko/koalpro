import React, {useEffect} from 'react';
import ReactFlow, {useStore,} from 'react-flow-renderer';
import {
    getBezierPath,
    getEdgeCenter,
    getMarkerEnd,
} from 'react-flow-renderer';


const foreignObjectSize = 40;

const onEdgeClick = (evt, id, data) => {
    evt.stopPropagation();
    data.remove(id);
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
                                       data,
                                       arrowHeadType,
                                       markerEndId,
                                   }) {
    const edgePath = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const store = useStore();
    const nodeInternals= store.getState(); //Todo see if this can be the ticket to edit react flow isntance from the node child

    useEffect(() => {
        console.log(nodeInternals);
    }, []);


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
                    onClick={(event) => onEdgeClick(event, id, data)}
                >
                    ×
                </button>
                </body>
            </foreignObject>
        </>
    );
}