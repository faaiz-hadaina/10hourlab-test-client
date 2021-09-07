import React from 'react';
import Paper from '@material-ui/core/Paper';

function ReportContainer(props: any) {
  return (
    <Paper
      style={{
        height: '50vh',
        width: '40%',
        border: '1px solid #e2e8f0',
        padding: 15,
        backgroundColor: props.color,
        borderRadius: 12,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column'
      }}
      elevation={3}
    >
      {props.children}
    </Paper>
  );
}

export default ReportContainer;
