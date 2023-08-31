// import {forwardRef, useImperativeHandle, useEffect, useState} from 'react';
// import './CreateBioQuestion.css';
// import InputList from "../input-list/InputList";
// import MultiSlider from '../multi-slider/MultiSlider';


// const CreateBioQuestion = forwardRef(({question, bio, className}, ref) => {
    
//     useImperativeHandle(ref, () => ({
//         getAns() {
//             return ans;
//         },
//         getListAns() {
//             return listAns;
//         },
//         getSkip() {
//             return skip;
//         },
//         setSkip(op) {
//             setSkip(op);
//         }
//     }));

//     var [ans, setAns] = useState("");
//     var [listAns, setListAns] = useState([]);
//     var [input, setInput] = useState("");
//     var [skip, setSkip] = useState(false);

//     useEffect(() => {
//         if (question.structure === 'options' && !question.multiple 
//         && question.options.length > 0) {
//             if (question.type === 'string') {
//                 setAns(question.options[0])
//             } else if (question.type === 'number') {
//                 setAns(question.options.length);
//             }
//         }

//     }, []);

//     var addInput = () => {
//         setListAns(listAns.concat(input));
//         setInput("");
//     }

//     return(
//         <div className = {className}>
//             <div className = "bio-q-str">{question.question}</div>
//             {question.private ?
//                 <div>The answer to this question will not be 
//                     displayed on your profile
//                 </div> : ""
//             }

//             {question.structure === 'options' && question.type === 'string' 
//                 && !question.multiple ?
//                 <select id="string-options"
//                     className = "form-select form-select-md"
//                     onChange = {(e) => setAns(e.target.value)}>
//                     {question.options.map((o, key) => <option key = {key}>{o}</option>)}
//                 </select> : ""
//             }

//             {question.multiple && question.structure === 'input' ?
//                 <div>
//                     <input className = 'form-control'
//                         onChange = {(e) => {
//                             setInput(e.target.value);
//                         }}
//                         onKeyDown = {(e) => {
//                             e.key === "Enter" && addInput();
//                         }}
//                         value = {input}
//                         type = "text"
//                     />
//                     <div>
//                         <InputList
//                             listName = {question.param}
//                             list = {listAns}
//                             setList = {setListAns}
//                         />
//                     </div>
//                 </div> : ""
//             }

//             {question.structure === 'options' && question.type === 'number' ? 
//                  (  <div className = "slider-container">
//                         <div className = "slider-tag-left">
//                             <span>
//                             {question.options[0]}
//                             </span>
//                         </div>
//                         <div className = "slider-wrapper">
//                             <input  type = "range" 
//                                     min = {1} 
//                                     max = {question.options.length}
//                                     onChange = {(e) => setAns(e.currentTarget.value) } 
//                                     list = "stepList"
//                             />
//                             <datalist id = "stepList">
//                                 {question.options.map((x, key) => (<option label = {(key + 1).toString()} key = {key}>{key == 0 ? "" : key+1}</option>))}
//                             </datalist>
//                         </div>
//                         <div className = "slider-tag-right">
//                             <span>
//                                 {question.options[question.options.length - 1]}
//                             </span>
//                         </div>
//                     </div>
//                  ) :
//                  ""
//             }

//             {!question.multiple && question.structure === 'input' ? 
//                 <div>
//                     <input 
//                         className = "form-control"
//                         onChange = {(e) => {
//                             setAns(e.target.value);
//                         }}
//                         value = {ans}
//                         type = "text"
//                     />
//                 </div>: ""
//             }

//             {question.structure === 'sleepSpecial' ? 
//                 (
//                     // <div className = "slider-container">
//                     //     <div className = "slider-tags">
//                     //         {question.options[0]}
//                     //     </div>
//                     //     <div className = "slider-wrapper">
//                     //         <input type = "range" min = {1} max = {12}
//                     //         onChange = {(e) => setAns(e.currentTarget.value) } list = "clockList"/>
                            
//                     //         <datalist id = "clockList">
//                     //             {("12,1,2,3,4,5,6,7,8,9,10,11,12".split(',')).map((x, key) => (<option label = {x}key = {key}>{x}</option>))}
//                     //         </datalist>

//                     //         <input className = "slider-reversed" type = "range" min = {1} max = {24}/>
                            
//                     //         <datalist id = "clockList">
//                     //             {("12,1,2,3,4,5,6,7,8,9,10,11,12".split(',')).map((x, key) => (<option label = {x} key = {key}>{x}</option>))}
//                     //         </datalist>

//                     //     </div>
//                     //     <div className = "slider-tags">
//                     //         {question.options[question.options.length - 1]}
//                     //     </div>
//                     // </div>

//                     <MultiSlider
//                     min={7}
//                     max={24}
//                     onChange={({ min, max }) => {
//                         var tmp = [min, max];
//                         setListAns(tmp);
//                     }}
//                   />
//                 ) :
//                 ""
//             }
//         </div>
//     );
// });

// export default CreateBioQuestion;

