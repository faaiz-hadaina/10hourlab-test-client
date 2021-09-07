import React from 'react';
import styled from 'styled-components';

const StyledAppContainer = styled.div`
  padding: 20px;
  text-align: center;
`;
function AppContainer(props: any) {
  return <StyledAppContainer>{props.children}</StyledAppContainer>;
}

export default AppContainer;
