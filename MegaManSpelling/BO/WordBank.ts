module BO{
  
  export interface IWordBankEntry{
    word         :string;
    accepts      :Array<string>;
    usage :string;  
  }
  
  export class WordBank{
  
    constructor(){
      
    }

    public Level1Words:Array<IWordBankEntry> = [
      { word : "all",accepts : ["all"],usage: "The mother loved all her children"},
      { word: "are", accepts : ["are"], usage: "The children are happy" },
      { word: "butter", accepts : ["butter"], usage: "I would like butter on my toast" },
      { word: "by", accepts : ["by", "bye", "buy"], usage: "He rode his bike by the store" },
      { word: "call", accepts : ["call"], usage: "The child would like to make a call on the telephone" },
      { word: "come", accepts : ["come"], usage: "The mother asked the child to come here" },
      { word: "fix", accepts : ["fix"], usage: "The child wanted to fix the toy" },
      { word: "he", accepts : ["he"], usage: "The boy asked if he could play with the toy" },
      { word: "here", accepts : ["here", "hear"], usage: "Can you come over here please" },
      { word: "of", accepts : ["of"], usage: "In the nick of time" },
      { word: "off", accepts : ["off"], usage: "The boy asked his sister to get off him" },
      { word: "one", accepts : ["one", "won"], usage: "The boy counted one two three!" },
      { word: "red", accepts : ["red"], usage: "The girl likes the color red" },
      { word: "she", accepts : ["she"], usage: "The girl asked if she could play with the toy" },
      { word: "that", accepts : ["that"], usage: "The boy said he likes that toy very much" },
      { word: "the", accepts : ["the"], usage: "The boy asked the little girl about the toy" },
      { word: "them", accepts : ["them"], usage: "The boy said he wants to play with them" },
      { word: "was", accepts : ["was"], usage: "The boy was at the store with his mother" },
      { word: "where", accepts : ["where"], usage: "The boy wanted to know where his mother was going" },
      { word: "with", accepts : ["with"], usage: "The boy wanted to know if he could go with his mother" },
      { word: "you", accepts : ["you"], usage: "The boy told his mothre I love you!" }];

    public Level2Words:Array<string> = [
      "animal", 
      "angry", 
      "apple", 
      "baby", 
      "banana", 
      "below", 
      "bird",
      "blue", 
      "easy", 
      "curious", 
      "corn", 
      "hide", 
      "funny", 
      "green",
      "inside", 
      "lion", 
      "look", 
      "mash", 
      "mean", 
      "down", 
      "open", 
      "outside", 
      "over", 
      "pancake", 
      "paperclip", 
      "sleep", 
      "sleepy", 
      "sheesh",
      "snack", 
      "shock", 
      "show", 
      "star", 
      "stem", 
      "stole", 
      "stop", 
      "sweet", 
      "swim", 
      "that", 
      "there",
      "their", 
      "they", 
      "those", 
      "wash", 
      "yellow"];

    public Level3Words:Array<string> = [
      "above", 
      "batch",
      "beat", 
      "bowl", 
      "catch", 
      "chain", 
      "chat", 
      "chicken", 
      "chill", 
      "chin", 
      "church", 
      "cracker", 
      "grape", 
      "grease", 
      "high", 
      "jelly", 
      "juice", 
      "match",
      "matches", 
      "orange",
      "pitch", 
      "pitch", 
      "pitcher", 
      "potato", 
      "purple", 
      "sick", 
      "soda", 
      "steam", 
      "switch", 
      "team", 
      "tease", 
      "thanks", 
      "treat", 
      "under", 
      "watch", 
      "watches", 
      "watermelon", 
      "welcome"];
  }
  
  export class WordSelector{
    
    chooseRandomWordFromBank(bank:Array<IWordBankEntry>):IWordBankEntry{
      var min  = 0;
      var max  = bank.length - 1;
      var rand = Math.floor(Math.random() * (max - min + 1)) + min;
      
      return bank[rand];
    }
  } 
} 