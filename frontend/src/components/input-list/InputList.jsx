import {Box} from '@mui/material';
import Chip from '@mui/material/Chip';


function InputList({list, setList}) {

    function deleteItem(i) {
        let tmp = [...list];
        tmp.splice(i, 1);
        setList(tmp);
    }

    const textChipStyle = {
        marginTop: '10px',
        marginRight: '6px',
    }

    return (
        // <div className = "input-list-container">
        // <Box sx = {inputListStyle}>
        //     {/* <div className = "input-list"> */}
        //         {/* {listName + ": "} */}
        //         {list.map((x, key) => (
        //             <><div key = {key} className = "input-list-item-1">
        //                 <div className = "input-list-item-2">
        //                     <div className = "input-list-item-name">{x}</div>
        //                     <div className = "input-list-item-btn" 
        //                         onClick = {() => (deleteItem(key))}>x</div>
        //                 </div>
        //             </div>
        //             <Chip
        //                 label={x}
        //                 onDelete={deleteItem(key)}
        //             />
        //             </>
        //         ))}
        //     {/* </div> */}
        // </Box>
            
        // </div>


        <Box paddingLeft = '3px'>
            {list.map((x, key) => (
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
    )
}

export default InputList;