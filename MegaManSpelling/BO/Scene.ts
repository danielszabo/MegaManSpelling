module BO{

  export interface IScene{
    name      :string;
    bgImageUrl:string;
    bgMusicUrl:string;
  }

  export class SceneBank{
    
    public Scenes: Array<IScene> = [
      { name: "Desert Lightning",  bgImageUrl: "Images/bgs/DesertLightning.jpg",   bgMusicUrl: "" },
      { name: "Eruption",          bgImageUrl: "Images/bgs/EruptionLightning.jpg", bgMusicUrl: "" },
      { name: "Godzilla",          bgImageUrl: "Images/bgs/Godzilla.jpg",          bgMusicUrl: "" },
      { name: "HulkBuster",        bgImageUrl: "Images/bgs/HulkBuster.jpg",        bgMusicUrl: "" },
      { name: "Space Beach",       bgImageUrl: "Images/bgs/SpaceBeach.jpg",        bgMusicUrl: "" },
      { name: "Space Battle",      bgImageUrl: "Images/bgs/SpaceshipBattle.jpg",   bgMusicUrl: "" },
      { name: "Space Cruiser",     bgImageUrl: "Images/bgs/SpaceCruiser.jpg",      bgMusicUrl: "" },
      { name: "Space Station",     bgImageUrl: "Images/bgs/SpaceStation.jpg",      bgMusicUrl : "" },
      { name: "Sunrise",           bgImageUrl: "Images/bgs/Sunrise.jpg",           bgMusicUrl: "" },
      { name: "Volcano Lightning", bgImageUrl: "Images/bgs/VolcanoLightning.jpg",  bgMusicUrl: "" }];
  

    constructor(){
      
    }
  }

  export class SceneSelector{
    SceneBank:SceneBank = new BO.SceneBank;

    constructor(){}

    chooseRandomSceneFromBank(){
      var min = 0

      var max = this.SceneBank.Scenes.length - 1;
      var rand = Math.floor(Math.random() * (max - min + 1)) + min;

      return this.SceneBank.Scenes[rand];
    }
  }
}  