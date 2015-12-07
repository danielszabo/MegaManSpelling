module UI{
  export class GameUI implements IUiElement {
    public game    : BO.Game;
    public el      : HTMLElement;

    public tdGoodGuy          : HTMLTableCellElement;
    public tdBadGuy           : HTMLTableCellElement;
    public divCurrentWord     : HTMLDivElement;
    public spanCurrentWord    : HTMLSpanElement;

    public btnShowCurrentWord : HTMLInputElement;
    public btnSayCurrentWord  : HTMLInputElement;
    public btnSubmitAnswer    : HTMLInputElement;
    public txtUserEntry       : HTMLInputElement;

    public template:string = `
<div>
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
    <div class="currentWordArea" id="DivCurrentWordArea" style='display:none'>
      <span>Word</span>: <b><span id="CurrentWord">{{CurrentWord.word}}</span></b>
    </div>
    <form>
      <input id="BtnSayCurrentWord" type="button" value="Repeat Word" /><br>
      <input id="TextEntryInput" type="text" placeholder="Type your answer here" />
      <input id="BtnShowCurrentWord" type="button" value="Show Word" />
      <br><br>
      <input id="BtnSubmitButton" type="button" value="FIRE" />
    </form>
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
      this.divCurrentWord     = <HTMLDivElement>this.el.querySelector("#DivCurrentWordArea");
      this.spanCurrentWord    = <HTMLSpanElement>this.el.querySelector("#CurrentWord");
      this.btnShowCurrentWord = <HTMLInputElement>this.el.querySelector("#BtnShowCurrentWord");
      this.btnSayCurrentWord  = <HTMLInputElement>this.el.querySelector("#BtnSayCurrentWord");
      this.btnSubmitAnswer    = <HTMLInputElement>this.el.querySelector("#BtnSubmitButton");
      this.txtUserEntry       = <HTMLInputElement>this.el.querySelector("#TextEntryInput");
      this.renderGoodGuy(game.GoodGuy);
      this.renderBadGuy(game.BadGuy);
      
      this.resetForm();
      return this;
    }
    renderGoodGuy(character:BO.Character):GameUI{
      this.tdGoodGuy.innerHTML = "";
      this.tdGoodGuy.appendChild(character.UI.render());
      return this;  
    }
    renderBadGuy(character:BO.Character):GameUI{
      this.tdBadGuy.innerHTML = "";
      this.tdBadGuy.appendChild(character.UI.render());
      return this;  
    }
    renderCurrentWord(word:BO.IWordBankEntry){
      this.spanCurrentWord.innerHTML = (word.word + "<br/>" + word.usage);  
    }
    showCurrentWord(b:boolean){
      var $el = $(this.divCurrentWord);
      if ( b ){$el.show(); } 
      else {$el.hide();}
    }
    showShowCurrentWordButton(b:boolean){
      var $el = $(this.btnShowCurrentWord);
      if (b) { $el.show(); }
      else { $el.hide(); }
    }
    resetForm(){
      this.showShowCurrentWordButton(false);
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
        this.showCurrentWord(true);
        this.game.speakCurrentWordAndPhrase();
        
        // Hide after n seconds
        setTimeout(() => {
          this.showCurrentWord(false);
          this.showShowCurrentWordButton(false);
        }, this.game.Settings.HintDuration);
      }


      $(this.btnSubmitAnswer).on("click", function (e) {

        var enteredWord = self.txtUserEntry.value;
        var isCorrectWord = game.CurrentWord.word.toLowerCase() === enteredWord.toLowerCase();
        if (isCorrectWord) {
          game.BadGuy.currentHealth--;
          self.renderBadGuy(game.BadGuy);
          self.game.playCorrectAnswerSound();
          self.game.speak("That's right!");
          self.game.cycleToNextWord();
          self.renderCurrentWord(self.game.CurrentWord);

          (<HTMLSpanElement>self.el.querySelector("#CurrentWord")).innerHTML = self.game.CurrentWord.word;
          self.resetForm();

          if (self.game.BadGuy.currentHealth !== 0){
            self.game.speak("The next word is ");
            self.game.speakCurrentWordAndPhrase();
          }
        }
        else {
          game.GoodGuy.currentHealth--;
          self.showShowCurrentWordButton(true);
          self.renderGoodGuy(game.GoodGuy);
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
            self.renderBadGuy(self.game.BadGuy);
            self.game.cycleToNextWord();
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