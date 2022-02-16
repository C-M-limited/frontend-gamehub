import { Grid } from '@mui/material';
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({children}: React.PropsWithChildren<{}>) => {
  return (
      <div>
          <Navbar />
            <Grid container display='flex' justifyContent='center' bgcolor="#000">
              <Grid item sm={10}>
                {children}
              </Grid>
            </Grid>
          <Footer />
      </div>
  )
};

export default Layout;
