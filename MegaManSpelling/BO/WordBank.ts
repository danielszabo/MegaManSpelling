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
      { word: "red",    accepts : ["red"],              usage: "My favorite color is red" },
      { word: "she",    accepts : ["she"],              usage: "She asked if she could play with the toy" },
      { word: "that",   accepts : ["that"],             usage: "The boy likes that toy very much" },
      { word: "the",    accepts : ["the"],              usage: "The boy played with the toy" },
      { word: "them",   accepts : ["them"],             usage: "The boy said he wants to play with them" },
      { word: "was",    accepts : ["was"],              usage: "The boy was at the store with his mother" },
      { word: "where",  accepts : ["where"],            usage: "The boy wanted to know where his mother was going" },
      { word: "with",   accepts : ["with"],             usage: "The boy wanted to go with his mother" },
      { word: "you",    accepts : ["you"],              usage: "The boy told his mother I love you!" }];

    public Level2Words: Array<IWordBankEntry> = [
      { word: "animal",    accepts: ["animal"],    usage: "A deer is an animal." },
      { word: "angry",     accepts: ["angry"],     usage: "When Kaleb doesn't listen, Mommy gets angry." },
      { word: "apple",     accepts: ["apple"],     usage: "Kaleb likes to snack on an apple." },
      { word: "baby",      accepts: ["baby"],      usage: "Zoe loves her baby dolls." },
      { word: "banana",    accepts: ["banana"],    usage: "Do you want a banana?" },
      { word: "below",     accepts: ["below"],     usage: "The minions wait below the banana tree." },
      { word: "bird",      accepts: ["bird"],       usage: "A bird sits in the banana tree." },
      { word: "blue",      accepts: ["blue"],      usage: "A blue bird sits in the banana tree." },
      { word: "easy",      accepts: ["easy"],      usage: "Spelling is almost too easy for Kaleb." },
      { word: "curious",   accepts: ["curious"],   usage: "George was a good little monkey and always very curious." },
      { word: "corn",      accepts: ["corn"],      usage: "Corn on the cobb is tasty." },
      { word: "hide",      accepts: ["hide"],      usage: "Hide and seek is a fun game." },
      { word: "funny",     accepts: ["funny"],     usage: "The minions are really funny little yellow guys." },
      { word: "green",     accepts: ["green"],      usage: "Kaleb turns green when he eats food that he does not like." },
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
      { word: "sheesh",    accepts: ["sheesh"],     usage: "All right all right SHEESH!" },
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
      { word: "there",     accepts: ["there"],      usage: "Let's go over there." },
      { word: "their",     accepts: ["their"],     usage: "Their kids were stomping around." },
      { word: "they",      accepts: ["they"],      usage: "They did not know their feet were so loud on the floor." },
      { word: "those",     accepts: ["those"],     usage: "Those kids did not know how loud they were being." },
      { word: "wash",      accepts: ["wash"],      usage: "Mommy always makes us wash our hands." },
      { word: "yellow",    accepts: ["yell"],      usage: "George was friends with the man in the yellow hat." }];

    public Level3Words: Array<IWordBankEntry> = [
      { word: "above",      accepts: ["above"],      usage: "Planes fly above you in the sky." },
      { word: "batch",      accepts: ["batch"],      usage: "The farmer harvested a batch of potatos"},
      { word: "beat",       accepts: ["beat"],       usage: "The winning team beat the losing team." },
      { word: "bowl",       accepts: ["bowl"],       usage: "Daddy makes Kaleb a bowl of oatmeal for breakfast" },
      { word: "catch",      accepts: ["catch"],      usage: "Daddy likes to play catch with Kaleb." },
      { word: "chain",      accepts: ["chain"],      usage: "The dog was tied to the doghouse with a chain." },
      { word: "chat",       accepts: ["chat"],       usage: "Kaleb likes to chat a lot before bedtime." },
      { word: "chicken",    accepts: ["chicken"],    usage: "The farmer feeds his chickens every morning." },
      { word: "chill",      accepts: ["chill"],      usage: "Mommy told Zoe to chill out." },
      { word: "chin",       accepts: ["chin"],       usage: "Kaleb punched daddy in the chin when they were wrestling." },
      { word: "church",     accepts: ["church"],     usage: "People go to church to pray." },
      { word: "cracker",    accepts: ["cracker"],    usage: "Kaleb likes to put cheese on his crackers." },
      { word: "grape",      accepts: ["grape"],      usage: "Zoe loves to eat grapes!" },
      { word: "grease",     accepts: ["grease"],     usage: "There was a lot of grease on the stove after daddy made dinner." },
      { word: "high",       accepts: ["high"],       usage: "Planes fly high up in the sky!" },
      { word: "jelly",      accepts: ["jelly"],      usage: "Zoe loves peanut butter and jelly sandwiches." },
      { word: "juice",      accepts: ["juice"],      usage: "Zoe loves juice mixed into her water." },
      { word: "match",      accepts: ["match"],      usage: "Kaleb and daddy had a wrestling match." },
      { word: "matches",    accepts: ["matches"],    usage: "Playing with matches is dangerous!" },
      { word: "orange",     accepts: ["orange"],     usage: "Kaleb had an orange in his lunch." },
      { word: "pitch",      accepts: ["pitch"],      usage: "Kaleb likes to pitch when he plays baseball." },
      { word: "pitcher",    accepts: ["pitcher"],    usage: "Kaleb could be a pitcher on a baseball team" },
      { word: "potato",     accepts: ["potato"],     usage: "The farmer only grew one potato this year. It'll be a hard winter." },
      { word: "purple",     accepts: ["purple"],     usage: "Barney is a big purple dinosaur!" },
      { word: "sick",       accepts: ["sick"],       usage: "When little boys don't wash their hands they usually get sick." },
      { word: "soda",       accepts: ["soda"],       usage: "Kaleb tried to sneak a sip of daddy's soda pop." },
      { word: "steam",      accepts: ["steam"],      usage: "Some trains used to run on steam. They were called steam engines!" },
      { word: "switch",     accepts: ["switch"],     usage: "The train passenger asked if he could switch to a window seat." },
      { word: "team",       accepts: ["team"],       usage: "Should we sign Kaleb up to play for a soccer team?" },
      { word: "tease",      accepts: ["tease"],      usage: "Its not nice to tease other kids at school." },
      { word: "thanks",     accepts: ["thanks"],     usage: "Kaleb said thanks for the snack!" },
      { word: "treat",      accepts: ["treat"],      usage: "If Kaleb is a good boy sometimes he gets a treat." },
      { word: "under",      accepts: ["under"],      usage: "Maybe the toy is under the couch!" },
      { word: "watch",      accepts: ["watch"],      usage: "Zoe likes to wake up and watch Daniel Tiger." },
      { word: "watches",    accepts: ["watches"],    usage: "A watch collector has lots of watches." },
      { word: "watermelon", accepts: ["watermelon"], usage: "Watermelon is one of daddy's favorite foods!" },
      { word: "welcome",    accepts : ["welcome"],    usage: "When someone says thank you its nice to respond with Your Welcome!"}];

    public Level4Words : Array<IWordBankEntry> = [
      { word: "above",      accepts: ["above"],      usage: "Planes fly above you in the sky." },
      { word: "animal",     accepts: ["animal"],     usage: "A deer is an animal." },
      { word: "angry",      accepts: ["angry"],      usage: "When Kaleb doesn't listen, Mommy gets angry." },
      { word: "apple",      accepts: ["apple"],      usage: "Kaleb likes to snack on an apple." },
      { word: "baby",       accepts: ["baby"],       usage: "Zoe loves her baby dolls." },
      { word: "banana",     accepts: ["banana"],     usage: "Do you want a banana?" },
      { word: "batch",      accepts: ["batch"],      usage: "The farmer harvested a batch of potatos" },
      { word: "beat",       accepts: ["beat"],       usage: "The winning team beat the losing team." },
      { word: "below",      accepts: ["below"],      usage: "The minions wait below the banana tree." },
      { word: "bird",       accepts: ["bird"],        usage: "A bird sits in the banana tree." },
      { word: "blue",       accepts: ["blue"],       usage: "A blue bird sits in the banana tree." },
      { word: "bowl",       accepts: ["bowl"],       usage: "Daddy makes Kaleb a bowl of oatmeal for breakfast" },
      { word: "curious",    accepts: ["curious"],    usage: "George was a good little monkey and always very curious." },
      { word: "catch",      accepts: ["catch"],      usage: "Daddy likes to play catch with Kaleb." },
      { word: "chain",      accepts: ["chain"],      usage: "The dog was tied to the doghouse with a chain." },
      { word: "chat",       accepts: ["chat"],       usage: "Kaleb likes to chat a lot before bedtime." },
      { word: "chicken",    accepts: ["chicken"],    usage: "The farmer feeds his chickens every morning." },
      { word: "chill",      accepts: ["chill"],      usage: "Mommy told Zoe to chill out." },
      { word: "chin",       accepts: ["chin"],       usage: "Kaleb punched daddy in the chin when they were wrestling." },
      { word: "church",     accepts: ["church"],     usage: "People go to church to pray." },
      { word: "corn",       accepts: ["corn"],       usage: "Corn on the cobb is tasty." },
      { word: "cracker",    accepts: ["cracker"],    usage: "Kaleb likes to put cheese on his crackers." },
      { word: "down",       accepts: ["down"],       usage: "Mommy told Kaleb to get down off the table." },
      { word: "easy",       accepts: ["easy"],       usage: "Spelling is almost too easy for Kaleb." },
      { word: "hide",       accepts: ["hide"],       usage: "Hide and seek is a fun game." },
      { word: "funny",      accepts: ["funny"],      usage: "The minions are really funny little yellow guys." },
      { word: "green",      accepts: ["green"],       usage: "Kaleb turns green when he eats food that he does not like." },
      { word: "grape",      accepts: ["grape"],      usage: "Zoe loves to eat grapes!" },
      { word: "grease",     accepts: ["grease"],     usage: "There was a lot of grease on the stove after daddy made dinner." },
      { word: "high",       accepts: ["high"],       usage: "Planes fly high up in the sky!" },
      { word: "jelly",      accepts: ["jelly"],      usage: "Zoe loves peanut butter and jelly sandwiches." },
      { word: "juice",      accepts: ["juice"],      usage: "Zoe loves juice mixed into her water." },
      { word: "inside",     accepts: ["inside"],     usage: "Kaleb has to come inside when it gets cold outside." },
      { word: "lion",       accepts: ["lion"],       usage: "Kalebs mom is a lion in the bedroom." },
      { word: "look",       accepts: ["look"],       usage: "Kaleb put on the costume and said look at me!" },
      { word: "mash",       accepts: ["mash"],       usage: "Mommy likes to mash potatos." },
      { word: "match",      accepts: ["match"],      usage: "Kaleb and daddy had a wrestling match." },
      { word: "matches",    accepts: ["matches"],    usage: "Playing with matches is dangerous!" },
      { word: "mean",       accepts: ["mean"],       usage: "Zoe gets mean when she sees Kaleb with a helicopter." },
      { word: "open",       accepts: ["open"],       usage: "Please open the door" },
      { word: "outside",    accepts: ["outside"],    usage: "Outside the window George saw a bunch of little ducks." },
      { word: "over",       accepts: ["over"],       usage: "Dorothy flew over the rainbow." },
      { word: "orange",     accepts: ["orange"],     usage: "Kaleb had an orange in his lunch." },
      { word: "pancakes",   accepts: ["pancakes"],   usage: "Kaleb likes to put syrup on his pancakes." },
      { word: "paperclip",  accepts: ["paperclip"],  usage: "Mommy makes paper stick together with a paperclip." },
      { word: "pitch",      accepts: ["pitch"],      usage: "Kaleb likes to pitch when he plays baseball." },
      { word: "pitcher",    accepts: ["pitcher"],    usage: "Kaleb could be a pitcher on a baseball team" },
      { word: "potato",     accepts: ["potato"],     usage: "The farmer only grew one potato this year. It'll be a hard winter." },
      { word: "purple",     accepts: ["purple"],     usage: "Barney is a big purple dinosaur!" },
      { word: "sleep",      accepts: ["sleep"],      usage: "Kaleb needs to go to sleep." },
      { word: "sleepy",     accepts: ["sleepy"],     usage: "Kaleb gets sleepy when he stays up to late." },
      { word: "sheesh",     accepts: ["shees"],      usage: "All right all right SHEESH!" },
      { word: "shock",      accepts: ["shock"],      usage: "You'll get a shock if you play with electricity." },
      { word: "sick",       accepts: ["sick"],       usage: "When little boys don't wash their hands they usually get sick." },
      { word: "snack",      accepts: ["snack"],      usage: "Kaleb likes to eat a snack before bed." },
      { word: "soda",       accepts: ["soda"],       usage: "Kaleb tried to sneak a sip of daddy's soda pop." },
      { word: "steam",      accepts: ["steam"],      usage: "Some trains used to run on steam. They were called steam engines!" },
      { word: "switch",     accepts: ["switch"],     usage: "The train passenger asked if he could switch to a window seat." },
      { word: "show",       accepts: ["show"],       usage: "Kaleb likes to watch a show before dinner." },
      { word: "star",       accepts: ["star"],       usage: "There was a bright star in the sky." },
      { word: "stem",       accepts: ["stem"],       usage: "Mommy held the rose by the stem while smelling it." },
      { word: "stole",      accepts: ["stole"],      usage: "Kaleb stole the show with his smile." },
      { word: "stop",       accepts: ["stop"],       usage: "When Zoe screams at daddy in the backtub Daddy says STOP." },
      { word: "sweet",      accepts: ["sweet"],      usage: "Kaleb can be sweet when he wants to." },
      { word: "swim",       accepts: ["swim"],       usage: "Kaleb loves to swim when its hot." },
      { word: "team",       accepts: ["team"],       usage: "Should we sign Kaleb up to play for a soccer team?" },
      { word: "tease",      accepts: ["tease"],      usage: "Its not nice to tease other kids at school." },
      { word: "thanks",     accepts: ["thanks"],     usage: "Kaleb said thanks for the snack!" },
      { word: "that",       accepts: ["that"],       usage: "Kaleb saw something he wanted and said I want that!" },
      { word: "there",      accepts: ["there"],       usage: "Let's go over there." },
      { word: "their",      accepts: ["their"],      usage: "Their kids were stomping around." },
      { word: "they",       accepts: ["they"],       usage: "They did not know their feet were so loud on the floor." },
      { word: "those",      accepts: ["those"],      usage: "Those kids did not know how loud they were being." },
      { word: "treat",      accepts: ["treat"],      usage: "If Kaleb is a good boy sometimes he gets a treat." },
      { word: "under",      accepts: ["under"],      usage: "Maybe the toy is under the couch!" },
      { word: "wash",       accepts: ["wash"],       usage: "Mommy always makes us wash our hands." },
      { word: "watch",      accepts: ["watch"],      usage: "Zoe likes to wake up and watch Daniel Tiger." },
      { word: "watches",    accepts: ["watches"],    usage: "A watch collector has lots of watches." },
      { word: "watermelon", accepts: ["watermelon"], usage: "Watermelon is one of daddy's favorite foods!" },
      { word: "welcome",    accepts: ["welcome"],    usage: "When someone says thank you its nice to respond with Your Welcome!" },
      { word: "yellow",     accepts: ["yellow"],       usage: "George was friends with the man in the yellow hat." }];
  }
  
  export class WordSelector{
    
    WordBank : WordBank = new WordBank();

    chooseRandomWordFromBank(level:number):IWordBankEntry{
      var min  = 0,
          wordlist: Array<IWordBankEntry> = null;
      
      wordlist = this.getWordListAtLevel(level);

      var max  = wordlist.length - 1;
      var rand = Math.floor(Math.random() * (max - min + 1)) + min;
      
      return wordlist[rand];
    }

    getWordListAtLevel(level:number):Array<IWordBankEntry>{
      var wordlist: Array<IWordBankEntry>;
      wordlist = (level == 1) ? this.WordBank.Level1Words
        : (level === 2) ? this.WordBank.Level2Words
          : (level === 3) ? this.WordBank.Level3Words
            : (level === 4) ? this.WordBank.Level4Words
              : (level > 4) ? this.WordBank.Level4Words : this.WordBank.Level1Words;
     
      return wordlist.sort();
    }

    getListOfWordsAtLevel(level:number):Array<string>{
      var results:Array<string>;
      var wordlist:Array<IWordBankEntry>;
      wordlist = (level == 1) ? this.WordBank.Level1Words
        : (level === 2) ? this.WordBank.Level2Words
          : (level === 3) ? this.WordBank.Level3Words
            : (level === 4) ? this.WordBank.Level4Words
              : (level > 4) ? this.WordBank.Level4Words : this.WordBank.Level1Words;
     
      results = wordlist.map(function(iwe){
        return iwe.word;
      });

      return results.sort();
    }
  } 
} 