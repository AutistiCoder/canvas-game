export default class Player
{
    constructor()
    {
        this.image = new Image();
        this.image.src = "player.png";
    }
    draw(context)
    {
        // make sure the image is loaded before drawing
        this.image.onload = ()=>
        {
            context.drawImage(this.image, 0, 0, 100, 100);
        }
        
    }
}