module UI{
  export class CharacterUI implements IUiElement{
    
    el        : HTMLElement;
    character : BO.Character

    template : string = `
      <div class='character'>
        <div class='characterName'>{{name}}</div>
        <div class='characterPic' style="background-image:url('{{imageUrl}}')"></div>
        {{#renderCharacterHealth currentHealth maxHealth}}{{/renderCharacterHealth}}
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

    putInJail():void{
      var d = document.createElement("div");
      d.className = "characterIsDeadoverlay";
      this.el.appendChild(d);
    }

  }  
} 