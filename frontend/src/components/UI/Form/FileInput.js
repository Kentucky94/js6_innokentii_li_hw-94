import React, {createRef, Fragment, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  input: {
    display: 'none'
  }
});

const FileInput = ({onChange, name, label}) => {
  const classes = useStyles();

  const inputRef = createRef();

  const [fileName, setFileName] = useState('');

  const onFileChange = event => {
    console.log(event.target.files[0]);

    if(event.target.files[0]){
      setFileName(event.target.files[0].name)
    }else{
      setFileName('')
    }

    onChange(event);
  };

  const activateInput = () => {
    inputRef.current.click();
  };

  return (
    <Fragment>
      <input
        type="file"
        name={name}
        onChange={onFileChange}
        className={classes.input}
        ref={inputRef}
      />
      <Grid container direction='row' spacing={2} align-items='center'>
        <Grid item xs>
          <TextField
            variant='outlined'
            disabled
            fullWidth
            label={label}
            value={fileName}
          />
        </Grid>
        <Grid item>
          <Button
            variant='contained'
            onClick={activateInput}
          >
            Browse
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default FileInput;