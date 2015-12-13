module UI{


  export interface ITargetable{
    showAsCurrentTarget(b:boolean);
    render():HTMLElement;
  }


  export class CharacterUI implements IUiElement, ITargetable{
    
    el        : HTMLElement;
    character : BO.Character

    template : string = `
      <div class='character highlightOnHover'>
<Br><br>
        <div class='characterPic' style="background-image:url('{{imageUrl}}')"></div>
        {{#unless currentHealth}}
        <div class="characterIsDeadoverlay"></div>
        {{/unless}}
      </div>
`;

    constructor(character:BO.Character){
      this.character = character;
      this.el        = this.render();

      return this;
    }

    render() : HTMLElement{      
      this.el = HBRender.renderTemplate(this.template, this.character);
      return this.el;
    }

    showAsCurrentTarget(b:boolean){
      if (b){
        this.el.classList.remove("highlightOnHover");
        this.el.classList.add("currentlyTargeted");  
      }
      else {
        this.el.classList.remove("currentlyTargeted");
        this.el.classList.add("highlightOnHover");  
      }
    }

  }  

  export class CharacterPortraitUI implements IUiElement {

    el: HTMLElement;
    character: BO.Character

    template: string = `
      <div class='characterPortrait'>
        <div class='characterPortrait_rel'>
          <div class='characterPortraitPic' style="background-image:url('{{portraitImgUrl}}')"></div>
          
          <div class='characterPortraitStats'>
            <div class='characterPortraitName'>{{name}}</div>
            {{#renderCharacterHealth currentHealth maxHealth}}{{/renderCharacterHealth}}
            {{#renderCharacterPowerups currentPowerups maxPowerups}}{{/renderCharacterPowerups}}
          </div>
        </div>
      </div>
`;

    constructor(character: BO.Character) {
      this.character = character;
      this.el = this.render();
      return this;
    }


    render(): HTMLElement {
      this.el = HBRender.renderTemplate(this.template, this.character);
      return this.el;
    }

  }  
} 