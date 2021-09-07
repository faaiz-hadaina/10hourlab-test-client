import React from 'react';

function BodyContainer(props: any) {
  return (
    <div
      style={{
        display: 'flex',
        padding: '20px',
        flexDirection: 'column',
        height: '80vh',
        justifyContent: 'space-between'
      }}
    >
      {props.children}
    </div>
  );
}

export default BodyContainer;
