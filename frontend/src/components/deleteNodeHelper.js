import defaultStartNodes from "./defaultStartNodes";



function deleteNodeHelper (reactFlowInstance,id){
    let after_edges = reactFlowInstance.getNodes().filter(node => node.id!== id);

    if (reactFlowInstance.getNodes().length===1){
        reactFlowInstance.setNodes(defaultStartNodes);

    }else{
        reactFlowInstance.setNodes(after_edges);

    }
}
export default deleteNodeHelper;