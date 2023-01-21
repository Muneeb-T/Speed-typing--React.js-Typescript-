
import RestartButton from './components/RestartButton';
import Results from './components/Results';
import UserTypings from './components/UserTypings';
import useEngine from './hooks/useEngine';
import { calculateAccuracyPercentage } from './utils/helpers';
function App() {
    const { state, words, timeLeft, typed, errors, restart, totalTyped } =
        useEngine();
    return (
        <>
            <CountdownTimer timeLeft={timeLeft} />
            <WordContainer>
                <GeneratedWords words={words} />
                <UserTypings
                    className='absolute inset-0'
                    userInput={typed}
                    words={words}
                />
            </WordContainer>
            <RestartButton
                onRestart={restart}
                className={'mx-auto mt-10 text-slate-500'}
            />
            <Results
                className='mt-10'
                state={state}
                errors={errors}
                accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
                total={totalTyped}
            />
        </>
    );
}
const WordContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='relative max-w-xl mt-3 text-3xl leading-relaxed break-all'>
            {children}
        </div>
    );
};
const GeneratedWords = ({ words }: { words: string }) => {
    return <div className='text-slate-500'>{words}</div>;
};
const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
    return <h2 className='text-primary-400 font-medium'>Time : {timeLeft}</h2>;
};
export default App;
