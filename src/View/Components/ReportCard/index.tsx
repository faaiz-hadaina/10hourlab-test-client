import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReportContainer from '../../Shared/Containers/ReportContainer';
import ViewContainer from '../../Shared/Containers/ViewContainer';
import Select from '../Select';
import { loadFilter, toggleDialog } from '../../../Actions';

function Index() {
  const dispatch = useDispatch();
  const filterData = ['Last 7 Days', 'Custom'];
  const selectedFilter = useSelector((state: any) => state.dashboardFilter);
  const selectedCategory = useSelector((state: any) => state.selectedCategory);
  const currentResponse = useSelector(
    (state: any) => state.currentResponseReport
  );
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [totalParam1, setTotalParam1] = useState(0);
  const [totalParam2, setTotalParam2] = useState(0);
  const [paramLabel1, setparamLabel1] = useState('Savings');
  const [paramLabel2, setparamLabel2] = useState('Chequings');

  function processResults(category: string, dateType: number) {
    let type1,
      type2,
      objType1,
      objType2 = '';

    if (category === 'Accounts') {
      type1 = 'savings';
      type2 = 'cheque';
      objType1 = 'Savings';
      objType2 = 'Chequings';
    } else if (category === 'Transactions') {
      type1 = 'credit';
      type2 = 'debit';
      objType1 = 'Credit';
      objType2 = 'Debit';
    }
    const filtered = currentResponse.response.data[category];
    const param1 = filtered.filter((item: any) => item.type === type1);
    const param2 = filtered.filter((item: any) => item.type === type2);
    setTotalParam1(param1.length);
    setTotalParam2(param2.length);
    setparamLabel1(objType1);
    setparamLabel2(objType2);
    setTotalAccounts(filtered.length);
  }

  useEffect(() => {
    if (
      currentResponse &&
      currentResponse.response.data[currentResponse.requestType].length > 0
    ) {
      processResults(currentResponse.requestType, currentResponse.dateType);
    }
  }, [currentResponse]);

  const handleReportFilter = (value: any) => {
    switch (value) {
      case 'Select':
        // dispatch(loadReportFilter(''));
        break;
      case 'Custom':
        dispatch(toggleDialog(true, 1));
        break;
      default:
        dispatch(loadFilter(value, 1, 1));
        break;
    }
  };
  return selectedCategory !== 'Sessions' && selectedCategory ? (
    <ReportContainer color="#e4effd">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Select
          height={30}
          data={filterData}
          handleChange={handleReportFilter}
        />

        <ViewContainer>
          <span style={{ fontWeight: 500 }}>
            {selectedCategory ? 'Total ' + selectedCategory : ''}
          </span>
          <span style={{ fontSize: 15, fontWeight: 300 }}>
            {selectedFilter}
          </span>
        </ViewContainer>
      </div>
      <div
        style={{
          height: '50vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ViewContainer>
          <span style={{ fontSize: 20, fontWeight: 200 }}>
            All {selectedCategory}
          </span>
          <span style={{ fontSize: 50, fontWeight: 600 }}>{totalAccounts}</span>
        </ViewContainer>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <ViewContainer>
          <span style={{ fontSize: 20, fontWeight: 200 }}>{paramLabel1}</span>
          <span style={{ fontSize: 40, fontWeight: 600, color: '#8884d8' }}>
            {totalParam1}
          </span>
        </ViewContainer>
        <ViewContainer>
          <span style={{ fontSize: 20, fontWeight: 200 }}>{paramLabel2}</span>
          <span style={{ fontSize: 40, fontWeight: 600, color: '#82ca9d' }}>
            {totalParam2}
          </span>
        </ViewContainer>
      </div>
    </ReportContainer>
  ) : null;
}

export default Index;
