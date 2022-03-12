import { Grid } from '@mui/material';
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({children}: React.PropsWithChildren<{}>) => {
  return (
      <div style={{ backgroundColor: 'var(--color-gray-6)'}}>
          <Navbar />
            <Grid container display='flex' justifyContent='center' style={{ overflowX: 'hidden' }}>
              <Grid item sm={12}>
                {children}
              </Grid>
            </Grid>
          <Footer />
      </div>
  )
};

export default Layout;
