class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }
}

class GameLauncher{
  constructor(){}  
  launch(){

    var gameSettings = new BO.GameSettings();
    var voice        = new BO.Voice();
    var roster       = new BO.Roster();
    var goodGuy      = new BO.Character("MegaMan", "Images/MegaMan.png", 10, 10, 1);
    var badGuy       = roster.BadGuys[gameSettings.CurrentLevel];
    var currentWord  = new BO.WordSelector().chooseRandomWordFromBank(
      new BO.WordBank().Level2Words);
    var game         = new BO.Game(gameSettings, voice, currentWord, goodGuy, badGuy);

    document.getElementById("content").appendChild(game.UI.el);


    var roster = new BO.Roster();
    document.body.appendChild(roster.UI.el);

    
    window["game"] = game;
  }
}


window.onload = () => {
    //var el = document.getElementById('content');
    //var greeter = new Greeter(el);
    //greeter.start();
  HBRender.init();
  var gl = new GameLauncher();
  gl.launch();
};