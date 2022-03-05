import React from "react";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import DnDFlow from "./components/DnDFlow";
import KoalproLogo from './images/logo.svg';
import Dashboard from "./components/Dashboard";


const App = () => {
    const [tabValue, setTabValue] = React.useState(0);
    return (
        <div>
            <div className="row">
                <div className="col">
                    <img src={KoalproLogo} alt="React Logo" style={{width: 200}}/>
                </div>
                <div className="col">

                    <h2>Koalpro Sales Data Hub</h2>
                </div>
            </div>
            <Paper square>
                <Tabs
                    value={tabValue}
                    textColor="primary"
                    indicatorColor="primary"
                    onChange={(event, newValue) => {
                        setTabValue(newValue);
                    }}
                >
                    <Tab label="Dashboard" />
                    <Tab label="No-Code Workflows" />
                </Tabs>
                {/*Display the 2 tabs of contents below */}
                {tabValue==1 && <DnDFlow/>}
                {tabValue!=1&&<Dashboard/>}
            </Paper>
        </div>
    );
};

export default App;
