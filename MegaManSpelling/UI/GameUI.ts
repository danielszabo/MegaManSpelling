module UI{
  export class GameUI implements IUiElement {
    public game    : BO.Game;
    public el      : HTMLElement;

    public tdGoodGuy          : HTMLTableCellElement;
    public tdBadGuy           : HTMLTableCellElement;

    public divModalWindow     : HTMLDivElement;
    public divModalContent    : HTMLDivElement;

    public btnShowCurrentWord : HTMLInputElement;
    public btnSayCurrentWord  : HTMLInputElement;
    public btnSubmitAnswer    : HTMLInputElement;
    public txtUserEntry       : HTMLInputElement;

    public template:string = `
<div style="position: relative">
  <div id="ModalWindow" class='ModalContainer'>
    <div class='ModalBG'></div>
    <div id="ModalContent" class='ModalContent'></div>
  </div>  
  
  <table class='ArenaTable'>
    <tbody>
      <tr>
        <td id="GoodGuyCell"></td>
        <td>
        </td>
        <td id="BadGuyCell"></td>
      </tr>
    </tbody>
  </table>

  <br/>
  <div class='textEntryArea'>
    <form>
      <input id="BtnSayCurrentWord" type="button" value="Repeat Word" /><br>
      <input id="BtnShowCurrentWord" type="button" value="Show Hint" /><br>
      <input id="TextEntryInput" type="text" placeholder="Type your answer here" />
      <br><br>
      <input id="BtnSubmitButton" type="button" value="FIRE" />
    </form>
  </div>
</div>
`;  
    public templateWordHintAndUsage = `
<div>
  <div class="currentWordArea" id="DivCurrentWordArea">
    <span>Word</span>: <b><span id="CurrentWord">{{CurrentWord.word}}</span></b><br>
    Sentence: <span id="CurrentWordSentence">{{CurrentWord.usage}}</span><br>
  </div>
</div>
`;

    constructor(arena:BO.Game){
      this.game = arena;
      this.render(arena);
      this.wireup();
      return this;  
    }
    render(game: BO.Game):GameUI {
      this.el                 = HBRender.renderTemplate(this.template, game);
      this.tdGoodGuy          = <HTMLTableCellElement>this.el.querySelector("#GoodGuyCell");
      this.tdBadGuy           = <HTMLTableCellElement>this.el.querySelector("#BadGuyCell");
      this.divModalWindow     = <HTMLDivElement>this.el.querySelector("#ModalWindow");
      this.divModalContent    = <HTMLDivElement>this.el.querySelector("#ModalContent");
      this.btnShowCurrentWord = <HTMLInputElement>this.el.querySelector("#BtnShowCurrentWord");
      this.btnSayCurrentWord  = <HTMLInputElement>this.el.querySelector("#BtnSayCurrentWord");
      this.btnSubmitAnswer    = <HTMLInputElement>this.el.querySelector("#BtnSubmitButton");
      this.txtUserEntry       = <HTMLInputElement>this.el.querySelector("#TextEntryInput");
      this.renderCharacter(game.GoodGuy, this.tdGoodGuy);
      this.renderCharacter(game.BadGuy, this.tdBadGuy);
      
      this.resetForm();
      return this;
    }
    renderCharacter(character:BO.Character, td:HTMLTableCellElement):GameUI{
      td.innerHTML = "";
      td.appendChild(character.UI.render());
      return this;  
    }
    renderModalContent(hbTemplate:string, data){
      this.divModalContent.innerHTML = "";
      this.divModalContent.appendChild(
        HBRender.renderTemplate(hbTemplate,data||{}));
    }
    showModalWindow(b:boolean){
      var $el = $(this.divModalWindow);
      if (b) { $el.show(); }
      else { $el.hide(); }
    }
    showCurrentWord(b:boolean){
      if ( b ){
        this.showModalWindow(true);
        this.renderModalContent(this.templateWordHintAndUsage, this.game);
      } else {
        this.showModalWindow(false);
        this.renderModalContent(this.templateWordHintAndUsage, {});  
      }
    }
    showShowCurrentWordButton(b:boolean){
      var $el = $(this.btnShowCurrentWord);
      if (b) { $el.show(); }
      else { $el.hide(); }
    }
    resetForm(){
      this.txtUserEntry.value = ""; 
    }
    

    wireup():GameUI{
      
      var self  = this;
      var game  = this.game;
      var voice = this.game.GameVoice;

      voice.speak("Game is starting");
      voice.speak("Get Ready");
      voice.speak("The first word is ");
      this.game.speakCurrentWordAndPhrase();

      this.btnSayCurrentWord.onclick = (e) => {
        this.game.speakCurrentWordAndPhrase();
      };

      this.btnShowCurrentWord.onclick = (e) => {
        // Set the game flag to indicate that the hint has been used
        this.game.HasUsedCurrentWordHint = true;
        this.showCurrentWord(true);
        this.game.speakCurrentWordAndPhrase();
        
        // Hide after n seconds
        setTimeout(() => {
          this.showCurrentWord(false);
          this.showShowCurrentWordButton(false);
        }, this.game.Settings.HintDuration);
      }

      
      $(this.btnSubmitAnswer).on("click", function (e) {

        var enteredWord   = self.txtUserEntry.value;
        var isCorrectWord = game.wordMatchesCurrentWord(enteredWord);
        
        if (isCorrectWord) {
          var cntDamage = self.game.HasUsedCurrentWordHint ? 1 : 2;

          self.game.reduceCharacterHealth(game.BadGuy, cntDamage);
          self.renderCharacter(game.BadGuy, self.tdBadGuy);
          self.game.playCorrectAnswerSound();
          self.game.speak("That's right!");
          self.game.cycleToNextWord();
          self.showShowCurrentWordButton(true);
          self.game.HasUsedCurrentWordHint = false;
          self.resetForm();

          if (self.game.BadGuy.currentHealth !== 0){
            self.game.speak("The next word is ");
            self.game.speakCurrentWordAndPhrase();
          }
        }
        else {
          self.game.reduceCharacterHealth(self.game.GoodGuy, 1);
          self.showShowCurrentWordButton(true);
          self.renderCharacter(game.GoodGuy, self.tdGoodGuy);
          self.game.playWrongAnswerSound();
          self.game.speak("Try again!");
          self.game.speak("The word is ");
          self.game.speakCurrentWordAndPhrase();
          self.showShowCurrentWordButton(true);
        }

        if (self.game.BadGuy.currentHealth === 0) {
          self.game.speak("Mega Man Wins!");
          self.game.BadGuy.UI.putInJail();
          setTimeout(()=>{
            self.game.cycleToNextBadGuy();
            self.game.speakCurrentBadGuyIntro();
            self.renderCharacter(self.game.BadGuy, self.tdBadGuy);
            self.game.cycleToNextWord();
            self.showShowCurrentWordButton(true);
            self.game.HasUsedCurrentWordHint = false;
            self.game.speak("The next word is ");
            self.game.speakCurrentWordAndPhrase();
          }, self.game.Settings.HintDuration);
        }

        if (game.GoodGuy.currentHealth === 0) {
          self.game.speak(`${game.BadGuy.name}  Wins!`);
          self.game.GoodGuy.UI.putInJail();
        }
      });

      return this;  
    }
  }  
} 