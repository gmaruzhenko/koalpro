import defaultStartNodes from "./defaultStartNodes";
import {getConnectedEdges} from "react-flow-renderer";



function deleteNodeHelper (reactFlowInstance,id){
    let afterNodes = reactFlowInstance.getNodes().filter(node => node.id!== id);
    let edgesToDeleteIds = getConnectedEdges(reactFlowInstance.getNodes().filter(node => node.id=== id), reactFlowInstance.getEdges()).map(edge=>edge.id);//TODO this part works but setting it doest correctly work
    // console.log(edgesToDeleteIds)
    const afterEdges = reactFlowInstance.getEdges().filter(function (edge) {
        return edgesToDeleteIds.indexOf(edge.id) === -1;
    });
    // console.log("after edges are")
    // console.log(afterEdges)
    if (reactFlowInstance.getNodes().length===1){
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
}
export default deleteNodeHelper;