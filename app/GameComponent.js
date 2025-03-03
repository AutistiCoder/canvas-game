"use client";
import { createElement } from "react";
import Game from "./Game";
import Player from "./Player";
import { useRef, useEffect } from "react";

export default function GameComponent() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            console.log(`drawing canvas`);
            const context = canvas.getContext("2d");
            const player = new Player();
            const game = new Game();
            game.draw(context);
        }
    }, []);

    return <canvas ref={canvasRef} />;
};
