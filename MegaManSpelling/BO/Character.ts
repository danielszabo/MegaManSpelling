module BO{

  export interface IDamageable{
    currentHealth:number;
    maxHealth:number;
    UI : UI.ITargetable;
  }

  export interface IRenderable{
    UI: UI.ITargetable; // If it can be damaged, it has to be selectable. 
  }

  export class Character implements IDamageable, IRenderable{
    public name             : string;
    public imageUrl         : string;
    public portraitImgUrl   : string;
    public currentLevel     : number = 1;
    public currentHealth    : number;
    public maxHealth        : number;
    public currentPowerups  : number;
    public maxPowerups      : number;
    public difficulty       : number;
    public minions          : Array<BO.Minion>;

    public UI               : UI.CharacterUI;

    constructor(name:string, imageUrl:string, portraitImgUrl:string, currentHealth:number, maxHealth:number, currentPowerups:number,maxPowerups:number, difficulty:number, minions:Array<BO.Minion>){
      this.name            = name;
      this.imageUrl        = imageUrl;
      this.portraitImgUrl  = portraitImgUrl;
      this.currentHealth   = currentHealth;
      this.maxHealth       = maxHealth;
      this.currentPowerups = currentPowerups;
      this.maxPowerups     = maxPowerups;
      this.difficulty      = difficulty;
      this.minions         = minions;

      this.UI              = new UI.CharacterUI(this);  
    }
  }
} 