import Box from '@mui/material/Box';
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({children}: React.PropsWithChildren<{}>) => {
  return (
      <div style={{ backgroundColor: 'var(--color-gray-6)'}}>
          <Navbar />
            <Box overflow='hidden'>
              {children}
            </Box>
          <Footer />
      </div>
  )
};

export default Layout;
