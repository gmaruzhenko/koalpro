import {v4 as uuid} from "uuid";

const getId = () => {
    const unique_id = uuid();
    return `dndnode_${unique_id}`
};
const defaultStartNodes = [
    {
        id: getId(),
        type: 'cross_sell_output',
        data: {
            label: "cross_sell_output node"
        },
        position: {x: 250, y: 0},
    }];
export default defaultStartNodes;