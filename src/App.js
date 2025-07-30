//import { useState } from 'react';
import { useState } from 'react';
import styles from './app.module.css';

export const App = () => {
    const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
    numbers.push(0);
    const operators = ['+', '-', '=', 'C'];
    const [inputValue, setInputValue] = useState('');
    const [operator, setOperator] = useState('');
    const [calc, newCalc] = useState('');
    const [sum, newSum] = useState(0);

    const handleInput = (event) => {
        const { target } = event;
        const newValue = target.textContent;
        const isOperator = operators.some((operator) => {
            return operator === newValue;
        });
        const isArithmeticSign = newValue === '+' || newValue === '-';

        if (!isOperator) {
            setInputValue(inputValue + newValue);
            newCalc(calc + String(newValue));
        } else if (isArithmeticSign) {
            if (newValue === '+') {
                setOperator('+');
                newSum(sum + Number(calc));
                console.log(sum);
                newCalc('');
                setInputValue(inputValue + newValue);
            } else if (newValue === '-') {
                setOperator('-');
                if (sum === 0) {
                    newSum(Number(calc));
                    console.log('ok');
                } else {
                    newSum(sum - Number(calc));
                }
                console.log(sum);
                newCalc('');
                setInputValue(inputValue + newValue);
            }
        } else if (newValue === '=') {
            if (operator === '+') {
                const quickSum = sum + Number(calc);
                setInputValue(quickSum);
                newCalc('');
                newSum(quickSum);
            } else if (operator === '-') {
                const quickSum = sum - Number(calc);
                setInputValue(quickSum);
                newCalc('');
                newSum(quickSum);
            }
        } else if (newValue === 'C') {
            setInputValue('');
            newCalc(0);
            newSum(0);
        }
    };

    return (
        <div className={styles['app-container']}>
            <div className={styles['input-container']}>
                <input
                    className={styles['input-container__input']}
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
                        <button className={styles['buttons']} onClick={handleInput}>
                            {number}
                        </button>
                    </div>
                ))}
            </div>
            <div className={styles['operators-container']}>
                {operators.map((operator, index) => (
                    <div key={index} className={styles.operator}>
                        <button onClick={handleInput} className={styles.buttons}>
                            {operator}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
