import {useState, useEffect} from 'react';

import {Box} from '@mui/material';
import Slider from '@mui/material/Slider';

function QuestionSlider({label, question, marks, min, max, isPrivate, changeAnswer, visible}) {

    // const tempMarks = [
    //     {
    //         value: 66,
    //         label: '66°F',
    //     },
    //     {
    //         value: 71,
    //         label: '71°F',
    //     },
    //     {
    //         value: 76,
    //         label: '76°F',
    //     },
    // ]

    var [value, setValue] = useState((min + max) / 2);

    const handleValueChange = (event, newValue) => {
        setValue(newValue);
    }

    useEffect(() => {
        changeAnswer(label, value);
    }, [value])

    return(
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
            <Box paddingLeft='13px' paddingRight='13px'>
                <Slider
                    defaultValue={(min + max) / 2}
                    step={1}
                    valueLabelDisplay='auto'
                    marks={marks}
                    min={min}
                    max={max}
                    value = {value}
                    onChange = {handleValueChange}
                />
            </Box>
        </Box>
        
    )
}

export default QuestionSlider;