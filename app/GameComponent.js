"use client";
import { createElement } from "react";
import Game from "./Game";
import { useRef, useEffect } from "react";

export default function GameComponent() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.tabIndex = 1000;
        if (canvas) {
            console.log(`drawing canvas`);
            const context = canvas.getContext("2d");
            const game = new Game();
            game.draw(context);
        }
        
    }, []);
    return <canvas ref={canvasRef} onKeyDown={(event)=>{
        event.preventDefault();
        console.log(`key down: '${event.key}'`);
    }}/>;
};
