import { useState, useEffect, useCallback } from 'react';

export function useAngleControl(initialAngle: number) {
    const [angle, setAngle] = useState(initialAngle);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let timerId: NodeJS.Timeout;
        if (isActive) {
            timerId = setInterval(() => {
                setAngle(prevAngle => prevAngle > 0 ? prevAngle - 1 : 0);
            }, 1000);
        }
        return () => {
            if (timerId) clearInterval(timerId);
        };
    }, [isActive, angle]);

    const start = useCallback(() => setIsActive(true), []);
    const stop = useCallback(() => setIsActive(false), []);

    return { angle, setAngle, start, stop, isActive };
}