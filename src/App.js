//import { useState } from 'react';
import { useState } from 'react';
import styles from './app.module.css';

export const App = () => {
    const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
    numbers.push(0);
    const operators = ['+', '-', '=', 'C'];
    const [inputValue, setInputValue] = useState('');
    const [operator, setOperator] = useState('');
    const [calc, setCalc] = useState('');
    const [sum, setSum] = useState(0);
    const [isResult, setIsResult] = useState(false);

    const handleInput = (newValue) => {
        const isOperator = operators.some((operator) => {
            return operator === newValue;
        });
        const isArithmeticSign = newValue === '+' || newValue === '-';

        if (newValue === '=') {
            setIsResult(true);
        } else {
            setIsResult(false);
        }

        if (!isOperator) {
            setInputValue(inputValue + newValue);
            setCalc(calc + String(newValue));
        } else if (isArithmeticSign) {
            if (inputValue.slice(-1) === '-' || inputValue.slice(-1) === '+') {
            } else {
                if (newValue === '+') {
                    setOperator('+');
                    setSum(sum + Number(calc));
                    setCalc('');
                    setInputValue(inputValue + newValue);
                } else if (newValue === '-') {
                    setOperator('-');
                    if (sum === 0) {
                        setSum(Number(calc));
                    } else {
                        setSum(sum - Number(calc));
                    }
                    setCalc('');
                    setInputValue(inputValue + newValue);
                }
            }
        } else if (newValue === '=') {
            if (operator === '+') {
                const quickSum = sum + Number(calc);
                setInputValue(quickSum);
                setCalc('');
                setSum(quickSum);
            } else if (operator === '-') {
                const quickSum = sum - Number(calc);
                setInputValue(quickSum);
                setCalc('');
                setSum(quickSum);
            }
        } else if (newValue === 'C') {
            setInputValue('');
            setCalc(0);
            setSum(0);
        }
    };

    return (
        <div className={styles['app-container']}>
            <div className={styles['input-container']}>
                <input
                    className={`${styles['input-container__input']} ${isResult ? styles['input-container__input--result'] : styles['input-container__input--default']}`}
                    readOnly
                    value={inputValue}
                ></input>
            </div>
            <div className={styles['numbers-container']}>
                {numbers.map((number, index) => (
                    <div
                        key={index}
                        className={
                            number === 0
                                ? styles['numbers-container__item-zero']
                                : styles['numbers-container__item']
                        }
                    >
                        <button
                            className={styles['buttons']}
                            onClick={() => handleInput(number)}
                        >
                            {number}
                        </button>
                    </div>
                ))}
            </div>
            <div className={styles['operators-container']}>
                {operators.map((operator, index) => (
                    <div key={index} className={styles.operator}>
                        <button
                            onClick={() => handleInput(operator)}
                            className={styles.buttons}
                        >
                            {operator}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
