import React from 'react';
import PropTypes from 'prop-types';

import TextField from "@material-ui/core/TextField";
import FileInput from "./FileInput";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";

const FormElement = props => {
  let inputChildren = undefined;
  
  let inputComponent = (
    <TextField
      fullWidth
      variant='outlined'
      label={props.title}
      helperText={props.error}
      type={props.type}
      name={props.propertyName} id={props.propertyName}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
      autoComplete={props.autoComplete}
      placeholder={props.placeholder}
      children={inputChildren}
      min={props.min}
    >
      {inputChildren}
    </TextField>
  );

  if(props.type === 'file'){
    inputComponent = (
      <FileInput
        label={props.title}
        name={props.propertyName}
        onChange={props.onChange}
      />
    );
  }

  if(props.type === 'tags'){
    inputComponent = (
      <Autocomplete
        multiple
        options={props.tags}
        onChange={props.onChange}
        value={props.value}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label={props.title} />
        )}
      />
    )
  }

  return inputComponent;
};

FormElement.propTypes = {
  propertyName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  tags: PropTypes.arrayOf(PropTypes.string)
};

export default FormElement;