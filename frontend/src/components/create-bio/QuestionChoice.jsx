import {useState } from 'react';

import {Box} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


function QuestionChoice({label, question, isPrivate, options, changeAnswer, visible}) {

    // ********************* Variables & Functions **********************

    var [selection, setSelection] = useState('');

    const handleSelectionChange = (event) => {
        setSelection(event.target.value);
        changeAnswer(label, [event.target.value]);
    }


    // ********************* Styling **********************

    const selectStyle = {
        '& .MuiSelect-select': {
            paddingTop: '10px',
            paddingBottom: '10px',
        },
        '&:hover:not(.Mui-focused):not(.Mui-error) fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.2)',
        },
    }

    const menuStyle = {
        slotProps: {
            paper: {
                sx: {
                    borderRadius: '4px',
                    width: '320px',
                    display: 'flex',
                    flexDirection: 'column',
                    '& ul': {
                        display: 'flex',
                        flexDirection: 'column',
                        '& li': {
                            minHeight: '43px',
                            paddingTop: '0px',
                            paddingBottom: '0px',
                        },
                        '& .MuiTouchRipple-root': {
                            display: 'none',
                        },
                    },
                },
            }
        },
    }

    return (
        <Box display = {visible ? 'block' : 'none'}>
            <Box fontSize = '17px' marginBottom={isPrivate ? '12px' : '18px'}>
                <Box>
                    {question}
                </Box>
                {isPrivate ? (
                    <Box color = 'gray' fontSize = '14px'>
                        Only you will see the answer to this question
                    </Box>
                ): ""}
            </Box>
            <Select
                id='bio-gender'
                fullWidth
                sx = {selectStyle}
                MenuProps = {menuStyle}
                value = {selection}
                onChange = {handleSelectionChange}
            >
                {options.map( (opt, index) => (
                    <MenuItem key = {index} value = {opt}>
                        {opt}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    )
}

export default QuestionChoice;