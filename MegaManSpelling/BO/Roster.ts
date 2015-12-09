module BO{
  export class Roster{
    public BadGuys:Array<Character> = [
      new Character("Spike Man",        "Images/SpikeMan.png",     3, 3, 1),
      new Character("Shovel Man",       "Images/ShovelMan.png",    4, 4, 2),
      new Character("Pencil Man",       "Images/PencilMan.png",    5, 5, 3),
      new Character("Doctor Porcupine", "Images/PorcupineMan.png", 6, 6, 4),
      new Character("Blade Man",        "Images/BladeMan.png",     7, 7, 5),
      new Character("Alligator Man",    "Images/AlligatorMan.png", 8, 8, 6),
      new Character("Tornado Man",      "Images/TornadoMan.png",   9, 9, 7),
      new Character("Fire Man",         "Images/FireMan.png",     10, 10, 8),
      new Character("Dragon Man",       "Images/DragonMan.png",   20, 20, 9)];  
      
    public UI : UI.RosterUI;

  
    constructor(){
      this.UI = new UI.RosterUI(this);  
    }
  }

}