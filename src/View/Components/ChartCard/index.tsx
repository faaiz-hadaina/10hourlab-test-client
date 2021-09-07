import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chart from '../Chart';
import ReportContainer from '../../Shared/Containers/ReportContainer';
import ViewContainer from '../../Shared/Containers/ViewContainer';
import Select from '../Select';
import Map from '../Map/Index';

import { loadFilter, toggleDialog, changeChartType } from '../../../Actions';

function Index() {
  const dispatch = useDispatch();
  const filterData = ['Last 7 Days', 'Custom'];
  const graphtypeData = ['Graph 1', 'Graph 2'];
  const selectedCategory = useSelector((state: any) => state.selectedCategory);

  const selectedFilter = useSelector((state: any) => state.chartFilter);
  const locations = useSelector((state: any) => state.mapData);

  const handleChartType = (value: any) => {
    switch (value) {
      case 'Graph 1':
        dispatch(changeChartType(1));
        break;
      case 'Graph 2':
        dispatch(changeChartType(2));
        break;
      default:
        // dispatch(loadFilter(value, 1, 2));
        break;
    }
  };

  const handleChartFilter = (value: any) => {
    switch (value) {
      case 'Select':
        // dispatch(loadChartFilter(''));
        break;
      case 'Custom':
        dispatch(toggleDialog(true, 2));
        break;
      default:
        dispatch(loadFilter(value, 1, 2));
        break;
    }
  };
  return selectedCategory ? (
    <ReportContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Select
          height={30}
          data={filterData}
          handleChange={handleChartFilter}
        />
        <ViewContainer>
          <span style={{ fontWeight: 500 }}>
            {selectedCategory ? selectedCategory + '' : ''}
          </span>
          <span style={{ fontSize: 15, fontWeight: 200 }}>
            {selectedFilter}
          </span>
          {selectedCategory === 'Transactions' && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <Select
                data={graphtypeData}
                height={30}
                width={110}
                handleChange={handleChartType}
              />
            </div>
          )}
        </ViewContainer>
      </div>
      <div
        style={{
          height: '35vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {selectedCategory !== 'Sessions' ? (
          <Chart />
        ) : (
          <div style={{ width: '100%', height: '280px', position: 'relative' }}>
            {locations && (
              <Map
                style={{ position: 'absolute', borderRadius: 12 }}
                center={{ lat: 32.7, lng: -117.1 }}
                zoom={-4}
              />
            )}
          </div>
        )}
      </div>
    </ReportContainer>
  ) : null;
}

export default Index;
