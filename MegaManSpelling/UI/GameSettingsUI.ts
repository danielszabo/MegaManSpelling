module UI {

  interface IAdminSettingsFormElements extends HTMLCollection {
    CurrentLevel  : HTMLInputElement;
    WordDifficulty: HTMLInputElement;
    PlayerName    : HTMLInputElement;
    HintDuration  : HTMLInputElement;
  }

  export class GameSettingsUI implements IUiElement {

    el: HTMLElement;
    gameSettings: BO.GameSettings;

    template: string = `
      <div class='SettingsPanel'>
        <div class='AdminSettingsPanel_rel'>
          <form id='formAdminSettings'>
            <table>
              <tbody>
                <tr><td>CurrentLevel</td><td><input name='CurrentLevel' type='text' value='{{CurrentLevel}}'/></td></tr>
                <tr><td>WordDifficulty</td><td><input name='WordDifficulty' type='text' value='{{WordDifficulty}}'/></td></tr>
                <tr><td>PlayerName</td><td><input name='PlayerName' type='text' value='{{PlayerName}}'/></td></tr>
                <tr><td>HintDuration</td><td><input name='HintDuration' type='text' value='{{HintDuration}}'/></td></tr>
                <tr>
                  <td></td>
                  <td><input type='button' value='Save' onclick='window.game.UI.saveSettings()'</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan='2'>
                    <input type='button' value='Prev Enemy' onclick='window.game.UI.cycleToPreviousBadGuy();' />
                    <input type='button' value='Next Enemy' onclick='window.game.UI.cycleToNextBadGuy();'/>
                  </td>
                </tr>
              </tfoot>
            </table>
          </form>
          <div class='AdminSettingsPanel_ShowHide'>
            <input type='button' value='&gt;&gt;' onclick='window.game.UI.showAdminPanel(true);'/><br/>
            <input type='button' value='&lt;&lt;' onclick='window.game.UI.showAdminPanel(false);'/>
          </div>
        </div>
      </div>
`;

    constructor(settings: BO.GameSettings) {
      this.gameSettings = settings;

      this.el = this.render();
      return this;
    }


    render(): HTMLElement {
      this.el = HBRender.renderTemplate(this.template, this.gameSettings);
      return this.el;
    }

    getSettings():BO.GameSettings{
      var settings     = new BO.GameSettings();
      var form         = <HTMLFormElement>this.el.querySelector("#formAdminSettings");
      var formElements = <IAdminSettingsFormElements>form.elements;

      settings.GameMode       = BO.GameMode.admin;
      settings.CurrentLevel   = parseInt( formElements.CurrentLevel.value.trim(), 10 );
      settings.HintDuration   = parseInt( formElements.HintDuration.value.trim(), 10 );
      settings.WordDifficulty = parseInt( formElements.WordDifficulty.value.trim(), 10 );
      settings.PlayerName     = formElements.PlayerName.value.trim();

      return settings;
    }
  }
}   