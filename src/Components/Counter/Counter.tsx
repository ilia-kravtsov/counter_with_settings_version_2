import React from 'react';
import s from "../../App.module.css";

type CounterType = {
    final_image: string | number
    final_image_style: string
    onClickInc: () => void
    onClickRes: () => void
    onClickSet: () => void
    counterDisplay: string
    disabledInc: boolean
    disabledRes: boolean
    disabledSet: boolean
    counterStyle: string
    incBtnStyle: string
    resBtnStyle: string
    setBtnStyle: string
}

const Counter = (p: CounterType) => {
    return (
        <div className={p.counterStyle}>
            <div className={p.counterDisplay}>
                <div className={p.final_image_style}>{p.final_image}</div>
            </div>
            <div className={s.counterButtons}>
                <div onClick={p.onClickInc}>
                    <button disabled={p.disabledInc} className={p.incBtnStyle}>inc</button>
                </div>
                <div onClick={p.onClickRes}>
                    <button disabled={p.disabledRes} className={p.resBtnStyle}>reset</button>
                </div>
                <div onClick={p.onClickSet}>
                    <button disabled={p.disabledSet} className={p.setBtnStyle}>set</button>
                </div>
            </div>
        </div>
    );
};

export default Counter;