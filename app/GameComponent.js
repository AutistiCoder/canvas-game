"use client";
import { createElement } from "react";
import "./GameComponent.css";
import Game from "./Game";
import { useRef, useEffect } from "react";

export default function GameComponent() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.tabIndex = 1000;
            console.log(`drawing canvas`);
            const context = canvas.getContext("2d");
            Game.create(context).then((game) => {
                console.log(`game created`);
                game.draw(0);
                canvas.addEventListener("keydown",(event)=>{
                event.preventDefault();
                console.log(`key down: '${event.key}'`);
                if (event.key === ' ')
                    game.player.jump();
            });
            });
            

            
        }
        
    }, []);
    return <canvas  ref={canvasRef}/>;
};
