module UI {
  export class MinionUI implements IUiElement, ITargetable {

    el: HTMLElement;
    minion: BO.Minion;
    cssXAxisFlipClassName:string ;

    template: string = `
      <div class='minion highlightOnHover'>
        <img src="{{imageUrl}}" {{#if imageRequiresXAxisFlip}}class="XAxisFlip"{{/if}}/>
        {{#renderCharacterHealth currentHealth maxHealth}}{{/renderCharacterHealth}}
        {{#unless currentHealth}}
        <div class="characterIsDeadoverlay"></div>
        {{/unless}}
      </div>
`;

    constructor(minion: BO.Minion) {
      this.minion = minion;

      this.el = this.render();
      return this;
    }


    render(): HTMLElement {
      this.el = HBRender.renderTemplate(this.template, this.minion);
      return this.el;
    }

    showAsCurrentTarget(b: boolean) {
      if (b) {
        this.el.classList.remove("highlightOnHover");
        this.el.classList.add("currentlyTargeted");
      }
      else {
        this.el.classList.remove("currentlyTargeted");
        this.el.classList.add("highlightOnHover");
      }
    }

  }
}  