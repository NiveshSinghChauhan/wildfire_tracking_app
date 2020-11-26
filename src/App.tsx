import Icon from '@iconify/react';
import {
  CircularProgress,
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import FireAlertIcon from '@iconify/icons-mdi/fire-alert';
import GithubIcon from '@iconify/icons-mdi/github';
import './App.scss';
import Map from './components/Map';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoding] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoding(true);

    const response = await fetch(
      'https://eonet.sci.gsfc.nasa.gov/api/v2.1/events'
    );
    const { events } = await response.json();

    setData(events);
    setLoding(false);
  };

  return (
    <>
      {loading ? (
        <div className='loadingContainer'>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Card elevation={3} className='AppTitleCard'>
            <CardContent>
              <Typography
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '10px',
                }}
                variant='h5'
                gutterBottom
                component='h1'>
                <Icon
                  color='red'
                  style={{ fontSize: '30px' }}
                  icon={FireAlertIcon}
                />
                Wildfire Traking App
              </Typography>
              <Typography component='p' variant='caption'>
                Click on the fire icon (
                <Icon color='red' icon={FireAlertIcon} />) to see the detail
                about that wildfire
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                component='a'
                size='small'
                startIcon={<Icon icon={GithubIcon} />}>
                Github Repository
              </Button>
            </CardActions>
          </Card>
          <Map eventData={data} />
        </>
      )}
    </>
  );
}

export default App;
