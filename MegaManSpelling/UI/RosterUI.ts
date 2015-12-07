module UI{
  export class RosterUI implements IUiElement{
    
    el     : HTMLElement;
    roster : BO.Roster;

    template : string = `
    <div class="Roster">
      {{#each BadGuys}}
      <div class='RosterPortrait' style="background-image:url('{{imageUrl}}')">
        <div class='RosterCharacterName'>{{name}}</div>
        <div class='RosterCharacterDifficulty'>{{difficulty}}</div>
      </div>
      {{/each}}
    </div>
`;

    constructor(roster:BO.Roster){
      this.roster = roster;
      this.el     = this.render();
      return this;
    }


    render() : HTMLElement{      
      this.el = HBRender.renderTemplate(this.template, this.roster);
      return this.el;
    }

  }  
} 