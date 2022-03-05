import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';
import {useState} from "react";
import {useEffect} from "react";
import axios from 'axios';



const styles = (theme) => ({
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    table: {
        // temporary right-to-left patch, waiting for
        // https://github.com/bvaughn/react-virtualized/issues/454
        '& .ReactVirtualized__Table__headerRow': {
            ...(theme.direction === 'rtl' && {
                paddingLeft: '0 !important',
            }),
            ...(theme.direction !== 'rtl' && {
                paddingRight: undefined,
            }),
        },
    },
    tableRow: {
        cursor: 'pointer',
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
    },
    noClick: {
        cursor: 'initial',
    },
});




class MuiVirtualizedTable extends React.PureComponent {
    static defaultProps = {
        headerHeight: 48,
        rowHeight: 48,
    };

    getRowClassName = ({ index }) => {
        const { classes, onRowClick } = this.props;

        return clsx(classes.tableRow, classes.flexContainer, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };

    cellRenderer = ({ cellData, columnIndex }) => {
        const { columns, classes, rowHeight, onRowClick } = this.props;
        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{ height: rowHeight }}
                align={
                    (columnIndex != null && columns[columnIndex].numeric) || false
                        ? 'right'
                        : 'left'
                }
            >
                {cellData}
            </TableCell>
        );
    };
// TODO use https://github.com/bvaughn/react-virtualized/blob/2e962d8f8aebc22cb1168a8d147bcaa1d27aa326/docs/multiColumnSortTable.md if want to pivot on columns
    headerRenderer = ({ label, columnIndex }) => {
        const { headerHeight, columns, classes } = this.props;

        return (
            <TableCell
                component="div"
                className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{ height: headerHeight }}
                align={columns[columnIndex].numeric || false ? 'right' : 'left'}
            >
                <span>{label}</span>
            </TableCell>
        );
    };

    render() {
        const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Table
                        height={height}
                        width={width}
                        rowHeight={rowHeight}
                        gridStyle={{
                            direction: 'inherit',
                        }}
                        headerHeight={headerHeight}
                        className={classes.table}
                        {...tableProps}
                        rowClassName={this.getRowClassName}
                    >
                        {columns.map(({ dataKey, ...other }, index) => {
                            return (
                                <Column
                                    key={dataKey}
                                    headerRenderer={(headerProps) =>
                                        this.headerRenderer({
                                            ...headerProps,
                                            columnIndex: index,
                                        })
                                    }
                                    className={classes.flexContainer}
                                    cellRenderer={this.cellRenderer}
                                    dataKey={dataKey}
                                    {...other}
                                />
                            );
                        })}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}

MuiVirtualizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            dataKey: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            numeric: PropTypes.bool,
            width: PropTypes.number.isRequired,
        }),
    ).isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowHeight: PropTypes.number,
};

const defaultTheme = createTheme();
const VirtualizedTable = withStyles(styles, { defaultTheme })(MuiVirtualizedTable);

// ---


const sampledata = [
    {
        "companyID": "Apple",
        "cross_sell_value": 1000,
        "up_sell_value": 2000

    },
    {
        "companyID": "Microsoft",
        "cross_sell_value": 2000,
        "up_sell_value": 5000

    },
    {
        "companyID": "Tesla",
        "cross_sell_value": 3000,
        "up_sell_value": 1000

    },
    {
        "companyID": "Google",
        "cross_sell_value": 4000,
        "up_sell_value": 8000

    },
    {
        "companyID": "Urmom",
        "cross_sell_value": 5000,
        "up_sell_value": 69000

    }
];

// const rows = [...sampledata,...sampledata,...sampledata,...sampledata,...sampledata];
// function createData(id, dessert, calories, fat, carbs, protein) {
//     return { id, dessert, calories, fat, carbs, protein };
// }
//
// const rows = [];
//
// for (let i = 0; i < 200; i += 1) {
//     const randomSelection = sample[Math.floor(Math.random() * sample.length)];
//     rows.push(createData(i, ...randomSelection));
// }

export default function Dashboard() {


    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [dashData, setDashData] = useState([]);
    const updateWidthAndHeight = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };
    const numberOfColumns = 3;

    useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    });


    axios.get('http://127.0.0.1:5000/data/crosssell')
        .then(function (response) {
            // handle success
            setDashData(response.data);
        });





    return (
        <Paper style={{ height: 400, width: '100%' }}>
            <VirtualizedTable
                rowCount={dashData.length}
                rowGetter={({ index }) => dashData[index]}
                columns={[
                    {
                        width: width/numberOfColumns,
                        label: 'Company Name',
                        dataKey: 'companyID',
                    },
                    {
                        width:  width/numberOfColumns,
                        label: 'Cross-Sell Value',
                        dataKey: 'cross_sell_value',
                        numeric: true,
                    },
                    {
                        width:  width/numberOfColumns,
                        label: 'Up-Sell Value',
                        dataKey: 'up_sell_value',
                        numeric: true,
                    },

                ]}
            />
        </Paper>
    );
}
