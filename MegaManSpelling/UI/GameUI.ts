module UI{
  export class GameUI implements IUiElement {
    public game    : BO.Game;
    public el      : HTMLElement;

    public divAdminPanel         : HTMLDivElement;

    public tdGoodGuy             : HTMLTableCellElement;
    public tdGoodGuyMinions      : HTMLTableCellElement;
    public tdBadGuy              : HTMLTableCellElement;
    public tdBadGuyMinions       : HTMLTableCellElement;
    public divGoodGuyPortrait    : HTMLDivElement;
    public divBadGuyPortrait     : HTMLDivElement;

    public divWordListing         : HTMLTableCellElement;
    public divModalWindow        : HTMLDivElement;
    public divModalContent       : HTMLDivElement;

    public btnShowCurrentWord    : HTMLInputElement;
    public btnSayCurrentWord     : HTMLInputElement;
    public btnSubmitWordAnswer   : HTMLInputElement;
    public btnUsePowerup         : HTMLInputElement;
    public selWordPicker         : HTMLSelectElement;

    

    public template:string = `
<div style="position: relative;">
  <div id="DivAdminSettingsPanel" class="AdminSettingsPanel"></div>
  <div class='ArenaBGOverlay'></div>

  <div id="ModalWindow" class='ModalContainer'>
    <div class='ModalBG'></div>
    <div id="ModalContent" class='ModalContent'></div>
  </div>

  <div id='DivGoodGuyPortrait' class='goodGuyPortrait'></div>
  <div id='DivBadGuyPortrait' class='badGuyPortrait'></div>
  
  <table class='ArenaTable'>
    <tbody>
      <tr>
        <td id="GoodGuyCell"></td>
        <td id="GoodGuyMinionsCell"></td>
        <td id="WordBankCell">
          WORDS<br/>
          <select id="SelWordPicker">
          </select>
          <div>
            <input id="BtnSubmitButton" type="button" value="FIRE" /><br/>
            <input id="BtnUsePowerup" type='button' value='Power Up!' />
          </div>
        </td>
        <td id='BadGuyMinionsCell'></td>
        <td id="BadGuyCell"></td>
      </tr>
    </tbody>
  </table>

  <input id="BtnSayCurrentWord" type="button" value="Repeat Word" />&nbsp;
  <input id="BtnShowCurrentWord" type="button" value="Show Hint" />

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
    public templatePowerupMathProblem = `
<div>
  <div class="powerupMathProblem" id="DivPowerupMathProblem">
    <span>Problem</span>: <b><span id="CurrentMathProblem">{{CurrentMathProblem.expression}} = </span></b>
    <input id='InputMathAnswer' type='text' class='txtInputMathAnswer'> <input id='SubmitMathAnswer' type='button' value='Enter'>
  </div>
</div>
`;
    public templateWordListing = `
<optgroup>
  {{#each this}}
  <option>{{this}}</option>
  {{/each}}
</optgroup>
`;

    constructor(arena:BO.Game){
      this.game = arena;
      this.render(arena);
      this.wireup();
      return this;  
    }
    render = (game: BO.Game):GameUI =>{
      this.el                    = HBRender.renderTemplate(this.template, game);
      this.tdGoodGuy             = <HTMLTableCellElement>this.el.querySelector("#GoodGuyCell");
      this.tdBadGuy              = <HTMLTableCellElement>this.el.querySelector("#BadGuyCell");
      this.tdGoodGuyMinions      = <HTMLTableCellElement>this.el.querySelector("#GoodGuyMinionsCell");
      this.tdBadGuyMinions       = <HTMLTableCellElement>this.el.querySelector("#BadGuyMinionsCell");
      this.divGoodGuyPortrait    = <HTMLDivElement>this.el.querySelector("#DivGoodGuyPortrait");
      this.divBadGuyPortrait     = <HTMLDivElement>this.el.querySelector("#DivBadGuyPortrait");
      this.divAdminPanel         = <HTMLDivElement>this.el.querySelector("#DivAdminSettingsPanel");
      this.divModalWindow        = <HTMLDivElement>this.el.querySelector("#ModalWindow");
      this.divModalContent       = <HTMLDivElement>this.el.querySelector("#ModalContent");
      this.btnUsePowerup         = <HTMLInputElement>this.el.querySelector("#BtnUsePowerup");
      this.btnShowCurrentWord    = <HTMLInputElement>this.el.querySelector("#BtnShowCurrentWord");
      this.btnSayCurrentWord     = <HTMLInputElement>this.el.querySelector("#BtnSayCurrentWord");
      this.btnSubmitWordAnswer   = <HTMLInputElement>this.el.querySelector("#BtnSubmitButton");
      this.selWordPicker         = <HTMLSelectElement>this.el.querySelector("#SelWordPicker");

      if ( this.game.Settings.GameMode === BO.GameMode.admin ){
        this.renderAdminPanel();
        setTimeout(() => {this.showAdminPanel(false);}, 1000);
      }

      this.renderScene(game.CurrentScene);
      this.renderWordListing(this.game.WordSelector.getListOfWordsAtLevel(this.game.Settings.CurrentLevel));
      this.renderGoodGuy();
      this.renderBadGuy();
      this.renderRoster();
      this.resetForm();
      
      return this;
    }
    renderScene(scene:BO.IScene):GameUI {
      document.body.style.backgroundImage  = "url('" + this.game.CurrentScene.bgImageUrl + "')";
      document.body.style.backgroundSize   = "100%";
      document.body.style.backgroundRepeat = "no-repeat";
      return this;  
    };

    renderAdminPanel(){
      this.divAdminPanel.appendChild(
        this.game.Settings.UI.render());

      document.body.appendChild(this.divAdminPanel);
    }

    showAdminPanel(b:boolean){
      if ( b ){
        this.divAdminPanel.style.left = "0";  
      }
      else {
        this.divAdminPanel.style.left = '-25%';  
      }
    }

    renderGoodGuy(){
      this.renderCharacter(this.game.GoodGuy, this.tdGoodGuy);
      this.renderCharacterPortrait(this.game.GoodGuy, this.divGoodGuyPortrait);
      this.renderGoodGuyMinions();
      console.log(this.game.GoodGuy.minions);
    }

    renderBadGuy(){
      this.renderCharacter(this.game.BadGuy, this.tdBadGuy);
      this.renderCharacterPortrait(this.game.BadGuy, this.divBadGuyPortrait);
      this.renderBadGuyMinions();

      this.game.BadGuy.UI.el.onclick = (e) => {
        this.setEnemyAsCurrentTarget(this.game.BadGuy);
      }
    }

    renderGoodGuyMinions() {
      this.renderCharacterMinions(this.game.GoodGuy, this.tdGoodGuyMinions);
    }

    renderBadGuyMinions(){
      this.renderCharacterMinions(this.game.BadGuy, this.tdBadGuyMinions);

      this.game.BadGuy.minions.forEach( (minion) => {
        minion.UI.el.onclick = (e) => {
          this.setEnemyAsCurrentTarget(minion);
        }
      });
    }


    renderCharacter(character:BO.IDamageable, el:HTMLElement):GameUI{
      el.innerHTML = "";
      el.appendChild(character.UI.render());
      return this;  
    }

    renderCharacterPortrait(character:BO.Character, div:HTMLDivElement):GameUI{
      
      var foo = new CharacterPortraitUI(character);

      div.innerHTML = "";
      div.appendChild(foo.render());
      return this;
    }


    renderCharacterMinions(character:BO.Character, td:HTMLTableCellElement):GameUI{
      
      td.innerHTML = "";

      character.minions.forEach((minion) => {
        td.appendChild(minion.UI.render());
      });

      return this;  
    }

    renderRoster(){
      var rosterHook = document.getElementById("RosterHook");

      if ( rosterHook ){
        rosterHook.innerHTML = "";
        rosterHook.parentElement.removeChild(rosterHook); 
      }

      var div = document.createElement("div");
      div.setAttribute("id", "RosterHook");
      div.appendChild(this.game.Roster.UI.render());
      document.body.appendChild(div);
    }

    saveSettings(){
      var settings = this.game  
    }

    setEnemyAsCurrentTarget(enemy:BO.IDamageable){

      this.unsetCurrentTarget();
      
      this.game.CurrentTarget = enemy;
      enemy.UI.showAsCurrentTarget(true);
    }

    unsetCurrentTarget(){
      if ( this.game.CurrentTarget != undefined ){
        this.game.CurrentTarget.UI.showAsCurrentTarget(false);  
        this.game.CurrentTarget = null;
      }  
    }

    renderWordListing(list:Array<string>){
      this.selWordPicker.innerHTML = "";

      // We have to set the size of the select manually because
      // we aren't using the "multiple" attribute (because we only
      // want the kids to be able to pick a single word)
      this.selWordPicker.size = list.length;
      this.selWordPicker.appendChild(
        HBRender.renderTemplate(this.templateWordListing, list));
      
      setTimeout(()=>{
        var w = this.selWordPicker.offsetWidth + "px";
        this.btnSubmitWordAnswer.style.width   = w;
        this.btnUsePowerup.style.width = w;
      },10);
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
    showNewMathProblem(){
      this.game.cycleToNextMathProblem();
      this.showModalWindow(true);
      this.renderModalContent(this.templatePowerupMathProblem, this.game);

      var elTxtInput  = <HTMLInputElement>this.divModalWindow.querySelector("#InputMathAnswer");
      var enterButton = <HTMLInputElement>this.divModalContent.querySelector("#SubmitMathAnswer");
      
      enterButton.onclick = (e) =>{
        var userGotMathAnswerRight = this.game.numberMatchesCurrentMathProblemAnswer(parseInt(elTxtInput.value.trim()));

        if ( userGotMathAnswerRight ){
          this.runUserGotMathAnswerRight();  
        }
        else {
          this.runUserGotMathAnswerWrong();  
        }

        this.showModalWindow(false);

        this.showNewMathProblemButton(
          this.game.GoodGuy.currentPowerups > 0 ? true : false);  

      }
    }
    showNewMathProblemButton(b:boolean){
      var $el = $(this.btnUsePowerup);
      if (b) { $el.show(); }
      else { $el.hide(); }
    }
    runUserGotMathAnswerWrong(){
      this.game.decreaseCharacterPowerups(this.game.GoodGuy, 1);
      this.renderGoodGuy();
      this.game.playWrongAnswerSound();
      this.game.speak(`Incorrect. The correct answer was ${this.game.CurrentMathProblem.accepts[0]}`);
    }
    runUserGotMathAnswerRight(){
      // Let's not take away the powerup if the user gets the answer right.
      //this.game.decreaseCharacterPowerups(this.game.GoodGuy, 1);
      this.game.increaseCharacterHealth(this.game.GoodGuy, 1);
      this.renderGoodGuy();
      this.game.speak("Correct. Powerup Rewarded!");
      this.game.playCorrectAnswerSound();
    }
    
    resetForm(){
      $(this.selWordPicker).val([]);
    }
    

    wireup():GameUI{
      
      var self  = this;
      var game  = this.game;
      var voice = this.game.GameVoice;

      voice.speak("Game is starting");
      voice.speak("Get Ready");
      voice.speak("The first word is ");
      this.game.speakCurrentWordAndPhrase();


      this.btnUsePowerup.onclick = (e) => {
        this.showNewMathProblem();
      };

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

      this.btnSubmitWordAnswer.onclick = (e) => {

        var enteredWord   = this.selWordPicker.value;
        var isCorrectWord = game.checkWordMatchesCurrentWord(enteredWord);
        var enemy         = game.CurrentTarget;

        if ( !enemy ){
          self.game.speak("Please select a target");
          return;  
        }

        if ( enemy.currentHealth === 0 ) {
          self.game.speak("That target is already defeated. Please select another target");
          return;
        }
        
        if (isCorrectWord) {
          var cntDamage = self.game.HasUsedCurrentWordHint ? 1 : 2;
          self.game.reduceCharacterHealth(game.CurrentTarget, cntDamage);
          self.renderBadGuy();
          self.game.playCorrectAnswerSound();
          self.game.speak("That's right!");
          self.game.cycleToNextWord();
          self.showShowCurrentWordButton(true);
          self.game.HasUsedCurrentWordHint = false;
          self.resetForm();
        }
        else {
          self.game.reduceCharacterHealth(self.game.GoodGuy, 1);
          self.showShowCurrentWordButton(true);
          self.renderGoodGuy();
          self.game.playWrongAnswerSound();
          self.showShowCurrentWordButton(true);
          self.game.speak("Try again!");
          self.game.speak("The word is ");
          self.game.speakCurrentWordAndPhrase();
        }
        

        // reset the target to nothing. the user needs to 
        // select the bad guy they want to target
        self.unsetCurrentTarget();

        if (!self.game.checkAllEnemiesOnLevelAreDefeated()) {
          self.game.speak("The next word is ");
          self.game.speakCurrentWordAndPhrase();
        }
        else {
          self.game.speak("Mega Man Wins!");
          setTimeout(()=>{

            if ( self.game.BadGuy === self.game.Roster.BadGuys[self.game.Roster.BadGuys.length -1] ){
              self.game.unlockSecretLevel();  
            }


            self.game.cycleToNextBadGuy();
            self.game.cycleToNextScene();
            self.renderRoster();
            self.renderScene(self.game.CurrentScene);
            self.game.speakCurrentBadGuyIntro();
            self.renderBadGuy();
            self.game.cycleToNextWord();
            self.showShowCurrentWordButton(true);
            self.game.HasUsedCurrentWordHint = false;
            self.game.speak("The next word is ");
            self.game.speakCurrentWordAndPhrase();
          }, self.game.Settings.HintDuration);
        }
      };

      return this;  
    }


    cycleToNextBadGuy(){
      this.game.cycleToNextBadGuy();
      this.renderBadGuy();
      return this;
    }

    cycleToPreviousBadGuy() {
      this.game.cycleToPreviousBadGuy();
      this.renderBadGuy();
      return this;
    }

  }  
} 