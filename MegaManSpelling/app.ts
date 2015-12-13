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

    var gameSettings       = new BO.GameSettings();
    var voice              = new BO.Voice();
    var roster             = new BO.Roster();
    var goodGuy            = roster.GoodGuys[0];
    var badGuy             = roster.BadGuys[gameSettings.CurrentLevel];
    var wordSelector       = new BO.WordSelector();
    var currentWord        = wordSelector.chooseRandomWordFromBank( gameSettings.CurrentLevel );
    var mathSelector       = new BO.MathProblemSelector();
    var currentMathProblem = mathSelector.chooseRandomExpressionFromBank(gameSettings.CurrentLevel);
    var sceneSelector      = new BO.SceneSelector();
    var currentScene       = sceneSelector.chooseRandomSceneFromBank();
    var game               = new BO.Game( gameSettings, 
                                          voice, 
                                          currentWord, 
                                          wordSelector, 
                                          currentMathProblem, 
                                          mathSelector, 
                                          goodGuy, 
                                          badGuy, 
                                          roster,
                                          currentScene,
                                          sceneSelector);

    document.getElementById("content").appendChild(game.UI.el);

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