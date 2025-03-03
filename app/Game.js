import Player from "./Player"
export default class Game
{
    constructor()
    {
        this.player = new Player();
    }
    draw(context)
    {
        this.player.draw(context);

    }
}