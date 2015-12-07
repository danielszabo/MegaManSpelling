module UI{
  export interface IUiElement{
    template      :string;
    el            :HTMLElement;
    render(context:any):any;
  }
} 