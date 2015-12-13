module UI{
  export class RosterUI implements IUiElement{
    
    el     : HTMLElement;
    roster : BO.Roster;

    template : string = `
    <div class="Roster">
      {{#each BadGuys}}
      <div class='RosterPortrait' style="background-image:url('{{imageUrl}}')" data-level='{{difficulty}}'>
        <div class='RosterPortraitBG'></div>
        <div class='RosterCharacterName'>{{name}}</div>
        <div class='RosterCharacterDifficulty'>{{difficulty}}</div>
        {{#unless currentHealth}}
        <div class="characterIsDeadoverlay"></div>
        {{/unless}}
      </div>
      {{/each}}
    </div>
`;

    constructor(roster:BO.Roster){
      this.roster = roster;
     
      return this;
    }


    render() : HTMLElement{      
      this.el = HBRender.renderTemplate(this.template, this.roster);
      return this.el;
    }

  }  
} 