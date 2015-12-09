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
      { word : "all",   accepts : ["all"],              usage: "The mother loved all her children"},
      { word: "are",    accepts : ["are"],              usage: "The children are happy" },
      { word: "butter", accepts : ["butter"],           usage: "I would like butter on my toast" },
      { word: "by",     accepts : ["by", "bye", "buy"], usage: "He rode his bike by the store" },
      { word: "call",   accepts : ["call"],             usage: "Can I call you on the telephone" },
      { word: "come",   accepts : ["come"],             usage: "The mother asked the boy to come here" },
      { word: "fix",    accepts : ["fix"],              usage: "The child wanted to fix the toy" },
      { word: "he",     accepts : ["he"],               usage: "The boy asked if he could play with the toy" },
      { word: "here",   accepts : ["here", "hear"],     usage: "Can you come over here please" },
      { word: "of",     accepts : ["of"],               usage: "In the nick of time" },
      { word: "off",    accepts : ["off"],              usage: "The boy asked his sister to get off him" },
      { word: "one",    accepts : ["one", "won"],       usage: "The boy counted one two three!" },
      { word: "red",    accepts : ["red"],              usage: "The girl likes the color red" },
      { word: "she",    accepts : ["she"],              usage: "The girl asked if she could play with the toy" },
      { word: "that",   accepts : ["that"],             usage: "The boy said he likes that toy very much" },
      { word: "the",    accepts : ["the"],              usage: "The boy asked the little girl about the toy" },
      { word: "them",   accepts : ["them"],             usage: "The boy said he wants to play with them" },
      { word: "was",    accepts : ["was"],              usage: "The boy was at the store with his mother" },
      { word: "where",  accepts : ["where"],            usage: "The boy wanted to know where his mother was going" },
      { word: "with",   accepts : ["with"],             usage: "The boy wanted to know if he could go with his mother" },
      { word: "you",    accepts : ["you"],              usage: "The boy told his mother I love you!" }];

    public Level2Words: Array<IWordBankEntry> = [
      { word: "animal",    accepts: ["animal"],    usage: "A deer is an animal." },
      { word: "angry",     accepts: ["angry"],     usage: "When Kaleb doesn't listen, Mommy gets angry." },
      { word: "apple",     accepts: ["apple"],     usage: "Kaleb likes to snack on an apple." },
      { word: "baby",      accepts: ["baby"],      usage: "Zoe loves her baby dolls." },
      { word: "banana",    accepts: ["banana"],    usage: "Do you want a banana?" },
      { word: "below",     accepts: ["below"],     usage: "The minions wait below the banana tree." },
      { word: "bird",      accepts: ["bir"],       usage: "A bird sits in the banana tree." },
      { word: "blue",      accepts: ["blue"],      usage: "A blue bird sits in the banana tree." },
      { word: "easy",      accepts: ["easy"],      usage: "Spelling is almost too easy for Kaleb." },
      { word: "curious",   accepts: ["curious"],   usage: "George was good little and always very curious." },
      { word: "corn",      accepts: ["corn"],      usage: "Corn on the cobb is tasty." },
      { word: "hide",      accepts: ["hide"],      usage: "Hide and seek is a fun game." },
      { word: "funny",     accepts: ["funny"],     usage: "The minions are really funny little yellow guys." },
      { word: "green",     accepts: ["gree"],      usage: "Kaleb turns green when he eats food that he does not like." },
      { word: "inside",    accepts: ["inside"],    usage: "Kaleb has to come inside when it gets cold outside." },
      { word: "lion",      accepts: ["lion"],      usage: "Kalebs mom is a lion in the bedroom." },
      { word: "look",      accepts: ["look"],      usage: "Kaleb put on the costume and said look at me!" },
      { word: "mash",      accepts: ["mash"],      usage: "Mommy likes to mash potatos." },
      { word: "mean",      accepts: ["mean"],      usage: "Zoe gets mean when she sees Kaleb with a helicopter." },
      { word: "down",      accepts: ["down"],      usage: "Mommy told Kaleb to get down off the table." },
      { word: "open",      accepts: ["open"],      usage: "Please open the door" },
      { word: "outside",   accepts: ["outside"],   usage: "Outside the window George saw a bunch of little ducks." },
      { word: "over",      accepts: ["over"],      usage: "Dorothy flew over the rainbow." },
      { word: "pancakes",  accepts: ["pancakes"],  usage: "Kaleb likes to put syrup on his pancakes." },
      { word: "paperclip", accepts: ["paperclip"], usage: "Mommy makes paper stick together with a paperclip." },
      { word: "sleep",     accepts: ["sleep"],     usage: "Kaleb needs to go to sleep." },
      { word: "sleepy",    accepts: ["sleepy"],    usage: "Kaleb gets sleepy when he stays up to late." },
      { word: "sheesh",    accepts: ["shees"],     usage: "All right all right SHEESH!" },
      { word: "snack",     accepts: ["snack"],     usage: "Kaleb likes to eat a snack before bed." },
      { word: "shock",     accepts: ["shock"],     usage: "You'll get a shock if you play with electricity." },
      { word: "show",      accepts: ["show"],      usage: "Kaleb likes to watch a show before dinner." },
      { word: "star",      accepts: ["star"],      usage: "There was a bright star in the sky." },
      { word: "stem",      accepts: ["stem"],      usage: "Mommy held the rose by the stem while smelling it." },
      { word: "stole",     accepts: ["stole"],     usage: "Kaleb stole the show with his smile." },
      { word: "stop",      accepts: ["stop"],      usage: "When Zoe screams at daddy in the backtub Daddy says STOP." },
      { word: "sweet",     accepts: ["sweet"],     usage: "Kaleb can be sweet when he wants to." },
      { word: "swim",      accepts: ["swim"],      usage: "Kaleb loves to swim when its hot." },
      { word: "that",      accepts: ["that"],      usage: "Kaleb saw something he wanted and said I want that!" },
      { word: "there",     accepts: ["ther"],      usage: "Let's go over there." },
      { word: "their",     accepts: ["their"],     usage: "Their kids were stomping around." },
      { word: "they",      accepts: ["they"],      usage: "They did not know their feet were so loud on the floor." },
      { word: "those",     accepts: ["those"],     usage: "Those kids did not know how loud they were being." },
      { word: "wash",      accepts: ["wash"],      usage: "Mommy always makes us wash our hands." },
      { word: "yellow",    accepts: ["yell"],      usage: "George was friends with the man in the yellow hat." }];

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