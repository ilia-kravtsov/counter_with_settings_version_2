import React, {useState, MouseEvent} from 'react';
import s from './App.module.css';

function App() {

    let [stateCounter, setStateCounter] = useState<number>(0)

    const Max_Value = 5

    let countStyle = s.counterShower
    let incBtnStyle = `${s.increaseButtonBlock} ${s.pointer}`
    let resetBtnStyle = `${s.resetButtonBlock} ${s.pointer}`

    const onClickIncHandler = () => {
        if(stateCounter === Max_Value) return
        setStateCounter(stateCounter+1)
    }
    const onClickResHandler = () => {setStateCounter(0)}

    if(stateCounter === 0) {
        resetBtnStyle = `${s.resetButtonBlock} ${s.disabled}`
    }

    if(stateCounter === Max_Value) {
        incBtnStyle = `${s.increaseButtonBlock} ${s.disabled}`
        countStyle = `${s.counterShower} ${s.red}`
    }

    return (
        <div className={s.App}>
            <div className={s.container}>
                <div className={countStyle}>
                    <div>{stateCounter}</div>
                </div>
                <div className={s.parentIncRes}>
                    <div onClick={onClickIncHandler} className={incBtnStyle}>
                        <div>inc</div>
                    </div>
                    <div onClick={onClickResHandler} className={resetBtnStyle}>
                        <div>reset</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
