import { Grid, Paper } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const data = [
  {
    url: "play_station",
    src: "/play_station_logo.png",
    width: 180,
    height: 150
  },
  {
    url: "x_box",
    src: "/xbox_logo.png",
    width: 200,
    height: 120
  },
  {
    url: "nintendo",
    src: "/nintendo_logo.png",
    width: 200,
    height: 150
  }
]

const StyledButtonList = () => {
  return (
    <Grid container spacing={2}>
      {
        data.map((item, key)=>(
          <Grid item sm={4}  key={key}>
            <Paper style={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
              <Link href={`/console_brand/${item.url}`} passHref>
                <Image 
                  src={item.src}
                  layout="intrinsic"
                  height={item.height}
                  width={item.width}
                  alt={"Brand Image"}
                />
              </Link>
            </Paper>
          </Grid>
        ))
      }
    </Grid>
  );
};

export default StyledButtonList;
