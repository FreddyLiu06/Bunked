import {useEffect, useState} from 'react';
import {Box} from '@mui/material';
import Slider from '@mui/material/Slider';


function QuestionRange({label, question, marks, min, max, isPrivate, changeAnswer, visible}) {

    // ********************* Variables & Functions **********************

    const [range, setRange] = useState([min, max]);

    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
          return;
        }
        
        var newRange;

        if (activeThumb === 0) {
            newRange = [Math.min(newValue[0], range[1] - min), range[1]];
        } else {
            newRange = [range[0], Math.max(newValue[1], range[0] + min)];
        }
        
        setRange(newRange);
        changeAnswer(label, range);
    };
    
    useEffect(() => {
        changeAnswer(label, range);
    }, [range]);

    const setLabel = (value) => {
        if (label === 'sleep') {
            return getSleepLabel(value);
        } else {
            return value;
        }
    };

    const getSleepLabel = (value) => {
        const hours = value === 0 ? 8 : value === 15 ? 11 : value + 8;
        const period = hours >= 12 ? 'am' : 'pm';
        const formattedHours = hours > 12 ? hours - 12 : hours;
      
        return `${formattedHours}${period}`;
    };

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
                    value={range}
                    onChange={handleChange}
                    marks={marks}
                    min={min}
                    max={max}
                    valueLabelDisplay='auto'
                    valueLabelFormat={(value) => setLabel(value)}
                    disableSwap
                />

            </Box> 
        </Box>
        
    )
}

export default QuestionRange;