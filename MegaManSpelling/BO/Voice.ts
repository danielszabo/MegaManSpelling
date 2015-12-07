module BO{
  export class Voice{
  
    constructor(){}

    speak(phrase:string):any{
      var msg         = new SpeechSynthesisUtterance();
      var voices      = window.speechSynthesis.getVoices();
      msg.voice       = voices[1]; // Note: some voices don't support altering params
      msg["voiceURI"] = 'native';
      msg.volume      = 1; // 0 to 1
      msg.rate        = .8; // 0.1 to 10
      msg.pitch       = 1; //0 to 2
      msg.text        = phrase || 'i love you Kaleb Zaybo';
      msg.lang        = 'en-US';

      msg.onend = function (e) {
        console.log("DONE");
      };


      speechSynthesis.speak(msg);
    }
  }  
} 