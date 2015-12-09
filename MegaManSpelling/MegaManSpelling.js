var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
})();
var GameLauncher = (function () {
    function GameLauncher() {
    }
    GameLauncher.prototype.launch = function () {
        var gameSettings = new BO.GameSettings();
        var voice = new BO.Voice();
        var roster = new BO.Roster();
        var goodGuy = new BO.Character("MegaMan", "Images/MegaMan.png", 10, 10, 1);
        var badGuy = roster.BadGuys[gameSettings.CurrentLevel];
        var currentWord = new BO.WordSelector().chooseRandomWordFromBank(new BO.WordBank().Level2Words);
        var game = new BO.Game(gameSettings, voice, currentWord, goodGuy, badGuy);
        document.getElementById("content").appendChild(game.UI.el);
        var roster = new BO.Roster();
        document.body.appendChild(roster.UI.el);
        window["game"] = game;
    };
    return GameLauncher;
})();
window.onload = function () {
    //var el = document.getElementById('content');
    //var greeter = new Greeter(el);
    //greeter.start();
    HBRender.init();
    var gl = new GameLauncher();
    gl.launch();
};
var BO;
(function (BO) {
    var Character = (function () {
        function Character(name, imageUrl, currentHealth, maxHealth, difficulty) {
            this.name = name;
            this.imageUrl = imageUrl;
            this.currentHealth = currentHealth;
            this.maxHealth = maxHealth;
            this.difficulty = difficulty;
            this.UI = new UI.CharacterUI(this);
        }
        return Character;
    })();
    BO.Character = Character;
})(BO || (BO = {}));
var BO;
(function (BO) {
    var Game = (function () {
        function Game(gameSettings, gameVoice, currentWord, goodGuy, badGuy) {
            this.HasUsedCurrentWordHint = false;
            this.Settings = gameSettings;
            this.GameVoice = gameVoice;
            this.CurrentWord = currentWord;
            this.GoodGuy = goodGuy;
            this.BadGuy = badGuy;
            this.UI = new UI.GameUI(this);
        }
        Game.prototype.start = function () {
            return this;
        };
        /* Generates a new word for the user to guess and stores it in
         * the Game.CurrentWord field.
         * @method cycleToNextWord
         */
        Game.prototype.cycleToNextWord = function () {
            var newWord = new BO.WordSelector().chooseRandomWordFromBank(new BO.WordBank().Level1Words);
            if (newWord.word.toUpperCase() === this.CurrentWord.word.toUpperCase()) {
                this.cycleToNextWord();
                return;
            }
            this.CurrentWord = newWord;
        };
        Game.prototype.cycleToNextBadGuy = function () {
            var roster = new BO.Roster();
            this.Settings.CurrentLevel++;
            this.BadGuy = roster.BadGuys[this.Settings.CurrentLevel];
        };
        Game.prototype.wordMatchesCurrentWord = function (s) {
            return s === this.CurrentWord.word;
        };
        Game.prototype.increaseCharacterHealth = function (char, n) {
            char.currentHealth += n;
            // Don't let the character's health exceed it's max health
            if (char.currentHealth > char.maxHealth) {
                char.currentHealth = char.maxHealth;
            }
        };
        Game.prototype.reduceCharacterHealth = function (char, n) {
            char.currentHealth -= n;
            // Don't let the character's health counter fall below zero
            if (char.currentHealth < 0) {
                char.currentHealth = 0;
            }
        };
        Game.prototype.speakCurrentWordAndPhrase = function () {
            var voice = this.GameVoice;
            var word = this.CurrentWord.word;
            var phrase = this.CurrentWord.usage;
            voice.speak(word);
            voice.speak("As in ");
            voice.speak(phrase);
        };
        /*
         * Makes the game say something to the user
         * @method speak
         * @parameter {string} s The word or phrase to say to the user
         */
        Game.prototype.speak = function (s) {
            this.GameVoice.speak(s);
        };
        Game.prototype.speakCurrentBadGuyIntro = function () {
            var voice = this.GameVoice;
            voice.speak("Your next opponent is ");
            voice.speak(this.BadGuy.name);
        };
        Game.prototype.playCorrectAnswerSound = function () {
            var audio = new Audio('sounds/correctanswer.mp3');
            audio.play();
        };
        Game.prototype.playWrongAnswerSound = function () {
            var audio = new Audio('sounds/wronganswer.mp3');
            audio.play();
        };
        return Game;
    })();
    BO.Game = Game;
})(BO || (BO = {}));
var BO;
(function (BO) {
    var GameSettings = (function () {
        function GameSettings() {
            this.CurrentLevel = 0;
            this.WordDifficulty = 2; // [1|2|3] Determines which difficulty word bank to use
            this.PlayerName = "Kaleb";
            this.HintDuration = 6000;
        }
        return GameSettings;
    })();
    BO.GameSettings = GameSettings;
})(BO || (BO = {}));
var BO;
(function (BO) {
    var Roster = (function () {
        function Roster() {
            this.BadGuys = [
                new BO.Character("Spike Man", "Images/SpikeMan.png", 3, 3, 1),
                new BO.Character("Shovel Man", "Images/ShovelMan.png", 4, 4, 2),
                new BO.Character("Pencil Man", "Images/PencilMan.png", 5, 5, 3),
                new BO.Character("Doctor Porcupine", "Images/PorcupineMan.png", 6, 6, 4),
                new BO.Character("Blade Man", "Images/BladeMan.png", 7, 7, 5),
                new BO.Character("Alligator Man", "Images/AlligatorMan.png", 8, 8, 6),
                new BO.Character("Tornado Man", "Images/TornadoMan.png", 9, 9, 7),
                new BO.Character("Fire Man", "Images/FireMan.png", 10, 10, 8),
                new BO.Character("Dragon Man", "Images/DragonMan.png", 20, 20, 9)];
            this.UI = new UI.RosterUI(this);
        }
        return Roster;
    })();
    BO.Roster = Roster;
})(BO || (BO = {}));
var BO;
(function (BO) {
    var Voice = (function () {
        function Voice() {
        }
        Voice.prototype.speak = function (phrase) {
            var msg = new SpeechSynthesisUtterance();
            var voices = window.speechSynthesis.getVoices();
            msg.voice = voices[1]; // Note: some voices don't support altering params
            msg["voiceURI"] = 'native';
            msg.volume = 1; // 0 to 1
            msg.rate = .8; // 0.1 to 10
            msg.pitch = 1; //0 to 2
            msg.text = phrase || 'i love you Kaleb Zaybo';
            msg.lang = 'en-US';
            msg.onend = function (e) {
                console.log("DONE");
            };
            speechSynthesis.speak(msg);
        };
        return Voice;
    })();
    BO.Voice = Voice;
})(BO || (BO = {}));
var BO;
(function (BO) {
    var WordBank = (function () {
        function WordBank() {
            this.Level1Words = [
                { word: "all", accepts: ["all"], usage: "The mother loved all her children" },
                { word: "are", accepts: ["are"], usage: "The children are happy" },
                { word: "butter", accepts: ["butter"], usage: "I would like butter on my toast" },
                { word: "by", accepts: ["by", "bye", "buy"], usage: "He rode his bike by the store" },
                { word: "call", accepts: ["call"], usage: "Can I call you on the telephone" },
                { word: "come", accepts: ["come"], usage: "The mother asked the boy to come here" },
                { word: "fix", accepts: ["fix"], usage: "The child wanted to fix the toy" },
                { word: "he", accepts: ["he"], usage: "The boy asked if he could play with the toy" },
                { word: "here", accepts: ["here", "hear"], usage: "Can you come over here please" },
                { word: "of", accepts: ["of"], usage: "In the nick of time" },
                { word: "off", accepts: ["off"], usage: "The boy asked his sister to get off him" },
                { word: "one", accepts: ["one", "won"], usage: "The boy counted one two three!" },
                { word: "red", accepts: ["red"], usage: "The girl likes the color red" },
                { word: "she", accepts: ["she"], usage: "The girl asked if she could play with the toy" },
                { word: "that", accepts: ["that"], usage: "The boy said he likes that toy very much" },
                { word: "the", accepts: ["the"], usage: "The boy asked the little girl about the toy" },
                { word: "them", accepts: ["them"], usage: "The boy said he wants to play with them" },
                { word: "was", accepts: ["was"], usage: "The boy was at the store with his mother" },
                { word: "where", accepts: ["where"], usage: "The boy wanted to know where his mother was going" },
                { word: "with", accepts: ["with"], usage: "The boy wanted to know if he could go with his mother" },
                { word: "you", accepts: ["you"], usage: "The boy told his mother I love you!" }];
            this.Level2Words = [
                { word: "animal", accepts: ["animal"], usage: "A deer is an animal." },
                { word: "angry", accepts: ["angry"], usage: "When Kaleb doesn't listen, Mommy gets angry." },
                { word: "apple", accepts: ["apple"], usage: "Kaleb likes to snack on an apple." },
                { word: "baby", accepts: ["baby"], usage: "Zoe loves her baby dolls." },
                { word: "banana", accepts: ["banana"], usage: "Do you want a banana?" },
                { word: "below", accepts: ["below"], usage: "The minions wait below the banana tree." },
                { word: "bird", accepts: ["bir"], usage: "A bird sits in the banana tree." },
                { word: "blue", accepts: ["blue"], usage: "A blue bird sits in the banana tree." },
                { word: "easy", accepts: ["easy"], usage: "Spelling is almost too easy for Kaleb." },
                { word: "curious", accepts: ["curious"], usage: "George was good little and always very curious." },
                { word: "corn", accepts: ["corn"], usage: "Corn on the cobb is tasty." },
                { word: "hide", accepts: ["hide"], usage: "Hide and seek is a fun game." },
                { word: "funny", accepts: ["funny"], usage: "The minions are really funny little yellow guys." },
                { word: "green", accepts: ["gree"], usage: "Kaleb turns green when he eats food that he does not like." },
                { word: "inside", accepts: ["inside"], usage: "Kaleb has to come inside when it gets cold outside." },
                { word: "lion", accepts: ["lion"], usage: "Kalebs mom is a lion in the bedroom." },
                { word: "look", accepts: ["look"], usage: "Kaleb put on the costume and said look at me!" },
                { word: "mash", accepts: ["mash"], usage: "Mommy likes to mash potatos." },
                { word: "mean", accepts: ["mean"], usage: "Zoe gets mean when she sees Kaleb with a helicopter." },
                { word: "down", accepts: ["down"], usage: "Mommy told Kaleb to get down off the table." },
                { word: "open", accepts: ["open"], usage: "Please open the door" },
                { word: "outside", accepts: ["outside"], usage: "Outside the window George saw a bunch of little ducks." },
                { word: "over", accepts: ["over"], usage: "Dorothy flew over the rainbow." },
                { word: "pancakes", accepts: ["pancakes"], usage: "Kaleb likes to put syrup on his pancakes." },
                { word: "paperclip", accepts: ["paperclip"], usage: "Mommy makes paper stick together with a paperclip." },
                { word: "sleep", accepts: ["sleep"], usage: "Kaleb needs to go to sleep." },
                { word: "sleepy", accepts: ["sleepy"], usage: "Kaleb gets sleepy when he stays up to late." },
                { word: "sheesh", accepts: ["shees"], usage: "All right all right SHEESH!" },
                { word: "snack", accepts: ["snack"], usage: "Kaleb likes to eat a snack before bed." },
                { word: "shock", accepts: ["shock"], usage: "You'll get a shock if you play with electricity." },
                { word: "show", accepts: ["show"], usage: "Kaleb likes to watch a show before dinner." },
                { word: "star", accepts: ["star"], usage: "There was a bright star in the sky." },
                { word: "stem", accepts: ["stem"], usage: "Mommy held the rose by the stem while smelling it." },
                { word: "stole", accepts: ["stole"], usage: "Kaleb stole the show with his smile." },
                { word: "stop", accepts: ["stop"], usage: "When Zoe screams at daddy in the backtub Daddy says STOP." },
                { word: "sweet", accepts: ["sweet"], usage: "Kaleb can be sweet when he wants to." },
                { word: "swim", accepts: ["swim"], usage: "Kaleb loves to swim when its hot." },
                { word: "that", accepts: ["that"], usage: "Kaleb saw something he wanted and said I want that!" },
                { word: "there", accepts: ["ther"], usage: "Let's go over there." },
                { word: "their", accepts: ["their"], usage: "Their kids were stomping around." },
                { word: "they", accepts: ["they"], usage: "They did not know their feet were so loud on the floor." },
                { word: "those", accepts: ["those"], usage: "Those kids did not know how loud they were being." },
                { word: "wash", accepts: ["wash"], usage: "Mommy always makes us wash our hands." },
                { word: "yellow", accepts: ["yell"], usage: "George was friends with the man in the yellow hat." }];
            this.Level3Words = [
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
        return WordBank;
    })();
    BO.WordBank = WordBank;
    var WordSelector = (function () {
        function WordSelector() {
        }
        WordSelector.prototype.chooseRandomWordFromBank = function (bank) {
            var min = 0;
            var max = bank.length - 1;
            var rand = Math.floor(Math.random() * (max - min + 1)) + min;
            return bank[rand];
        };
        return WordSelector;
    })();
    BO.WordSelector = WordSelector;
})(BO || (BO = {}));
var UI;
(function (UI) {
    var CharacterUI = (function () {
        function CharacterUI(character) {
            this.template = "\n      <div class='character'>\n        <div class='characterName'>{{name}}</div>\n        <div class='characterPic' style=\"background-image:url('{{imageUrl}}')\"></div>\n        {{#renderCharacterHealth currentHealth maxHealth}}{{/renderCharacterHealth}}\n      </div>\n";
            this.character = character;
            this.el = this.render();
            return this;
        }
        CharacterUI.prototype.render = function () {
            this.el = HBRender.renderTemplate(this.template, this.character);
            return this.el;
        };
        CharacterUI.prototype.putInJail = function () {
            var d = document.createElement("div");
            d.className = "characterIsDeadoverlay";
            this.el.appendChild(d);
        };
        return CharacterUI;
    })();
    UI.CharacterUI = CharacterUI;
})(UI || (UI = {}));
var UI;
(function (UI) {
    var GameUI = (function () {
        function GameUI(arena) {
            this.template = "\n<div style=\"position: relative\">\n  <div id=\"ModalWindow\" class='ModalContainer'>\n    <div class='ModalBG'></div>\n    <div id=\"ModalContent\" class='ModalContent'></div>\n  </div>  \n  \n  <table class='ArenaTable'>\n    <tbody>\n      <tr>\n        <td id=\"GoodGuyCell\"></td>\n        <td>\n        </td>\n        <td id=\"BadGuyCell\"></td>\n      </tr>\n    </tbody>\n  </table>\n\n  <br/>\n  <div class='textEntryArea'>\n    <form>\n      <input id=\"BtnSayCurrentWord\" type=\"button\" value=\"Repeat Word\" /><br>\n      <input id=\"BtnShowCurrentWord\" type=\"button\" value=\"Show Hint\" /><br>\n      <input id=\"TextEntryInput\" type=\"text\" placeholder=\"Type your answer here\" />\n      <br><br>\n      <input id=\"BtnSubmitButton\" type=\"button\" value=\"FIRE\" />\n    </form>\n  </div>\n</div>\n";
            this.templateWordHintAndUsage = "\n<div>\n  <div class=\"currentWordArea\" id=\"DivCurrentWordArea\">\n    <span>Word</span>: <b><span id=\"CurrentWord\">{{CurrentWord.word}}</span></b><br>\n    Sentence: <span id=\"CurrentWordSentence\">{{CurrentWord.usage}}</span><br>\n  </div>\n</div>\n";
            this.game = arena;
            this.render(arena);
            this.wireup();
            return this;
        }
        GameUI.prototype.render = function (game) {
            this.el = HBRender.renderTemplate(this.template, game);
            this.tdGoodGuy = this.el.querySelector("#GoodGuyCell");
            this.tdBadGuy = this.el.querySelector("#BadGuyCell");
            this.divModalWindow = this.el.querySelector("#ModalWindow");
            this.divModalContent = this.el.querySelector("#ModalContent");
            this.btnShowCurrentWord = this.el.querySelector("#BtnShowCurrentWord");
            this.btnSayCurrentWord = this.el.querySelector("#BtnSayCurrentWord");
            this.btnSubmitAnswer = this.el.querySelector("#BtnSubmitButton");
            this.txtUserEntry = this.el.querySelector("#TextEntryInput");
            this.renderCharacter(game.GoodGuy, this.tdGoodGuy);
            this.renderCharacter(game.BadGuy, this.tdBadGuy);
            this.resetForm();
            return this;
        };
        GameUI.prototype.renderCharacter = function (character, td) {
            td.innerHTML = "";
            td.appendChild(character.UI.render());
            return this;
        };
        GameUI.prototype.renderModalContent = function (hbTemplate, data) {
            this.divModalContent.innerHTML = "";
            this.divModalContent.appendChild(HBRender.renderTemplate(hbTemplate, data || {}));
        };
        GameUI.prototype.showModalWindow = function (b) {
            var $el = $(this.divModalWindow);
            if (b) {
                $el.show();
            }
            else {
                $el.hide();
            }
        };
        GameUI.prototype.showCurrentWord = function (b) {
            if (b) {
                this.showModalWindow(true);
                this.renderModalContent(this.templateWordHintAndUsage, this.game);
            }
            else {
                this.showModalWindow(false);
                this.renderModalContent(this.templateWordHintAndUsage, {});
            }
        };
        GameUI.prototype.showShowCurrentWordButton = function (b) {
            var $el = $(this.btnShowCurrentWord);
            if (b) {
                $el.show();
            }
            else {
                $el.hide();
            }
        };
        GameUI.prototype.resetForm = function () {
            this.txtUserEntry.value = "";
        };
        GameUI.prototype.wireup = function () {
            var _this = this;
            var self = this;
            var game = this.game;
            var voice = this.game.GameVoice;
            voice.speak("Game is starting");
            voice.speak("Get Ready");
            voice.speak("The first word is ");
            this.game.speakCurrentWordAndPhrase();
            this.btnSayCurrentWord.onclick = function (e) {
                _this.game.speakCurrentWordAndPhrase();
            };
            this.btnShowCurrentWord.onclick = function (e) {
                // Set the game flag to indicate that the hint has been used
                _this.game.HasUsedCurrentWordHint = true;
                _this.showCurrentWord(true);
                _this.game.speakCurrentWordAndPhrase();
                // Hide after n seconds
                setTimeout(function () {
                    _this.showCurrentWord(false);
                    _this.showShowCurrentWordButton(false);
                }, _this.game.Settings.HintDuration);
            };
            $(this.btnSubmitAnswer).on("click", function (e) {
                var enteredWord = self.txtUserEntry.value;
                var isCorrectWord = game.wordMatchesCurrentWord(enteredWord);
                if (isCorrectWord) {
                    var cntDamage = self.game.HasUsedCurrentWordHint ? 1 : 2;
                    self.game.reduceCharacterHealth(game.BadGuy, cntDamage);
                    self.renderCharacter(game.BadGuy, self.tdBadGuy);
                    self.game.playCorrectAnswerSound();
                    self.game.speak("That's right!");
                    self.game.cycleToNextWord();
                    self.showShowCurrentWordButton(true);
                    self.game.HasUsedCurrentWordHint = false;
                    self.resetForm();
                    if (self.game.BadGuy.currentHealth !== 0) {
                        self.game.speak("The next word is ");
                        self.game.speakCurrentWordAndPhrase();
                    }
                }
                else {
                    self.game.reduceCharacterHealth(self.game.GoodGuy, 1);
                    self.showShowCurrentWordButton(true);
                    self.renderCharacter(game.GoodGuy, self.tdGoodGuy);
                    self.game.playWrongAnswerSound();
                    self.game.speak("Try again!");
                    self.game.speak("The word is ");
                    self.game.speakCurrentWordAndPhrase();
                    self.showShowCurrentWordButton(true);
                }
                if (self.game.BadGuy.currentHealth === 0) {
                    self.game.speak("Mega Man Wins!");
                    self.game.BadGuy.UI.putInJail();
                    setTimeout(function () {
                        self.game.cycleToNextBadGuy();
                        self.game.speakCurrentBadGuyIntro();
                        self.renderCharacter(self.game.BadGuy, self.tdBadGuy);
                        self.game.cycleToNextWord();
                        self.showShowCurrentWordButton(true);
                        self.game.HasUsedCurrentWordHint = false;
                        self.game.speak("The next word is ");
                        self.game.speakCurrentWordAndPhrase();
                    }, self.game.Settings.HintDuration);
                }
                if (game.GoodGuy.currentHealth === 0) {
                    self.game.speak(game.BadGuy.name + "  Wins!");
                    self.game.GoodGuy.UI.putInJail();
                }
            });
            return this;
        };
        return GameUI;
    })();
    UI.GameUI = GameUI;
})(UI || (UI = {}));
/// <reference path="../../scripts/typings/handlebars/handlebars.d.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
var HBRender = (function () {
    function HBRender() {
    }
    HBRender.init = function () {
        Handlebars.registerHelper('renderCharacterHealth', function (currentHealth, maxHealth) {
            var strHtml = "<div>";
            for (var i = 0; i < maxHealth; i++) {
                strHtml += "<div class='characterHealthBlock ";
                if (i < currentHealth) {
                    strHtml += "full";
                }
                else {
                    strHtml += "empty";
                }
                strHtml += "'></div>";
            }
            strHtml += "</div>";
            return new Handlebars.SafeString(strHtml);
        });
    };
    HBRender.renderTemplate = function (sourceHtml, viewModel) {
        //var source   = $("#entry-template").html();
        //var template = Handlebars.compile(source);
        //var context  = { title: "My New Post", body: "This is my first post!" };
        //var html     = template(context);
        var source = sourceHtml;
        var template = Handlebars.compile(source);
        var context = viewModel;
        var html = template(context).trim();
        var div = document.createElement("div");
        $(div).html(html);
        return div.firstElementChild;
    };
    return HBRender;
})();
var UI;
(function (UI) {
    var RosterUI = (function () {
        function RosterUI(roster) {
            this.template = "\n    <div class=\"Roster\">\n      {{#each BadGuys}}\n      <div class='RosterPortrait' style=\"background-image:url('{{imageUrl}}')\">\n        <div class='RosterCharacterName'>{{name}}</div>\n        <div class='RosterCharacterDifficulty'>{{difficulty}}</div>\n      </div>\n      {{/each}}\n    </div>\n";
            this.roster = roster;
            this.el = this.render();
            return this;
        }
        RosterUI.prototype.render = function () {
            this.el = HBRender.renderTemplate(this.template, this.roster);
            return this.el;
        };
        return RosterUI;
    })();
    UI.RosterUI = RosterUI;
})(UI || (UI = {}));
//# sourceMappingURL=MegaManSpelling.js.map