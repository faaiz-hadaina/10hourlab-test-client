import 'date-fns';
import * as React from 'react';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDialog, selectDate, loadFilter } from '../../../Actions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Index() {
  const dispatch = useDispatch();
  const dialogOpened = useSelector((state: any) => state.dialogOpened);
  const open = dialogOpened ? dialogOpened.type : false;
  const [dateFrom, setDateFrom] = React.useState(new Date(moment.now()));
  const [dateTo, setdateTo] = React.useState(new Date(moment.now()));
  const handleDateFrom = (date: any) => {
    setDateFrom(date);
  };
  const handleDateTo = (date: any) => {
    setdateTo(date);
  };

  const handleClose = () => {
    dispatch(toggleDialog(false, 0));
  };

  const handleSelect = () => {
    dispatch(
      selectDate({
        dateFrom: moment(dateFrom).format('YYYY-MM-DD'),
        dateTo: moment(dateTo).format('YYYY-MM-DD')
      })
    );
    dispatch(toggleDialog(false, 0));
    const value =
      moment(dateFrom).format('DD MMM, YYYY') +
      ' to ' +
      moment(dateTo).format('DD MMM, YYYY');
    dispatch(loadFilter(value, 2, dialogOpened.mode));
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Pick a date range</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-between">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                label="Date from"
                value={dateFrom}
                style={{ marginRight: 10 }}
                onChange={handleDateFrom}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                label="Date to"
                value={dateTo}
                style={{ marginRight: 10 }}
                onChange={handleDateTo}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSelect} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Index;
