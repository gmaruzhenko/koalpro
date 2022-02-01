import React from "react";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import DnDFlow from "./components/DnDFlow";

const App = () => {
    const [value, setValue] = React.useState(0);

    return (
        <div

        >
            <h2>How to Create Tabs in ReactJS?</h2>
            <Paper square>
                <Tabs
                    value={value}
                    textColor="primary"
                    indicatorColor="primary"
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <Tab label="Dashboard" />
                    <Tab label="No-Code Workflows" />
                </Tabs>
                {value==1 && <DnDFlow/>}
            </Paper>
        </div>
    );
};

export default App;
