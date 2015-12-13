module BO {

  export class Minion implements IDamageable, IRenderable {
    public name         : string;
    public imageUrl     : string;
    public currentHealth: number;
    public maxHealth    : number;
    public difficulty   : number;

    public imageRequiresXAxisFlip = false;
    public UI: UI.MinionUI;

    constructor(name: string, imageUrl: string, currentHealth: number, maxHealth: number, difficulty: number, imageRequiresXAxisFlip?:boolean) {
      this.name          = name;
      this.imageUrl      = imageUrl;
      this.currentHealth = currentHealth;
      this.maxHealth     = maxHealth;
      this.difficulty    = difficulty;

      if ( imageRequiresXAxisFlip ){
        this.imageRequiresXAxisFlip = imageRequiresXAxisFlip;  
      }
      
      this.UI            = new UI.MinionUI(this);
    }
  }
}  