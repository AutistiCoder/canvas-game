import Player from "./Player"
export default class Game
{
    constructor(player,context)
    {
        this.player = player;
        this.context = context;
    }
    static async create(context)
    {
        const game = new Game(await Player.create(context),context);
        return game;
    }
    draw(t=0)
    {
        console.log("context: ",this.context);
        this.context.clearRect(0, 0, 800, 600);
        this.player.draw(t);
    }
}