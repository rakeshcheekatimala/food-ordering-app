import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Typography } from '@material-ui/core';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function AddressTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="address tabs">
          <Tab label="EXISTING ADDRESS" {...a11yProps(0)} />
          <Tab label="NEW ADDRESS" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      {value === 0 && <Typography>EXISTING ADDRESS</Typography>}
      {value === 1 && <Typography>ADDRESS</Typography>}
    </>
  );
}

export default AddressTabs;
