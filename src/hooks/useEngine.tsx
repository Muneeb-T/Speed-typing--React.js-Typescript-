import { useCallback, useEffect, useState } from 'react';
import { countErrors } from '../utils/helpers';
import useCountDownTimer from './useCountdownTimer';
import useTypings from './useTypings';
import useWords from './useWords';
export type State = 'start' | 'run' | 'finish';
const NUMBER_OF_WORDS = 12;
const COUNT_DOWN_SECONDS = 60;
const useEngine = () => {
    const [state, setState] = useState<State>('start');
    const { words, updateWords } = useWords(NUMBER_OF_WORDS);
    const { timeLeft, startCountdown, resetCountdown } = useCountDownTimer(COUNT_DOWN_SECONDS);
    const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } =
        useTypings(state !== 'finish');

    const [errors, setErrors] = useState(0);
    const isStarting = state === 'start' && cursor > 0;
    const areWordsFinished = cursor === words.length;

    const sumErrors = useCallback(() => {
        const wordsReached = words.substring(0, cursor);
        setErrors((prev) => prev + countErrors(typed, wordsReached));
    }, [typed, words, cursor]);
    useEffect(() => {
        if (isStarting) {
            setState('run');
            startCountdown();
        }
    }, [isStarting, startCountdown, cursor]);

    useEffect(() => {
        if (!timeLeft) {
            setState('finish');
            sumErrors();
        }
    }, [timeLeft, sumErrors]);

    useEffect(() => {
        if (areWordsFinished) {
            sumErrors();
            updateWords();
            clearTyped();
        }
    }, [
        cursor,
        words,
        clearTyped,
        typed,
        areWordsFinished,
        updateWords,
        sumErrors,
    ]);

    const restart = useCallback(() => {
        resetCountdown();
        resetTotalTyped();
        setState('start');
        setErrors(0);
        updateWords();
        clearTyped();
    }, [resetCountdown, resetTotalTyped, updateWords, clearTyped]);

    return { state, words, timeLeft, typed,errors, totalTyped, restart };
};

export default useEngine;
