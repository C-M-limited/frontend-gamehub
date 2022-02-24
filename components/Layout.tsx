import { Grid } from '@mui/material';
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({children}: React.PropsWithChildren<{}>) => {
  return (
      <div style={{ background: 'url(/body-background.png)', backgroundSize: 'cover'}}>
          <Navbar />
            <Grid container display='flex' justifyContent='center' minHeight="100vh">
              <Grid item sm={10}>
                {children}
              </Grid>
            </Grid>
          <Footer />
      </div>
  )
};

export default Layout;
