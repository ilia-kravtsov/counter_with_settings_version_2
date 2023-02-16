import React, {useState, MouseEvent, useEffect, ChangeEvent} from 'react';
import s from './App.module.css';

type stateBtnSetType = 'Settings' | 'Counter' | ''

function App() {

    let [stateCounter, setStateCounter] = useState<number>(0)
    let [minValue, setMinValue] = useState<number>(0)
    let [maxValue, setMaxValue] = useState<number>(5)
    let [stateBtnSet, setStateBtnSet] = useState<stateBtnSetType>('')
    let [displayCounter, setDisplayCounter] = useState<number | string>('')

    useEffect(() => {

        let valueAsString = localStorage.getItem('counterValue')
        if (valueAsString) {
            let newValue = JSON.parse(valueAsString)
            setStateCounter(newValue)
        }

        let newStartValue = localStorage.getItem('minValue')
        if (newStartValue) {
            let newValue = JSON.parse(newStartValue)
            setMinValue(newValue)
        }

        let newMaxValue = localStorage.getItem('maxValue')
        if (newMaxValue) {
            let newValue = JSON.parse(newMaxValue)
            setMaxValue(newValue)
        }

    }, [])

    useEffect(() => {
        localStorage.setItem('counterValue', JSON.stringify(stateCounter))
    }, [stateCounter])

    const onClickInc = () => {
        if(stateCounter === maxValue) return
        setStateCounter(stateCounter+1)
    }
    const onClickRes = () => {setStateCounter(minValue)}

    const onClickSet = () => {
        setStateBtnSet('Settings')
    }

    const onClickSetSettings = () => {
        setStateBtnSet('Counter')
        let newMaxValue = localStorage.getItem('maxValue')
        if (newMaxValue) {
            let newValue = JSON.parse(newMaxValue)
            setStateCounter(newValue)
        }
        let newStartValue = localStorage.getItem('minValue')
        if (newStartValue) {
            let newValue = JSON.parse(newStartValue)
            setStateCounter(newValue)
            setDisplayCounter(newValue)
        }
    }

    const onChangeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
        let event = +e.currentTarget.value
        setMaxValue(event)
        if (event < 0) {
            setDisplayCounter('Incorrect value!')
        }
        localStorage.setItem('maxValue', JSON.stringify(event))
    }

    const onChangeStartValue = (e: ChangeEvent<HTMLInputElement>) => {
        let event = +e.currentTarget.value
        setMinValue(event)
        if (event < 0) {
            setDisplayCounter('Incorrect value!')
        }
        localStorage.setItem('minValue', JSON.stringify(event))
    }

    const maxArrowUpClick = () => {
        setMaxValue(maxValue+1)
        if (maxValue < 0) {
            setDisplayCounter('Incorrect value!')
        }
        localStorage.setItem('maxValue', JSON.stringify(maxValue+1))
    }

    const maxArrowDownClick = () => {
        setMaxValue(maxValue-1)
        if (maxValue < 0) {
            setDisplayCounter('Incorrect value!')
        }
        localStorage.setItem('maxValue', JSON.stringify(maxValue-1))
    }

    const minArrowUpClick = () => {
        setMinValue(minValue+1)
        if (minValue < 0) {
            setDisplayCounter('Incorrect value!')
        }
        localStorage.setItem('minValue', JSON.stringify(minValue+1))
    }

    const minArrowDownClick = () => {
        setMinValue(minValue-1)
        if (minValue < 0) {
            setDisplayCounter('Incorrect value!')
        }
        localStorage.setItem('minValue', JSON.stringify(minValue-1))
    }


    let counterStyle = s.container
    let counterDisplay = s.counterDisplay
    let settingsStyle = s.disabledAll
    let settingsDisplay = s.settingsDisplay
    let incBtnStyle = `${s.incBtn} ${s.pointer}`
    let resBtnStyle = `${s.resBtn} ${s.pointer}`
    let setBtnStyle = `${s.setBtn} ${s.pointer}`
    let final_image: string | number = stateCounter
    let final_image_style = s.finalImageDefault
    let inputMinStyle = s.startInput
    let inputMaxStyle = s.maxInput
    let disabledSet = false
    let disabledInc = false
    let disabledRes = false

    if (stateCounter === minValue) {
        resBtnStyle = `${s.resBtn} ${s.disabled}`
        disabledRes = true
    }

    if (stateCounter === maxValue) {
        incBtnStyle = `${s.incBtn} ${s.disabled}`
        disabledInc = true
        counterDisplay = `${s.counterDisplay} ${s.red}`
    }

    if (stateBtnSet === 'Settings') {
        counterStyle = s.disabledAll
        settingsStyle = s.settings
    }

    if (stateBtnSet === 'Counter') {
        settingsStyle = s.disabledAll
        counterStyle = s.container
    }

    if (minValue < 0) {
        displayCounter = 'Incorrect value!'
        setBtnStyle = `${s.setBtn} ${s.disabled}`
        disabledSet = true
        inputMinStyle = `${s.startInput} ${s.startInputLessThenZero}`
    }

    if (maxValue < 0) {
        displayCounter = 'Incorrect value!'
        disabledSet = true
        setBtnStyle = `${s.setBtn} ${s.disabled}`
        inputMaxStyle = `${s.maxInput} ${s.startInputLessThenZero}`
    }

    if (minValue >= maxValue) {
        displayCounter = 'Incorrect value!'
        disabledSet = true
        setBtnStyle = `${s.setBtn} ${s.disabled}`
        inputMinStyle = `${s.startInput} ${s.startInputLessThenZero}`
        inputMaxStyle = `${s.maxInput} ${s.startInputLessThenZero}`
    }

    if (displayCounter === 'Incorrect value!') {
        final_image = displayCounter
        final_image_style = s.finalImageLessZero
        disabledInc = true
        disabledRes = true
        resBtnStyle = `${s.resBtn} ${s.disabled}`
        incBtnStyle = `${s.incBtn} ${s.disabled}`
    }

    return (
        <div className={s.App}>
            <div className={counterStyle}>
                <div className={counterDisplay}>
                    <div className={final_image_style}>{final_image}</div>
                </div>
                <div className={s.counterButtons}>
                    <div onClick={onClickInc}>
                        <button disabled={disabledInc} className={incBtnStyle}>inc</button>
                    </div>
                    <div onClick={onClickRes}>
                        <button disabled={disabledRes} className={resBtnStyle}>reset</button>
                    </div>
                    <div onClick={onClickSet}>
                        <button disabled={disabledSet} className={setBtnStyle}>set</button>
                    </div>
                </div>
            </div>
            <div className={settingsStyle}>
                <div className={settingsDisplay}>
                    <div className={s.maxBlock}>
                        <div>
                            <span className={s.maxSpan}>max value : </span>
                            <input value={maxValue} onChange={onChangeMaxValue} type="number" className={inputMaxStyle}/>
                        </div>
                        <div className={s.arrows}>
                            <button onClick={maxArrowUpClick} className={s.arrowUp}>↑</button>
                            <button onClick={maxArrowDownClick} className={s.arrowDown}>↓</button>
                        </div>
                    </div>
                    <div className={s.minBlock}>
                        <div>
                            <span className={s.startSpan}>start value :</span>
                            <input value={minValue} onChange={onChangeStartValue} type="number"className={inputMinStyle}/>
                        </div>
                        <div className={s.arrows}>
                            <button onClick={minArrowUpClick} className={s.arrowUp}>↑</button>
                            <button onClick={minArrowDownClick} className={s.arrowDown}>↓</button>
                        </div>
                    </div>
                </div>
                <div className={s.settingsButtoms}>
                    <div onClick={onClickSetSettings}>
                        <button disabled={disabledSet} className={setBtnStyle}>set</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
