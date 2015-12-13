module BO{
  export class Roster{
    
    public GoodGuys:Array<Character> = [
      new BO.Character("MegaMan", "Images/MegaMan.png", "Images/portraits/MegaManPortrait.png", 10, 10, 3, 3, 1,[
        /** /new Minion("Minion1", "Images/minions/MegaManMinion1.gif", 1, 1, 1, true),
        new Minion("Minion1", "Images/minions/MegaManMinion2.gif", 1, 1, 1, false),
        new Minion("Minion1", "Images/minions/MegaManMinion3.gif", 1, 1, 1, true),
        new Minion("Minion1", "Images/minions/MegaManMinion4.gif", 1, 1, 1, true),
        new Minion("Minion2", "Images/minions/MegaManMinion5.gif", 1, 1, 1, false) /**/
        ])
      ];
    
    public BadGuys:Array<Character> = [
      new Character("Spike Man", "Images/SpikeMan.png"   , "Images/portraits/SpikeManPortrait.png", 3, 3, 0, 0, 0, [
        new Minion("Minion1", "Images/minions/SpikeManMinion1.gif", 1, 1, 1, true),
        new Minion("Minion2", "Images/minions/SpikeManMinion2.gif",2,2,1, false)]),
      new Character("Shovel Man", "Images/ShovelMan.png", "Images/portraits/ShovelManPortrait.png", 4, 4, 0, 0, 1, [
        new Minion("Minion1", "Images/minions/ShovelManMinion1.gif", 3, 3, 1, false),
        new Minion("Minion1", "Images/minions/ShovelManMinion2.gif", 2, 2, 1, false),
        new Minion("Minion2", "Images/minions/ShovelManMinion3.gif", 1, 1, 1, false)]),
      new Character("Pencil Man", "Images/PencilMan.png", "Images/portraits/PencilManPortrait.png", 5, 5, 0, 0, 2, [
        new Minion("Minion1", "Images/minions/PencilManMinion1.gif", 2, 2, 1, false),
        new Minion("Minion1", "Images/minions/PencilManMinion2.gif", 2, 2, 1, false)]),
      new Character("Doctor Porcupine", "Images/DoctorPorcupine.png", "Images/portraits/DoctorPorcupinePortrait.png", 6, 6, 0, 0, 3, [
        new Minion("Minion1", "Images/minions/DoctorPorcupineMinion1.gif", 1, 1, 1, true),
        new Minion("Minion2", "Images/minions/DoctorPorcupineMinion2.gif", 3, 3, 1, false)]),
      new Character("Toad Man", "Images/ToadMan.png", "Images/portraits/ToadManPortrait.png", 6, 6, 0, 0, 4, [
        new Minion("Minion1", "Images/minions/ToadManMinion2.gif", 3, 3, 1, false),
        new Minion("Minion1", "Images/minions/ToadManMinion1.gif", 1, 1, 1, false),
        new Minion("Minion1", "Images/minions/ToadManMinion1.gif", 1, 1, 1, false),
        new Minion("Minion2", "Images/minions/ToadManMinion1.gif", 1, 1, 1, false)]),
      new Character("Blade Man", "Images/BladeMan.png", "Images/portraits/BladeManPortrait.png", 7, 7, 0, 0, 5, [
        new Minion("Minion1", "Images/minions/BladeManMinion1.gif", 2, 2, 1, false),
        new Minion("Minion2", "Images/minions/BladeManMinion2.gif", 2, 2, 1, false)]),
      new Character("Alligator Man", "Images/AlligatorMan.png", "Images/portraits/AlligatorManPortrait.png", 8, 8, 0, 0, 6, [
        new Minion("Minion1", "Images/minions/AlligatorManMinion1.gif", 2, 2, 1, true),
        new Minion("Minion1", "Images/minions/AlligatorManMinion2.gif", 2, 2, 1, false),
        new Minion("Minion2", "Images/minions/AlligatorManMinion1.gif", 2, 2, 1, true)]),
      new Character("Tornado Man", "Images/TornadoMan.png", "Images/portraits/TornadoManPortrait.png", 8, 8, 0, 0, 7, [
        new Minion("Minion1", "Images/minions/TornadoManMinion1.gif", 2, 2, 1, false),
        new Minion("Minion1", "Images/minions/TornadoManMinion2.gif", 2, 2, 1, false),]),
      new Character("Fire Man", "Images/FireMan.png", "Images/portraits/FireManPortrait.png", 10, 10, 0, 0, 8, [
        new Minion("Minion1", "Images/minions/FiremanMinion1.gif", 2, 2, 1, true),
        new Minion("Minion1", "Images/minions/FiremanMinion2.gif", 2, 2, 1, true)]),
      new Character("Dragon Man", "Images/DragonMan.png", "Images/portraits/DragonManPortrait.png", 20, 20, 0, 0, 9, [
        new Minion("Minion1", "Images/minions/DragonManMinion1.gif", 2, 2, 1, false),
        new Minion("Minion1", "Images/minions/DragonManMinion2.gif", 2, 2, 1, false)])];  
    
      
    public UI : UI.RosterUI;

  
    constructor(){
      this.UI = new UI.RosterUI(this);  
    }
  }

}