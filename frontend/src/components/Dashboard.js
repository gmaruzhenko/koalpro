import React, {useEffect, useState} from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid as Grid } from 'react-window';
import '../css/dnd.css';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";


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
        <div className="container">
            <TableHead rowSpan={2}>
                <TableRow >
                    <TableCell>Desc</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="center">Fat&nbsp;(g)</TableCell>
                    <TableCell align="left">Carbs&nbsp;(g)</TableCell>
                </TableRow>
            </TableHead>
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