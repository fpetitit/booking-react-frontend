import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AuthService from '../services/AuthService';
import SlotService from '../services/SlotService';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import * as R from 'ramda';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const Slots = () => {
  const [slots, setSlots] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    Promise.all([SlotService.fetchSlots(), AuthService.fetchUserInfos()]).then((values) => {
      setSlots(values[0].data);
      setCurrentUser(values[1].data);
    });
  }, []);

  const bookSlot = slotId => {
    SlotService.bookSlot(slotId).then((res, error) => {
      if (error) {
        // TODO
        return;
      }
      setSlots(res.data);
    })
  }

  const unbookSlot = slotId => {
    SlotService.unbookSlot(slotId).then((res, error) => {
      if (error) {
        // TODO
        return;
      }
      setSlots(res.data);
    })
  }

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
      {slots && <TableContainer component={Paper}>
        <Table sx={{ minWidth: 800 }} size="small" aria-label="slots">
          <TableHead>
            <TableRow>
              <TableCell align="right">Start time</TableCell>
              <TableCell align="right">Room name</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slots.map((slot) => (
              <TableRow
                key={slot.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{slot.start_time}</TableCell>
                <TableCell align="right">{slot.room_name}</TableCell>
                <TableCell align="right">{R.isNil(slot.user_id) | slot.user_id === '' ? <Button size="small" onClick={() => { bookSlot(slot.id) }} variant="contained">Book</Button> : slot.user_id == currentUser.userId ? <Button size="small" onClick={() => { unbookSlot(slot.id) }} variant="contained">Unbook</Button> : <Button disabled size="small" onClick={() => { }} variant="contained">Unavailable</Button>}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </Container>
  </React.Fragment >;
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