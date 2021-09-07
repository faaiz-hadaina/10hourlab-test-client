import React from 'react';

function Container(props: any) {
  return (
    <div
      style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}
    >
      {props.children}
    </div>
  );
}

export default Container;
