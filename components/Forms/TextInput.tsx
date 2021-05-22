import React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

const TextInput = (props: TextFieldProps): JSX.Element => {
    return (
        <TextField
            fullWidth={true}
            label={props.label}
            multiline={props.multiline}
            rows={props.rows}
            value={props.value}
            type={props.type}
            onChange={props.onChange}
        />
    );
};
export default TextInput;
