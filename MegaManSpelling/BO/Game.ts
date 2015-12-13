module BO{
  export class Game{
    public HasUsedCurrentWordHint : boolean;
    public CurrentTarget          : BO.IDamageable;
    public CurrentWord            : IWordBankEntry;
    public WordSelector           : WordSelector;
    public CurrentMathProblem     : IMathProblemEntry;
    public MathProblemSelector    : MathProblemSelector;
    public CurrentScene           : IScene;
    public SceneSelector          : SceneSelector;
    public Settings               : GameSettings
    public GameVoice              : Voice;
    public GoodGuy                : Character;
    public BadGuy                 : Character;
    public Roster                 : Roster;
    public UI                     : UI.GameUI;
  
    constructor(gameSettings: GameSettings, gameVoice: Voice, currentWord: IWordBankEntry, wordSelector: WordSelector, currentMathProblem: IMathProblemEntry, mathProblemSelector: MathProblemSelector, goodGuy: Character, badGuy: Character, roster: Roster, currentScene: IScene, sceneSelector: SceneSelector){
      this.HasUsedCurrentWordHint = false;
      this.Settings               = gameSettings;
      this.GameVoice              = gameVoice;
      this.CurrentWord            = currentWord;
      this.WordSelector           = wordSelector;
      this.CurrentMathProblem     = currentMathProblem;
      this.MathProblemSelector    = mathProblemSelector;
      this.GoodGuy                = goodGuy;
      this.BadGuy                 = badGuy;
      this.Roster                 = roster;
      this.CurrentScene           = currentScene;
      this.SceneSelector          = sceneSelector

      this.UI                     = new UI.GameUI(this);
    }

    public start(): Game {
      return this;
    }

    /**
     * Generates a new word for the user to guess and stores it in
     * the Game.CurrentWord field.
     * @method cycleToNextWord
     */
    cycleToNextWord(){
      var newWord = this.WordSelector.chooseRandomWordFromBank(
        this.Settings.CurrentLevel);

      if ( newWord.word.toUpperCase() === this.CurrentWord.word.toUpperCase() ) {
        this.cycleToNextWord();
        return;  
      }

      this.CurrentWord = newWord;  
    }

    /**
     * Generates a new math problem for the user to guess and stores it in
     * the Game.CurrentMathProblem field
     */
    cycleToNextMathProblem(){
      var newMathProblem = this.MathProblemSelector.chooseRandomExpressionFromBank(
        this.Settings.CurrentLevel);

      if ( newMathProblem.expression == this.CurrentMathProblem.expression ){
        this.cycleToNextMathProblem();
        return;  
      }

      this.CurrentMathProblem = newMathProblem;
    }

    /**
     * Generates a new scene (bg, music, etc.)
     */
    cycleToNextScene() {
      var newScene = this.SceneSelector.chooseRandomSceneFromBank();

      if (newScene.name === this.CurrentScene.name){
        this.cycleToNextScene();
        return;
      }

      this.CurrentScene = newScene;
    }

    /**
     * Promotes the player to the next level and sets the bad guy to that level's bad guy
     * @method cycleToNextBadGuy
     */
    cycleToNextBadGuy(){
      this.Settings.CurrentLevel++;
      this.BadGuy = this.Roster.BadGuys[this.Settings.CurrentLevel];
    }

    /**
     * Promotes the player to the next level and sets the bad guy to that level's bad guy
     * @method cycleToNextBadGuy
     */
    cycleToPreviousBadGuy() {
      this.Settings.CurrentLevel--;
      this.BadGuy = this.Roster.BadGuys[this.Settings.CurrentLevel];
    }

    /**
     * Checks to see if a word matches the games's current selected word
     * @method wordMatchesCurrentWord
     * @param {string} s The word to check for a match against the games Current Word
     */
    checkWordMatchesCurrentWord(s:string):boolean{
      s = s.toLowerCase();
      return (this.CurrentWord.accepts.indexOf( s.trim() ) > -1 );
    }

    /**
     * Checks to see if the bad guy and all of his minions health
     * are all at zero.
     * @method checkAllEnemiesOnLevelAreDefeated
     * @returns {boolean} True if all enemies are defeated, false otherwise.
     */
    checkAllEnemiesOnLevelAreDefeated():boolean{
      var allDeadFlag = true;
      if (this.BadGuy.currentHealth === 0) {
        var minions = this.BadGuy.minions;
        for (var i = 0; i < minions.length; i++) {
          if (minions[i].currentHealth > 0) {
            allDeadFlag = false;
            break;
          }
        }
      } else {
        allDeadFlag = false;
      }

      return allDeadFlag;  
    }

    /**
     * Checks to see if a number is the solution to the game's current math problem
     * @method numberMatchesCurrentMathProblemAnswer
     * @param {number} n The guess/answer to the game's current Math Problem
     */
    numberMatchesCurrentMathProblemAnswer(n:number){
      return (this.CurrentMathProblem.accepts.indexOf(n) > -1)
    }

    increaseCharacterHealth(char:IDamageable, n:number){
      char.currentHealth += n;
      
      // Don't let the character's health exceed it's max health
      if ( char.currentHealth > char.maxHealth ){
        char.currentHealth = char.maxHealth;  
      }
    }

    reduceCharacterHealth(char:IDamageable, n:number){
      char.currentHealth -= n;

      // Don't let the character's health counter fall below zero
      if ( char.currentHealth < 0 ){
        char.currentHealth = 0;  
      }
    }

    increaseCharacterPowerups(char:Character, n:number){
      char.currentPowerups += n;

      // Don't let the characters powerup count exceed its max allowable amount
      if ( char.currentPowerups > char.maxPowerups ) {
        char.currentPowerups = char.maxPowerups;  
      }
    }

    decreaseCharacterPowerups(char: Character, n: number) {
      char.currentPowerups -= n;

      // Don't let the characters powerup count fall below zero
      if (char.currentPowerups < 0) {
        char.currentPowerups = 0;
      }
    }
    

    speakCurrentWordAndPhrase() {
      var voice  = this.GameVoice;
      var word   = this.CurrentWord.word;
      var phrase = this.CurrentWord.usage;
      voice.speak(word);
      voice.speak("As in ");
      voice.speak(phrase);
    }
    /*
     * Makes the game say something to the user
     * @method speak
     * @parameter {string} s The word or phrase to say to the user
     */
    speak(s:string){
      this.GameVoice.speak(s);  
    }
    speakCurrentBadGuyIntro(){
      var voice = this.GameVoice;
      voice.speak("Your next opponent is ");
      voice.speak(this.BadGuy.name);
    }

    playCorrectAnswerSound(){
      var audio = new Audio('sounds/correctanswer.mp3');
      audio.play();  
    }
    playWrongAnswerSound(){
      var audio = new Audio('sounds/wronganswer.mp3');
      audio.play();  
    }

    playExposionSound(){
      var audio = new Audio('sounds/explosion.mp3');
      audio.play();  
    }

    playEvilLaughter(){
      var audio = new Audio('sounds/evillaugh.mp3');
      audio.play();  
    }

    unlockSecretLevel(){
      var AlexFighter = new Character("Alexander The Great", "Images/Minions/SF2.gif", "Images/Portraits/AlexPortrait.png", 20, 20, 0, 0, 9, [
        new Minion("Minion1", "Images/minions/SFMinion1.gif", 9, 9, 1, true),
        new Minion("Minion2", "Images/minions/SFMinion2.gif", 9, 9, 1, true)]);

      this.Roster.BadGuys.push(AlexFighter);

      this.playExposionSound();
      this.playEvilLaughter();

      this.speak("You've unlocked the secret level!");
    }
  }
} 

