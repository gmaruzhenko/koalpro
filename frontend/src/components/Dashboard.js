import React, {useEffect, useState} from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid as Grid } from 'react-window';
import '../css/dnd.css';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";


const Dashboard = () => {

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const updateWidthAndHeight = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };
    useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    });


    const Cell = ({ columnIndex, rowIndex, style }) => (
        <div style={style}>
            Item {rowIndex},{columnIndex}
        </div>
    );
    return (
        <div className="dashboard">
            <Grid
                columnCount={3}
                columnWidth={200}
                height={height}
                rowCount={1000}
                rowHeight={35}
                width={width}
            >
                {Cell}
            </Grid>
        </div>
    );
};
export default Dashboard