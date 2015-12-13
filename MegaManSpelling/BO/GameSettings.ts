module BO{
  export class GameSettings{
    public GameMode       :GameMode = GameMode.admin; 
    public CurrentLevel   :number  = 0;
    public WordDifficulty :number  = 2; // [1|2|3] Determines which difficulty word bank to use
    public PlayerName     :string  = "Kaleb";
    public HintDuration   :number  = 6000;

    public UI             : UI.GameSettingsUI;
  
  
    constructor() {

      this.UI = new UI.GameSettingsUI(this);
    }
  }  

  

  export enum GameMode {
    easy, medium, hard, admin  
  }
} 