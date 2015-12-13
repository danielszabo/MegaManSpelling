/// <reference path="../../scripts/typings/handlebars/handlebars.d.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
class HBRender {

  public static init(){
    Handlebars.registerHelper('renderCharacterHealth', function (currentHealth, maxHealth) {
      var strHtml = "<div>";
      for( var i = 0; i < maxHealth; i++ ){

        strHtml += "<div class='characterHealthBlock ";

        if ( i < currentHealth ){strHtml += "full";} 
        else {strHtml += "empty";  }

        strHtml += "'></div>";
      }
      strHtml += "</div>";
      return new Handlebars.SafeString(strHtml);
    });

    Handlebars.registerHelper('renderCharacterPowerups', function (currentPowerups, maxPowerups) {
      var strHtml = "<div>";
      
      for (var i = 0; i < maxPowerups; i++) {

        strHtml += "<div class='characterPowerupBlock ";

        if (i < currentPowerups) { strHtml += "full"; }
        else { strHtml += "empty"; }

        strHtml += "'></div>";
      }
      strHtml += "</div>";
      return new Handlebars.SafeString(strHtml);
    });
  }

  public static renderTemplate(sourceHtml: string, viewModel: any): HTMLElement {
    //var source   = $("#entry-template").html();
    //var template = Handlebars.compile(source);
    //var context  = { title: "My New Post", body: "This is my first post!" };
    //var html     = template(context);
    var source   = sourceHtml;
    var template = Handlebars.compile(source);
    var context  = viewModel;
    var html     = template(context).trim();
    var div      = document.createElement("div");

    $(div).html(html);

    return <HTMLDivElement>div.firstElementChild;
  }
}