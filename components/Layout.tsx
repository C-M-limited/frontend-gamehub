import { Grid } from '@mui/material';
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({children}: React.PropsWithChildren<{}>) => {
  return (
      <div>
          <Navbar />
            <Grid container display='flex' justifyContent='center'>
              <Grid item sm={8}>
                {children}
              </Grid>
            </Grid>
          <Footer />
      </div>
  )
};

export default Layout;
