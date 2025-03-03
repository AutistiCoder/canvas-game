import Image from "next/image";
import styles from "./page.module.css";
import GameComponent from "./GameComponent";

export default function Home() {
  return (
  <div>
    <h1>Game</h1>
    <GameComponent />
  </div>);
}
