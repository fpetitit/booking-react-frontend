import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SlotService from '../services/SlotService';

const Slots = () => {
  useEffect(() => {
    SlotService.fetchSlots().then(res => {
      if (res.status === 200 || res.status === 201) {
        debugger
      } else {
        debugger
      }
    });
  });

  return <React.Fragment>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          React User Application
        </Typography>
      </Toolbar>
    </AppBar>
    <Container maxWidth="sm">
      <Typography variant="h4" style={styles.center}>Slots</Typography>
      TOTO
    </Container>
  </React.Fragment>;
}

const styles = {
  center: {
    display: 'flex',
    justifyContent: 'center'

  },
  notification: {
    display: 'flex',
    justifyContent: 'center',
    color: '#dc3545'
  }
}

export default Slots;