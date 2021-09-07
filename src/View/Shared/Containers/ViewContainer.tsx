import React from 'react';
import styled from 'styled-components';

const StyledViewContainer = styled.div`
  padding: 0px;
`;
function ViewContainer(props: any) {
  return (
    <StyledViewContainer style={{ display: 'flex', flexDirection: 'column' }}>
      {props.children}
    </StyledViewContainer>
  );
}

export default ViewContainer;
