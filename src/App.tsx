import * as React from 'react';
import FakeTopBar from './View/Components/FakeTopBar';
import Dialog from './View/Shared/DateDialog';
import AppContainer from './View/Shared/Containers/AppContainer.styled';
import ReportCard from './View/Components/ReportCard';
import ChartCard from './View/Components/ChartCard';
import BodyContainer from './View/Shared/Containers/BodyContainer';
import Header from './View/Components/Header';
import Container from './View/Shared/Containers/Container';

function App() {
  return (
    <AppContainer>
      <Dialog />
      <FakeTopBar />
      <BodyContainer>
        <Header />
        <Container>
          <ReportCard />
          <ChartCard />
        </Container>
      </BodyContainer>
    </AppContainer>
  );
}

export default App;
