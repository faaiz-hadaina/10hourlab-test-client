import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));
function Index(props: any) {
  const StyledSelect = styled(Select)`
    background-color: #fff;
    border-radius: 7px;
    width: ${props.width ? props.width + 'px' : 'auto'};
    height: ${props.height ? props.height : 50}px;
  `;
  const [selectvalue, setSelectValue] = React.useState('Select');
  const classes = useStyles();

  const handleChange = (value: any) => {
    setSelectValue(value);
    props.handleChange(value);
  };
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <StyledSelect
        // labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={selectvalue}
        onChange={(e: any) => handleChange(e.target.value)}
        //  label="Age"
      >
        <MenuItem value="Select">Select</MenuItem>
        {props.data.map((element: any, index: number) => (
          <MenuItem key={index} value={element}>
            {element}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
}

export default Index;
