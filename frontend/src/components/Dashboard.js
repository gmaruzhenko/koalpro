import React from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import '../css/dnd.css';


const Dashboard = () => {
    const Row = ({ index, style }) => (
        <div className={index % 2 ? "list-item-odd" : "list-item-even"} style={style}>
            <label> Company name {index} </label>
            <label> $$$  {index*100}</label>
        </div>
    );
    return (
        <div className="dashboard">
        <AutoSizer>
            {({ height, width }) => (
                <List
                    className="List"
                    height={height}
                    itemCount={1000}
                    itemSize={35}
                    width={width}
                >
                    {Row}
                </List>
            )}
        </AutoSizer>
        </div>
    );
};
export default Dashboard