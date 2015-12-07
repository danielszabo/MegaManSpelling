module BO{
  
  export class Character{
    public name          : string;
    public imageUrl      : string;
    public currentHealth : number;
    public maxHealth     : number;
    public difficulty    : number;

    public UI            : UI.CharacterUI;

    constructor(name:string, imageUrl:string, currentHealth:number, maxHealth:number, difficulty:number){
      this.name          = name;
      this.imageUrl      = imageUrl;
      this.currentHealth = currentHealth;
      this.maxHealth     = maxHealth;
      this.difficulty    = difficulty;
      this.UI            = new UI.CharacterUI(this);  
    }
  }
} 