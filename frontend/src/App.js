import React from "react";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import DnDFlow from "./components/DnDFlow";
import KoalproLogo from './images/logo.svg';
import Dashboard from "./components/Dashboard";
import Grid from "@material-ui/core/Grid";


const App = () => {
    const [tabValue, setTabValue] = React.useState(0);
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                    <img src={KoalproLogo} alt="React Logo" style={{width: 200}}/>
                </Grid>
                <Grid item xs={6} md={8}>
                    <h2>Koalpro Sales Data Hub</h2>
                </Grid>
            </Grid>
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
