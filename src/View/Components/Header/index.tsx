import React from 'react';
import Select from '../Select';
import { useSelector, useDispatch } from 'react-redux';
import { loadCategory, loadFilter, toggleDialog } from '../../../Actions';

function Index() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: any) => state.selectedCategory);
  const categoryData = ['Accounts', 'Transactions', 'Sessions'];
  const filterData = ['Last 7 Days', 'Custom'];
  const handleChange = (value: any) => {
    value !== 'Select'
      ? dispatch(loadCategory(value))
      : dispatch(loadCategory(''));
  };

  const handleGenericFilter = (value: any) => {
    switch (value) {
      case 'Select':
        //dispatch(loadGenericFilter(''));
        break;
      case 'Custom':
        dispatch(toggleDialog(true, 0));
        break;
      default:
        dispatch(loadFilter(value, 1, 0));
        break;
    }
  };
  return (
    <div
      style={{
        borderBottom: '1px solid #ccc',
        paddingBottom: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <span> Category: </span>
      <Select data={categoryData} handleChange={handleChange} />
      {selectedCategory ? (
        <Select data={filterData} handleChange={handleGenericFilter} />
      ) : null}

      <div
        style={{
          marginLeft: 'auto'
        }}
      >
        <span style={{ fontSize: 30, fontWeight: 600 }}>
          {selectedCategory}
        </span>
      </div>
    </div>
  );
}

export default Index;
