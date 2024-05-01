import React, { useRef, useEffect } from 'react';

interface CanvasDrawingProps {
    size: number;
    angle: number;
    setAngle: (angle: number) => void;
    isActive: boolean;
}

const CanvasDrawing: React.FC<CanvasDrawingProps> = ({ size, angle, setAngle, isActive }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (context && canvas) {
            canvas.width = size;
            canvas.height = size;

            const drawStatic = () => {
                drawCylinders(context, size / 2, size / 2, size / 2 - 5);
                drawCircle(context, size / 2, size / 2, size / 2 - 70, 0, 3600, '#e9e9e9');
            };

            const drawDynamic = () => {
                drawCircle(context, size / 2, size / 2, size / 2 - 70, 0, -angle, 'red');
                drawMovingCylinder(context, size / 2, size / 2, size / 8, -angle, '#f5f5f5');
                drawCircle(context, size / 2, size / 2, size / 8, 0, 3600, '#f5f5f5');
            };

            drawStatic();
            drawDynamic();
        }
    }, [size, angle]);

    const handleMouseMove = (event: React.MouseEvent) => {
        if (event.buttons === 1 && !isActive) {
            const canvas = canvasRef.current;
            const rect = canvas?.getBoundingClientRect();
            if (canvas && rect) {
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const mouseX = event.clientX - centerX;
                const mouseY = event.clientY - centerY;
                const radianAngle = Math.atan2(mouseY, mouseX) * -1;
                const degreeAngle = radianAngle * (180 / Math.PI) - 90;
                const normalizedAngle = degreeAngle >= 0 ? degreeAngle : degreeAngle + 360;
                setAngle(Math.floor(normalizedAngle * 10));
            }
        }
    };

    return (
    <canvas className='timer-canvas' ref={canvasRef} onMouseMove={handleMouseMove} width={size} height={size} />
)};

const drawCylinders = (
    context: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number
) => {
    const bigCylinderLength = radius - 70;  // 기본 원통 길이 설정
    const smallCylinderLength = radius - 80;  // 기본 원통 길이 설정
    const bigWidth = 5;  // 특정 각도에서 사용할 원통 너비
    const smallWidth = 3;    // 일반 각도에서 사용할 원통 너비
    const textOffset = 36;  // 텍스트가 원통보다 바깥쪽에 위치하도록 설정하는 오프셋

    for (let i = 0; i < 56; i++) {
        const angle = (((Math.PI / 30) * i) * -1) - Math.PI / 2;  // 전체 360도를 30등분
        const isBig = (i % 5 === 0);
        const cylinderWidth = isBig ? bigWidth : smallWidth; // 조건에 따라 너비 결정
        const cylinderLength = isBig ? bigCylinderLength : smallCylinderLength

        const x1 = centerX + cylinderLength * Math.cos(angle);  // 원통의 한 끝점
        const y1 = centerY + cylinderLength * Math.sin(angle);
        const x2 = centerX - cylinderLength * Math.cos(angle);  // 원통의 반대편 끝점
        const y2 = centerY - cylinderLength * Math.sin(angle);

        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.strokeStyle = 'black';  // 원통 색상 설정
        context.lineWidth = cylinderWidth;  // 동적으로 결정된 원통 너비 설정
        context.lineCap = 'round';  // 선의 끝을 둥글게 설정
        context.stroke();

        // 숫자 그리기
        if (isBig) {
            const text = 5 * (i / 5);
            const textX = centerX + (cylinderLength + textOffset) * Math.cos(angle);
            const textY = centerY + (cylinderLength + textOffset) * Math.sin(angle) + 12; // 세로 정렬 보정
            context.fillStyle = 'black'; // 텍스트 색상 설정
            context.font = '36px Arial';
            context.textAlign = 'center';
            context.fillText(text.toString(), textX, textY);
        }
    }
}

const drawMovingCylinder = (
    context: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    currentAngle: number,
    strokeStyle: string,
) => {
    const radianAngle = (currentAngle / 1800 * Math.PI) - Math.PI / 2; // 각도를 라디안으로 변환

    const x1 = centerX;
    const y1 = centerY;
    const x2 = centerX + radius * Math.cos(radianAngle); // 원통의 끝점 계산
    const y2 = centerY + radius * Math.sin(radianAngle);

    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = strokeStyle; // 원통 색상 설정
    context.lineWidth = 20; // 원통 너비 설정
    context.lineCap = 'round'; // 선의 끝을 둥글게 설정
    context.stroke();
}

const drawCircle = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    startAngleDegrees: number,
    endAngleDegrees: number,
    fillColor: string,
) => {
    const startAngleRadians = (startAngleDegrees - 900) * Math.PI / 1800;
    const endAngleRadians = (endAngleDegrees - 900) * Math.PI / 1800;

    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, radius - 20, startAngleRadians, endAngleRadians, true);
    context.closePath();

    context.fillStyle = fillColor;
    context.fill();
};

export default CanvasDrawing;