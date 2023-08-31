import {useState } from 'react';

import {Box, TextField} from '@mui/material';
import Chip from '@mui/material/Chip';


function QuestionTextbox({label, multiple, question, isPrivate, changeAnswer, visible}) {

    let [textList, setTextList] = useState([]);
    let [textInput, setTextInput] = useState("");

    const addTextInput = () => {
        if (textInput.trim() !== '') {
            var newList = textList.concat(textInput)
            if (!multiple) {
                newList = [textInput];
            }
            setTextList(newList);
            updateAnswer(newList)
            setTextInput("");
        }
    }

    const deleteItem = (i) => {
        let tmp = [...textList];
        tmp.splice(i, 1);
        setTextList(tmp);
        updateAnswer(tmp);
    }

    const updateAnswer = (ans) => {
        changeAnswer(label, ans);
    }

    // ********************* Styling **********************

    const textBoxStyle = {
        '& input': {
            padding: '12px 10px',
        },
        '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.05)',
            backgroundColor: '#D9D9D91A',
        },
        '& label': {
            top: '-4px',
        },
        '.MuiInputLabel-shrink': {
            top: '0px',
            left: '1px',
        },
        '& .MuiOutlinedInput-root': {
            '&:hover:not(.Mui-focused):not(.Mui-error) fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.2)',
            },
        },
        '& p': {
            marginTop: '1px',
            fontSize: '11px',
        },
        maxHeight: '47px',
    }

    const textChipStyle = {
        marginTop: '10px',
        marginRight: '6px',
    }

    return (
        <Box display = {visible ? 'block' : 'none'}>
            <Box fontSize = '17px' marginBottom={isPrivate ? '10px' : '18px'}>
                <Box>
                    {question}
                </Box>
                {isPrivate ? (
                    <Box color = 'gray' fontSize = '14px'>
                        Only you will see the answer to this question
                    </Box>
                ): ""}
            </Box>

            <TextField
                fullWidth
                sx = {textBoxStyle}
                onChange = {(e) => {
                    setTextInput(e.target.value);
                }}
                onKeyDown = {(e) => {
                    (e.key === "Enter") && addTextInput();
                }}
                value = {textInput}
            />

            {textList.length === 0 ? (
                <Box marginTop = {'10px'} color = 'grey'>
                    Press enter to update
                </Box>
            ) : ""}

            <Box paddingLeft = '3px'>
                {textList.map((x, key) => (
                        <Chip
                            label={x}
                            key={key}
                            onDelete={() => deleteItem(key)}
                            variant='outlined'
                            size='small'
                            sx={textChipStyle}
                        />
                ))}
            </Box>
        </Box>
    )
}

export default QuestionTextbox;