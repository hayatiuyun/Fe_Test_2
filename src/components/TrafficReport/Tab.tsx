import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function TrafficTab({menus, value, onChange }: {menus: any[], value: number, onChange: (newValue: string) => void}) {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    onChange(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="primary tabs example"
      >
        {/* <Tab value="one" label="Item One" />*/}
        {menus.map((menu, index) => (
          <Tab key={index} value={index} label={menu.payment_method} />
        ))}

      </Tabs>
    </Box>
  );
}
