import React from 'react';
import './Timer.css';
import { useAngleControl } from './useAngleControl.ts';
import CanvasDrawing from './CanvasDrawing.tsx';

interface TimerProps {
    size?: number;
}

const Timer: React.FC<TimerProps> = ({ size = 800 }) => {
    const { angle, setAngle, start, stop, isActive } = useAngleControl(2400);

    const formatTime = (angle: number) => {
        const totalSeconds = angle;  // 'angle' 값을 초로 직접 사용

        // 숫자를 항상 두 자리로 포맷하는 함수
        const formatNumber = (num: number) => num < 10 ? '0' + num : num.toString();

        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${formatNumber(minutes)}:${formatNumber(seconds)}`;
    };


    return (
        <div className='timer-container'>
            <div className='timer'>
                <CanvasDrawing size={size} angle={angle} setAngle={setAngle} isActive={isActive} />
            </div>
            <div className='time-display'>
                <p>{formatTime(angle)}</p>
                <div className='controls'>
                    <button onClick={start}>Start</button>
                    <button onClick={stop}>Stop</button>
                </div>
            </div>
        </div>
    );
};

export default Timer;
