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
        var currentWord = new BO.WordSelector().chooseRandomWordFromBank(new BO.WordBank().Level1Words);
        var game = new BO.Game(gameSettings, voice, currentWord, goodGuy, badGuy);
        document.getElementById("content").appendChild(game.UI.el);
        var roster = new BO.Roster();
        document.body.appendChild(roster.UI.el);
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
            this.CurrentLevel = 7;
            this.PlayerName = "Kaleb";
            this.HintDuration = 2000;
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
                new BO.Character("Tornado Man", "Images/TornadoMan.png", 8, 8, 6),
                new BO.Character("Fire Man", "Images/FireMan.png", 9, 9, 7),
                new BO.Character("Dragon Man", "Images/DragonMan.png", 10, 10, 8)];
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
                { word: "call", accepts: ["call"], usage: "The child would like to make a call on the telephone" },
                { word: "come", accepts: ["come"], usage: "The mother asked the child to come here" },
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
                { word: "you", accepts: ["you"], usage: "The boy told his mothre I love you!" }];
            this.Level2Words = [
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
            this.template = "\n<div>\n  <table class='ArenaTable'>\n    <tbody>\n      <tr>\n        <td id=\"GoodGuyCell\"></td>\n        <td>\n        </td>\n        <td id=\"BadGuyCell\"></td>\n      </tr>\n    </tbody>\n  </table>\n\n  <br/>\n  <div class='textEntryArea'>\n    <div class=\"currentWordArea\" id=\"DivCurrentWordArea\" style='display:none'>\n      <span>Word</span>: <b><span id=\"CurrentWord\">{{CurrentWord.word}}</span></b>\n    </div>\n    <form>\n      <input id=\"BtnSayCurrentWord\" type=\"button\" value=\"Repeat Word\" /><br>\n      <input id=\"TextEntryInput\" type=\"text\" placeholder=\"Type your answer here\" />\n      <input id=\"BtnShowCurrentWord\" type=\"button\" value=\"Show Word\" />\n      <br><br>\n      <input id=\"BtnSubmitButton\" type=\"button\" value=\"FIRE\" />\n    </form>\n  </div>\n</div>\n";
            this.game = arena;
            this.render(arena);
            this.wireup();
            return this;
        }
        GameUI.prototype.render = function (game) {
            this.el = HBRender.renderTemplate(this.template, game);
            this.tdGoodGuy = this.el.querySelector("#GoodGuyCell");
            this.tdBadGuy = this.el.querySelector("#BadGuyCell");
            this.divCurrentWord = this.el.querySelector("#DivCurrentWordArea");
            this.spanCurrentWord = this.el.querySelector("#CurrentWord");
            this.btnShowCurrentWord = this.el.querySelector("#BtnShowCurrentWord");
            this.btnSayCurrentWord = this.el.querySelector("#BtnSayCurrentWord");
            this.btnSubmitAnswer = this.el.querySelector("#BtnSubmitButton");
            this.txtUserEntry = this.el.querySelector("#TextEntryInput");
            this.renderGoodGuy(game.GoodGuy);
            this.renderBadGuy(game.BadGuy);
            this.resetForm();
            return this;
        };
        GameUI.prototype.renderGoodGuy = function (character) {
            this.tdGoodGuy.innerHTML = "";
            this.tdGoodGuy.appendChild(character.UI.render());
            return this;
        };
        GameUI.prototype.renderBadGuy = function (character) {
            this.tdBadGuy.innerHTML = "";
            this.tdBadGuy.appendChild(character.UI.render());
            return this;
        };
        GameUI.prototype.renderCurrentWord = function (word) {
            this.spanCurrentWord.innerHTML = (word.word + "<br/>" + word.usage);
        };
        GameUI.prototype.showCurrentWord = function (b) {
            var $el = $(this.divCurrentWord);
            if (b) {
                $el.show();
            }
            else {
                $el.hide();
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
            this.showShowCurrentWordButton(false);
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
                var isCorrectWord = game.CurrentWord.word.toLowerCase() === enteredWord.toLowerCase();
                if (isCorrectWord) {
                    game.BadGuy.currentHealth--;
                    self.renderBadGuy(game.BadGuy);
                    self.game.playCorrectAnswerSound();
                    self.game.speak("That's right!");
                    self.game.cycleToNextWord();
                    self.renderCurrentWord(self.game.CurrentWord);
                    self.el.querySelector("#CurrentWord").innerHTML = self.game.CurrentWord.word;
                    self.resetForm();
                    if (self.game.BadGuy.currentHealth !== 0) {
                        self.game.speak("The next word is ");
                        self.game.speakCurrentWordAndPhrase();
                    }
                }
                else {
                    game.GoodGuy.currentHealth--;
                    self.showShowCurrentWordButton(true);
                    self.renderGoodGuy(game.GoodGuy);
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
                        self.renderBadGuy(self.game.BadGuy);
                        self.game.cycleToNextWord();
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