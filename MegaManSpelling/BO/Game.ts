module BO{
  export class Game{
    public CurrentWord : IWordBankEntry;
    public Settings    : GameSettings
    public GameVoice   : Voice;
    public GoodGuy     : Character;
    public BadGuy      : Character;
    public UI          : UI.GameUI;
  
    constructor(gameSettings: GameSettings, gameVoice: Voice, currentWord:IWordBankEntry, goodGuy: Character, badGuy: Character){
      this.Settings    = gameSettings;
      this.GameVoice   = gameVoice;
      this.CurrentWord = currentWord;
      this.GoodGuy     = goodGuy;
      this.BadGuy      = badGuy;

      this.UI        = new UI.GameUI(this);
    }

    public start(): Game {
      return this;
    }

    /* Generates a new word for the user to guess and stores it in
     * the Game.CurrentWord field.
     * @method cycleToNextWord
     */
    cycleToNextWord(){
      var newWord = new BO.WordSelector().chooseRandomWordFromBank(
        new BO.WordBank().Level1Words);

      if ( newWord.word.toUpperCase() === this.CurrentWord.word.toUpperCase() ) {
        this.cycleToNextWord();
        return;  
      }

      this.CurrentWord = newWord;  
    }

    cycleToNextBadGuy(){
      var roster = new BO.Roster();
      this.Settings.CurrentLevel++;
      this.BadGuy = roster.BadGuys[this.Settings.CurrentLevel];
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
  }
} 

