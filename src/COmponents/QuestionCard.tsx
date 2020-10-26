import React, { useState } from 'react';
import { questionPropsType } from './../Types/quiz_types';

// type questionPropsType = {
//     question:string
//     option:string[]
// }


const QuestionCard: React.FC<questionPropsType> = ({ question, option, callback }) => {
    let [selectedAns, setSelectedAnd] = useState("");

    const handleSelection = (ev: any)=>{
        // console.log(ev.target.value)
        setSelectedAnd(ev.target.value)
    }
    
    
    
    return (
        <div className="question-container">
            <div>
                <h4>{question}</h4>
            </div>
            <form onSubmit={(e:React.FormEvent<EventTarget>)=>callback(e, selectedAns)}
            className="question-form">
                {
                    option.map((opt: string, ind: number) => {
                        return (
                            <div key={ind}>
                                
                            <label className="radio">
                                <input type="radio" name="opt" value={opt} onChange={handleSelection} required checked={selectedAns===opt} />
                                {opt}
                            </label>
                            
                            </div>
                        )
                    })
                }
                <input type="submit" className="submit" />
            </form>
        </div>
    )
}

export default QuestionCard;