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
        var goodGuy = roster.GoodGuys[0];
        var badGuy = roster.BadGuys[gameSettings.CurrentLevel];
        var wordSelector = new BO.WordSelector();
        var currentWord = wordSelector.chooseRandomWordFromBank(gameSettings.CurrentLevel);
        var mathSelector = new BO.MathProblemSelector();
        var currentMathProblem = mathSelector.chooseRandomExpressionFromBank(gameSettings.CurrentLevel);
        var sceneSelector = new BO.SceneSelector();
        var currentScene = sceneSelector.chooseRandomSceneFromBank();
        var game = new BO.Game(gameSettings, voice, currentWord, wordSelector, currentMathProblem, mathSelector, goodGuy, badGuy, roster, currentScene, sceneSelector);
        document.getElementById("content").appendChild(game.UI.el);
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
        function Character(name, imageUrl, portraitImgUrl, currentHealth, maxHealth, currentPowerups, maxPowerups, difficulty, minions) {
            this.currentLevel = 1;
            this.name = name;
            this.imageUrl = imageUrl;
            this.portraitImgUrl = portraitImgUrl;
            this.currentHealth = currentHealth;
            this.maxHealth = maxHealth;
            this.currentPowerups = currentPowerups;
            this.maxPowerups = maxPowerups;
            this.difficulty = difficulty;
            this.minions = minions;
            this.UI = new UI.CharacterUI(this);
        }
        return Character;
    })();
    BO.Character = Character;
})(BO || (BO = {}));
var BO;
(function (BO) {
    var Game = (function () {
        function Game(gameSettings, gameVoice, currentWord, wordSelector, currentMathProblem, mathProblemSelector, goodGuy, badGuy, roster, currentScene, sceneSelector) {
            this.HasUsedCurrentWordHint = false;
            this.Settings = gameSettings;
            this.GameVoice = gameVoice;
            this.CurrentWord = currentWord;
            this.WordSelector = wordSelector;
            this.CurrentMathProblem = currentMathProblem;
            this.MathProblemSelector = mathProblemSelector;
            this.GoodGuy = goodGuy;
            this.BadGuy = badGuy;
            this.Roster = roster;
            this.CurrentScene = currentScene;
            this.SceneSelector = sceneSelector;
            this.UI = new UI.GameUI(this);
        }
        Game.prototype.start = function () {
            return this;
        };
        /**
         * Generates a new word for the user to guess and stores it in
         * the Game.CurrentWord field.
         * @method cycleToNextWord
         */
        Game.prototype.cycleToNextWord = function () {
            var newWord = this.WordSelector.chooseRandomWordFromBank(this.Settings.CurrentLevel);
            if (newWord.word.toUpperCase() === this.CurrentWord.word.toUpperCase()) {
                this.cycleToNextWord();
                return;
            }
            this.CurrentWord = newWord;
        };
        /**
         * Generates a new math problem for the user to guess and stores it in
         * the Game.CurrentMathProblem field
         */
        Game.prototype.cycleToNextMathProblem = function () {
            var newMathProblem = this.MathProblemSelector.chooseRandomExpressionFromBank(this.Settings.CurrentLevel);
            if (newMathProblem.expression == this.CurrentMathProblem.expression) {
                this.cycleToNextMathProblem();
                return;
            }
            this.CurrentMathProblem = newMathProblem;
        };
        /**
         * Generates a new scene (bg, music, etc.)
         */
        Game.prototype.cycleToNextScene = function () {
            var newScene = this.SceneSelector.chooseRandomSceneFromBank();
            if (newScene.name === this.CurrentScene.name) {
                this.cycleToNextScene();
                return;
            }
            this.CurrentScene = newScene;
        };
        /**
         * Promotes the player to the next level and sets the bad guy to that level's bad guy
         * @method cycleToNextBadGuy
         */
        Game.prototype.cycleToNextBadGuy = function () {
            this.Settings.CurrentLevel++;
            this.BadGuy = this.Roster.BadGuys[this.Settings.CurrentLevel];
        };
        /**
         * Promotes the player to the next level and sets the bad guy to that level's bad guy
         * @method cycleToNextBadGuy
         */
        Game.prototype.cycleToPreviousBadGuy = function () {
            this.Settings.CurrentLevel--;
            this.BadGuy = this.Roster.BadGuys[this.Settings.CurrentLevel];
        };
        /**
         * Checks to see if a word matches the games's current selected word
         * @method wordMatchesCurrentWord
         * @param {string} s The word to check for a match against the games Current Word
         */
        Game.prototype.checkWordMatchesCurrentWord = function (s) {
            s = s.toLowerCase();
            return (this.CurrentWord.accepts.indexOf(s.trim()) > -1);
        };
        /**
         * Checks to see if the bad guy and all of his minions health
         * are all at zero.
         * @method checkAllEnemiesOnLevelAreDefeated
         * @returns {boolean} True if all enemies are defeated, false otherwise.
         */
        Game.prototype.checkAllEnemiesOnLevelAreDefeated = function () {
            var allDeadFlag = true;
            if (this.BadGuy.currentHealth === 0) {
                var minions = this.BadGuy.minions;
                for (var i = 0; i < minions.length; i++) {
                    if (minions[i].currentHealth > 0) {
                        allDeadFlag = false;
                        break;
                    }
                }
            }
            else {
                allDeadFlag = false;
            }
            return allDeadFlag;
        };
        /**
         * Checks to see if a number is the solution to the game's current math problem
         * @method numberMatchesCurrentMathProblemAnswer
         * @param {number} n The guess/answer to the game's current Math Problem
         */
        Game.prototype.numberMatchesCurrentMathProblemAnswer = function (n) {
            return (this.CurrentMathProblem.accepts.indexOf(n) > -1);
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
        Game.prototype.increaseCharacterPowerups = function (char, n) {
            char.currentPowerups += n;
            // Don't let the characters powerup count exceed its max allowable amount
            if (char.currentPowerups > char.maxPowerups) {
                char.currentPowerups = char.maxPowerups;
            }
        };
        Game.prototype.decreaseCharacterPowerups = function (char, n) {
            char.currentPowerups -= n;
            // Don't let the characters powerup count fall below zero
            if (char.currentPowerups < 0) {
                char.currentPowerups = 0;
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
        Game.prototype.playExposionSound = function () {
            var audio = new Audio('sounds/explosion.mp3');
            audio.play();
        };
        Game.prototype.playEvilLaughter = function () {
            var audio = new Audio('sounds/evillaugh.mp3');
            audio.play();
        };
        Game.prototype.unlockSecretLevels = function () {
            var _this = this;
            this.Roster.SecretCharacters.forEach(function (char) {
                _this.Roster.BadGuys.push(char);
            });
            this.playExposionSound();
            this.playEvilLaughter();
            this.speak("You've unlocked the secret level!");
        };
        return Game;
    })();
    BO.Game = Game;
})(BO || (BO = {}));
var BO;
(function (BO) {
    var GameSettings = (function () {
        function GameSettings() {
            this.GameMode = GameMode.admin;
            this.CurrentLevel = 0;
            this.WordDifficulty = 2; // [1|2|3] Determines which difficulty word bank to use
            this.PlayerName = "Kaleb";
            this.HintDuration = 6000;
            this.UI = new UI.GameSettingsUI(this);
        }
        return GameSettings;
    })();
    BO.GameSettings = GameSettings;
    (function (GameMode) {
        GameMode[GameMode["easy"] = 0] = "easy";
        GameMode[GameMode["medium"] = 1] = "medium";
        GameMode[GameMode["hard"] = 2] = "hard";
        GameMode[GameMode["admin"] = 3] = "admin";
    })(BO.GameMode || (BO.GameMode = {}));
    var GameMode = BO.GameMode;
})(BO || (BO = {}));
var BO;
(function (BO) {
    var MathProblemBank = (function () {
        function MathProblemBank() {
            this.Level1Problems = [
                { expression: "3 + 2", accepts: [5], usage: "three plus two" },
                { expression: "2 + 3", accepts: [5], usage: "two plus three" },
                { expression: "4 + 4", accepts: [8], usage: "four plus four" },
                { expression: "5 + 4", accepts: [9], usage: "five plus four" },
                { expression: "5 + 2", accepts: [7], usage: "five plus two" },
                { expression: "6 + 3", accepts: [9], usage: "six plus three" },
                { expression: "7 + 2", accepts: [9], usage: "seven plus two" },
                { expression: "8 + 1", accepts: [9], usage: "eight plus one" },
                { expression: "3 + 4", accepts: [7], usage: "three plus four" },
                { expression: "4 + 3", accepts: [7], usage: "four plus three" },
                { expression: "6 + 2", accepts: [8], usage: "six plus two" },
                { expression: "2 + 6", accepts: [8], usage: "two plus six" },
                { expression: "4 + 5", accepts: [9], usage: "four plus five" },
                { expression: "1 + 8", accepts: [9], usage: "one plus eight" }];
        }
        return MathProblemBank;
    })();
    BO.MathProblemBank = MathProblemBank;
    var MathProblemSelector = (function () {
        function MathProblemSelector() {
            this.MathProblemBank = new MathProblemBank();
        }
        MathProblemSelector.prototype.chooseRandomExpressionFromBank = function (level) {
            var min = 0, expressionlist = null;
            expressionlist = (level == 1) ? this.MathProblemBank.Level1Problems : this.MathProblemBank.Level1Problems;
            //: (level === 2) ? this.expressionBank.Level2expressions
            //  : (level === 3) ? this.expressionBank.Level3expressions
            //    : this.expressionBank.Level1expressions;
            var max = expressionlist.length - 1;
            var rand = Math.floor(Math.random() * (max - min + 1)) + min;
            return expressionlist[rand];
        };
        return MathProblemSelector;
    })();
    BO.MathProblemSelector = MathProblemSelector;
})(BO || (BO = {}));
var BO;
(function (BO) {
    var Minion = (function () {
        function Minion(name, imageUrl, currentHealth, maxHealth, difficulty, imageRequiresXAxisFlip) {
            this.imageRequiresXAxisFlip = false;
            this.name = name;
            this.imageUrl = imageUrl;
            this.currentHealth = currentHealth;
            this.maxHealth = maxHealth;
            this.difficulty = difficulty;
            if (imageRequiresXAxisFlip) {
                this.imageRequiresXAxisFlip = imageRequiresXAxisFlip;
            }
            this.UI = new UI.MinionUI(this);
        }
        return Minion;
    })();
    BO.Minion = Minion;
})(BO || (BO = {}));
var BO;
(function (BO) {
    var Roster = (function () {
        function Roster() {
            this.GoodGuys = [
                new BO.Character("MegaMan", "Images/MegaMan.png", "Images/portraits/MegaManPortrait.png", 10, 10, 5, 5, 1, [
                    /**/ new BO.Minion("Minion1", "Images/minions/MegaManMinion1.gif", 1, 1, 1, true),
                    new BO.Minion("Minion1", "Images/minions/MegaManMinion2.gif", 1, 1, 1, false),
                    new BO.Minion("Minion1", "Images/minions/MegaManMinion3.gif", 1, 1, 1, true),
                    new BO.Minion("Minion1", "Images/minions/MegaManMinion4.gif", 1, 1, 1, true),
                    new BO.Minion("Minion2", "Images/minions/MegaManMinion5.gif", 1, 1, 1, false) /**/
                ])
            ];
            this.BadGuys = [
                new BO.Character("Spike Man", "Images/SpikeMan.png", "Images/portraits/SpikeManPortrait.png", 3, 3, 0, 0, 0, [
                    new BO.Minion("Minion1", "Images/minions/SpikeManMinion1.gif", 1, 1, 1, true),
                    new BO.Minion("Minion2", "Images/minions/SpikeManMinion2.gif", 2, 2, 1, false)]),
                new BO.Character("Shovel Man", "Images/ShovelMan.png", "Images/portraits/ShovelManPortrait.png", 4, 4, 0, 0, 1, [
                    new BO.Minion("Minion1", "Images/minions/ShovelManMinion1.gif", 3, 3, 1, false),
                    new BO.Minion("Minion1", "Images/minions/ShovelManMinion2.gif", 2, 2, 1, false),
                    new BO.Minion("Minion2", "Images/minions/ShovelManMinion3.gif", 1, 1, 1, false)]),
                new BO.Character("Pencil Man", "Images/PencilMan.png", "Images/portraits/PencilManPortrait.png", 5, 5, 0, 0, 2, [
                    new BO.Minion("Minion1", "Images/minions/PencilManMinion1.gif", 2, 2, 1, false),
                    new BO.Minion("Minion1", "Images/minions/PencilManMinion2.gif", 2, 2, 1, false)]),
                new BO.Character("Doctor Porcupine", "Images/DoctorPorcupine.png", "Images/portraits/DoctorPorcupinePortrait.png", 6, 6, 0, 0, 3, [
                    new BO.Minion("Minion1", "Images/minions/DoctorPorcupineMinion1.gif", 1, 1, 1, true),
                    new BO.Minion("Minion2", "Images/minions/DoctorPorcupineMinion2.gif", 3, 3, 1, false)]),
                new BO.Character("Toad Man", "Images/ToadMan.png", "Images/portraits/ToadManPortrait.png", 6, 6, 0, 0, 4, [
                    new BO.Minion("Minion1", "Images/minions/ToadManMinion2.gif", 3, 3, 1, false),
                    new BO.Minion("Minion1", "Images/minions/ToadManMinion1.gif", 1, 1, 1, false),
                    new BO.Minion("Minion1", "Images/minions/ToadManMinion1.gif", 1, 1, 1, false),
                    new BO.Minion("Minion2", "Images/minions/ToadManMinion1.gif", 1, 1, 1, false)]),
                new BO.Character("Blade Man", "Images/BladeMan.png", "Images/portraits/BladeManPortrait.png", 7, 7, 0, 0, 5, [
                    new BO.Minion("Minion1", "Images/minions/BladeManMinion1.gif", 2, 2, 1, false),
                    new BO.Minion("Minion2", "Images/minions/BladeManMinion2.gif", 2, 2, 1, false)]),
                new BO.Character("Alligator Man", "Images/AlligatorMan.png", "Images/portraits/AlligatorManPortrait.png", 8, 8, 0, 0, 6, [
                    new BO.Minion("Minion1", "Images/minions/AlligatorManMinion1.gif", 2, 2, 1, true),
                    new BO.Minion("Minion1", "Images/minions/AlligatorManMinion2.gif", 2, 2, 1, false),
                    new BO.Minion("Minion2", "Images/minions/AlligatorManMinion1.gif", 2, 2, 1, true)]),
                new BO.Character("Tornado Man", "Images/TornadoMan.png", "Images/portraits/TornadoManPortrait.png", 8, 8, 0, 0, 7, [
                    new BO.Minion("Minion1", "Images/minions/TornadoManMinion1.gif", 2, 2, 1, false),
                    new BO.Minion("Minion1", "Images/minions/TornadoManMinion2.gif", 2, 2, 1, false),]),
                new BO.Character("Fire Man", "Images/FireMan.png", "Images/portraits/FireManPortrait.png", 10, 10, 0, 0, 8, [
                    new BO.Minion("Minion1", "Images/minions/FiremanMinion1.gif", 2, 2, 1, true),
                    new BO.Minion("Minion1", "Images/minions/FiremanMinion2.gif", 2, 2, 1, true)]),
                new BO.Character("Dragon Man", "Images/DragonMan.png", "Images/portraits/DragonManPortrait.png", 20, 20, 0, 0, 9, [
                    new BO.Minion("Minion1", "Images/minions/DragonManMinion1.gif", 2, 2, 1, false),
                    new BO.Minion("Minion1", "Images/minions/DragonManMinion2.gif", 2, 2, 1, false)])];
            this.SecretCharacters = [
                new BO.Character("Alex", "Images/SFAlex.gif", "Images/portraits/SFAlexPortrait.png", 3, 3, 0, 0, 0, [
                    new BO.Minion("Minion1", "Images/minions/SFAlexMinion1.gif", 1, 1, 1, true),
                    new BO.Minion("Minion2", "Images/minions/SFAlexMinion2.gif", 2, 2, 1, true)]),
                new BO.Character("Ken", "Images/SFChunLi.gif", "Images/portraits/SFChunLi.png", 4, 4, 0, 0, 1, [
                    new BO.Minion("Minion1", "Images/minions/SFKenMinion1.gif", 3, 3, 1, false)]),
                new BO.Character("Kuma", "Images/SFKuma.gif", "Images/portraits/SFKumaPortrait.png", 5, 5, 0, 0, 2, [
                    new BO.Minion("Minion1", "Images/minions/SFKumaMinion1.gif", 1, 1, 1, false),
                    new BO.Minion("Minion1", "Images/minions/SFKumaMinion1.gif", 2, 2, 1, false)]),
                new BO.Character("Sagat", "Images/SFSagat.gif", "Images/portraits/SFSagatPortrait.png", 6, 6, 0, 0, 3, [
                    new BO.Minion("Minion1", "Images/minions/SFZangiefMinion1.gif", 5, 5, 1, false)]),
                new BO.Character("Vega", "Images/SFVega.gif", "Images/portraits/SFVegaPortrait.png", 6, 6, 0, 0, 4, [
                    new BO.Minion("Minion1", "Images/minions/SFVegaMinion1.gif", 3, 3, 1, true)]),
                new BO.Character("Ryu", "Images/SFRyu.gif", "Images/portraits/SFRyuPortrait.png", 8, 8, 0, 0, 5, [
                    new BO.Minion("Minion1", "Images/minions/SFRyuMinion1.gif", 2, 2, 1, true),
                    new BO.Minion("Minion1", "Images/minions/SFRyuMinion1.gif", 2, 2, 1, true),
                    new BO.Minion("Minion2", "Images/minions/SFRyuMinion1.gif", 2, 2, 1, true)])];
            this.UI = new UI.RosterUI(this);
        }
        return Roster;
    })();
    BO.Roster = Roster;
})(BO || (BO = {}));
var BO;
(function (BO) {
    var SceneBank = (function () {
        function SceneBank() {
            this.Scenes = [
                { name: "Desert Lightning", bgImageUrl: "Images/bgs/DesertLightning.jpg", bgMusicUrl: "" },
                { name: "Eruption", bgImageUrl: "Images/bgs/EruptionLightning.jpg", bgMusicUrl: "" },
                { name: "Godzilla", bgImageUrl: "Images/bgs/Godzilla.jpg", bgMusicUrl: "" },
                { name: "HulkBuster", bgImageUrl: "Images/bgs/HulkBuster.jpg", bgMusicUrl: "" },
                { name: "Space Beach", bgImageUrl: "Images/bgs/SpaceBeach.jpg", bgMusicUrl: "" },
                { name: "Space Battle", bgImageUrl: "Images/bgs/SpaceshipBattle.jpg", bgMusicUrl: "" },
                { name: "Space Cruiser", bgImageUrl: "Images/bgs/SpaceCruiser.jpg", bgMusicUrl: "" },
                { name: "Space Station", bgImageUrl: "Images/bgs/SpaceStation.jpg", bgMusicUrl: "" },
                { name: "Sunrise", bgImageUrl: "Images/bgs/Sunrise.jpg", bgMusicUrl: "" },
                { name: "Volcano Lightning", bgImageUrl: "Images/bgs/VolcanoLightning.jpg", bgMusicUrl: "" }];
        }
        return SceneBank;
    })();
    BO.SceneBank = SceneBank;
    var SceneSelector = (function () {
        function SceneSelector() {
            this.SceneBank = new BO.SceneBank;
        }
        SceneSelector.prototype.chooseRandomSceneFromBank = function () {
            var min = 0;
            var max = this.SceneBank.Scenes.length - 1;
            var rand = Math.floor(Math.random() * (max - min + 1)) + min;
            return this.SceneBank.Scenes[rand];
        };
        return SceneSelector;
    })();
    BO.SceneSelector = SceneSelector;
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
                { word: "red", accepts: ["red"], usage: "My favorite color is red" },
                { word: "she", accepts: ["she"], usage: "She asked if she could play with the toy" },
                { word: "that", accepts: ["that"], usage: "The boy likes that toy very much" },
                { word: "the", accepts: ["the"], usage: "The boy played with the toy" },
                { word: "them", accepts: ["them"], usage: "The boy said he wants to play with them" },
                { word: "was", accepts: ["was"], usage: "The boy was at the store with his mother" },
                { word: "where", accepts: ["where"], usage: "The boy wanted to know where his mother was going" },
                { word: "with", accepts: ["with"], usage: "The boy wanted to go with his mother" },
                { word: "you", accepts: ["you"], usage: "The boy told his mother I love you!" }];
            this.Level2Words = [
                { word: "animal", accepts: ["animal"], usage: "A deer is an animal." },
                { word: "angry", accepts: ["angry"], usage: "When Kaleb doesn't listen, Mommy gets angry." },
                { word: "apple", accepts: ["apple"], usage: "Kaleb likes to snack on an apple." },
                { word: "baby", accepts: ["baby"], usage: "Zoe loves her baby dolls." },
                { word: "banana", accepts: ["banana"], usage: "Do you want a banana?" },
                { word: "below", accepts: ["below"], usage: "The minions wait below the banana tree." },
                { word: "bird", accepts: ["bird"], usage: "A bird sits in the banana tree." },
                { word: "blue", accepts: ["blue"], usage: "A blue bird sits in the banana tree." },
                { word: "easy", accepts: ["easy"], usage: "Spelling is almost too easy for Kaleb." },
                { word: "curious", accepts: ["curious"], usage: "George was a good little monkey and always very curious." },
                { word: "corn", accepts: ["corn"], usage: "Corn on the cobb is tasty." },
                { word: "hide", accepts: ["hide"], usage: "Hide and seek is a fun game." },
                { word: "funny", accepts: ["funny"], usage: "The minions are really funny little yellow guys." },
                { word: "green", accepts: ["green"], usage: "Kaleb turns green when he eats food that he does not like." },
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
                { word: "sheesh", accepts: ["sheesh"], usage: "All right all right SHEESH!" },
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
                { word: "there", accepts: ["there"], usage: "Let's go over there." },
                { word: "their", accepts: ["their"], usage: "Their kids were stomping around." },
                { word: "they", accepts: ["they"], usage: "They did not know their feet were so loud on the floor." },
                { word: "those", accepts: ["those"], usage: "Those kids did not know how loud they were being." },
                { word: "wash", accepts: ["wash"], usage: "Mommy always makes us wash our hands." },
                { word: "yellow", accepts: ["yell"], usage: "George was friends with the man in the yellow hat." }];
            this.Level3Words = [
                { word: "above", accepts: ["above"], usage: "Planes fly above you in the sky." },
                { word: "batch", accepts: ["batch"], usage: "The farmer harvested a batch of potatos" },
                { word: "beat", accepts: ["beat"], usage: "The winning team beat the losing team." },
                { word: "bowl", accepts: ["bowl"], usage: "Daddy makes Kaleb a bowl of oatmeal for breakfast" },
                { word: "catch", accepts: ["catch"], usage: "Daddy likes to play catch with Kaleb." },
                { word: "chain", accepts: ["chain"], usage: "The dog was tied to the doghouse with a chain." },
                { word: "chat", accepts: ["chat"], usage: "Kaleb likes to chat a lot before bedtime." },
                { word: "chicken", accepts: ["chicken"], usage: "The farmer feeds his chickens every morning." },
                { word: "chill", accepts: ["chill"], usage: "Mommy told Zoe to chill out." },
                { word: "chin", accepts: ["chin"], usage: "Kaleb punched daddy in the chin when they were wrestling." },
                { word: "church", accepts: ["church"], usage: "People go to church to pray." },
                { word: "cracker", accepts: ["cracker"], usage: "Kaleb likes to put cheese on his crackers." },
                { word: "grape", accepts: ["grape"], usage: "Zoe loves to eat grapes!" },
                { word: "grease", accepts: ["grease"], usage: "There was a lot of grease on the stove after daddy made dinner." },
                { word: "high", accepts: ["high"], usage: "Planes fly high up in the sky!" },
                { word: "jelly", accepts: ["jelly"], usage: "Zoe loves peanut butter and jelly sandwiches." },
                { word: "juice", accepts: ["juice"], usage: "Zoe loves juice mixed into her water." },
                { word: "match", accepts: ["match"], usage: "Kaleb and daddy had a wrestling match." },
                { word: "matches", accepts: ["matches"], usage: "Playing with matches is dangerous!" },
                { word: "orange", accepts: ["orange"], usage: "Kaleb had an orange in his lunch." },
                { word: "pitch", accepts: ["pitch"], usage: "Kaleb likes to pitch when he plays baseball." },
                { word: "pitcher", accepts: ["pitcher"], usage: "Kaleb could be a pitcher on a baseball team" },
                { word: "potato", accepts: ["potato"], usage: "The farmer only grew one potato this year. It'll be a hard winter." },
                { word: "purple", accepts: ["purple"], usage: "Barney is a big purple dinosaur!" },
                { word: "sick", accepts: ["sick"], usage: "When little boys don't wash their hands they usually get sick." },
                { word: "soda", accepts: ["soda"], usage: "Kaleb tried to sneak a sip of daddy's soda pop." },
                { word: "steam", accepts: ["steam"], usage: "Some trains used to run on steam. They were called steam engines!" },
                { word: "switch", accepts: ["switch"], usage: "The train passenger asked if he could switch to a window seat." },
                { word: "team", accepts: ["team"], usage: "Should we sign Kaleb up to play for a soccer team?" },
                { word: "tease", accepts: ["tease"], usage: "Its not nice to tease other kids at school." },
                { word: "thanks", accepts: ["thanks"], usage: "Kaleb said thanks for the snack!" },
                { word: "treat", accepts: ["treat"], usage: "If Kaleb is a good boy sometimes he gets a treat." },
                { word: "under", accepts: ["under"], usage: "Maybe the toy is under the couch!" },
                { word: "watch", accepts: ["watch"], usage: "Zoe likes to wake up and watch Daniel Tiger." },
                { word: "watches", accepts: ["watches"], usage: "A watch collector has lots of watches." },
                { word: "watermelon", accepts: ["watermelon"], usage: "Watermelon is one of daddy's favorite foods!" },
                { word: "welcome", accepts: ["welcome"], usage: "When someone says thank you its nice to respond with Your Welcome!" }];
            this.Level4Words = [
                { word: "above", accepts: ["above"], usage: "Planes fly above you in the sky." },
                { word: "animal", accepts: ["animal"], usage: "A deer is an animal." },
                { word: "angry", accepts: ["angry"], usage: "When Kaleb doesn't listen, Mommy gets angry." },
                { word: "apple", accepts: ["apple"], usage: "Kaleb likes to snack on an apple." },
                { word: "baby", accepts: ["baby"], usage: "Zoe loves her baby dolls." },
                { word: "banana", accepts: ["banana"], usage: "Do you want a banana?" },
                { word: "batch", accepts: ["batch"], usage: "The farmer harvested a batch of potatos" },
                { word: "beat", accepts: ["beat"], usage: "The winning team beat the losing team." },
                { word: "below", accepts: ["below"], usage: "The minions wait below the banana tree." },
                { word: "bird", accepts: ["bird"], usage: "A bird sits in the banana tree." },
                { word: "blue", accepts: ["blue"], usage: "A blue bird sits in the banana tree." },
                { word: "bowl", accepts: ["bowl"], usage: "Daddy makes Kaleb a bowl of oatmeal for breakfast" },
                { word: "curious", accepts: ["curious"], usage: "George was a good little monkey and always very curious." },
                { word: "catch", accepts: ["catch"], usage: "Daddy likes to play catch with Kaleb." },
                { word: "chain", accepts: ["chain"], usage: "The dog was tied to the doghouse with a chain." },
                { word: "chat", accepts: ["chat"], usage: "Kaleb likes to chat a lot before bedtime." },
                { word: "chicken", accepts: ["chicken"], usage: "The farmer feeds his chickens every morning." },
                { word: "chill", accepts: ["chill"], usage: "Mommy told Zoe to chill out." },
                { word: "chin", accepts: ["chin"], usage: "Kaleb punched daddy in the chin when they were wrestling." },
                { word: "church", accepts: ["church"], usage: "People go to church to pray." },
                { word: "corn", accepts: ["corn"], usage: "Corn on the cobb is tasty." },
                { word: "cracker", accepts: ["cracker"], usage: "Kaleb likes to put cheese on his crackers." },
                { word: "down", accepts: ["down"], usage: "Mommy told Kaleb to get down off the table." },
                { word: "easy", accepts: ["easy"], usage: "Spelling is almost too easy for Kaleb." },
                { word: "hide", accepts: ["hide"], usage: "Hide and seek is a fun game." },
                { word: "funny", accepts: ["funny"], usage: "The minions are really funny little yellow guys." },
                { word: "green", accepts: ["green"], usage: "Kaleb turns green when he eats food that he does not like." },
                { word: "grape", accepts: ["grape"], usage: "Zoe loves to eat grapes!" },
                { word: "grease", accepts: ["grease"], usage: "There was a lot of grease on the stove after daddy made dinner." },
                { word: "high", accepts: ["high"], usage: "Planes fly high up in the sky!" },
                { word: "jelly", accepts: ["jelly"], usage: "Zoe loves peanut butter and jelly sandwiches." },
                { word: "juice", accepts: ["juice"], usage: "Zoe loves juice mixed into her water." },
                { word: "inside", accepts: ["inside"], usage: "Kaleb has to come inside when it gets cold outside." },
                { word: "lion", accepts: ["lion"], usage: "Kalebs mom is a lion in the bedroom." },
                { word: "look", accepts: ["look"], usage: "Kaleb put on the costume and said look at me!" },
                { word: "mash", accepts: ["mash"], usage: "Mommy likes to mash potatos." },
                { word: "match", accepts: ["match"], usage: "Kaleb and daddy had a wrestling match." },
                { word: "matches", accepts: ["matches"], usage: "Playing with matches is dangerous!" },
                { word: "mean", accepts: ["mean"], usage: "Zoe gets mean when she sees Kaleb with a helicopter." },
                { word: "open", accepts: ["open"], usage: "Please open the door" },
                { word: "outside", accepts: ["outside"], usage: "Outside the window George saw a bunch of little ducks." },
                { word: "over", accepts: ["over"], usage: "Dorothy flew over the rainbow." },
                { word: "orange", accepts: ["orange"], usage: "Kaleb had an orange in his lunch." },
                { word: "pancakes", accepts: ["pancakes"], usage: "Kaleb likes to put syrup on his pancakes." },
                { word: "paperclip", accepts: ["paperclip"], usage: "Mommy makes paper stick together with a paperclip." },
                { word: "pitch", accepts: ["pitch"], usage: "Kaleb likes to pitch when he plays baseball." },
                { word: "pitcher", accepts: ["pitcher"], usage: "Kaleb could be a pitcher on a baseball team" },
                { word: "potato", accepts: ["potato"], usage: "The farmer only grew one potato this year. It'll be a hard winter." },
                { word: "purple", accepts: ["purple"], usage: "Barney is a big purple dinosaur!" },
                { word: "sleep", accepts: ["sleep"], usage: "Kaleb needs to go to sleep." },
                { word: "sleepy", accepts: ["sleepy"], usage: "Kaleb gets sleepy when he stays up to late." },
                { word: "sheesh", accepts: ["shees"], usage: "All right all right SHEESH!" },
                { word: "shock", accepts: ["shock"], usage: "You'll get a shock if you play with electricity." },
                { word: "sick", accepts: ["sick"], usage: "When little boys don't wash their hands they usually get sick." },
                { word: "snack", accepts: ["snack"], usage: "Kaleb likes to eat a snack before bed." },
                { word: "soda", accepts: ["soda"], usage: "Kaleb tried to sneak a sip of daddy's soda pop." },
                { word: "steam", accepts: ["steam"], usage: "Some trains used to run on steam. They were called steam engines!" },
                { word: "switch", accepts: ["switch"], usage: "The train passenger asked if he could switch to a window seat." },
                { word: "show", accepts: ["show"], usage: "Kaleb likes to watch a show before dinner." },
                { word: "star", accepts: ["star"], usage: "There was a bright star in the sky." },
                { word: "stem", accepts: ["stem"], usage: "Mommy held the rose by the stem while smelling it." },
                { word: "stole", accepts: ["stole"], usage: "Kaleb stole the show with his smile." },
                { word: "stop", accepts: ["stop"], usage: "When Zoe screams at daddy in the backtub Daddy says STOP." },
                { word: "sweet", accepts: ["sweet"], usage: "Kaleb can be sweet when he wants to." },
                { word: "swim", accepts: ["swim"], usage: "Kaleb loves to swim when its hot." },
                { word: "team", accepts: ["team"], usage: "Should we sign Kaleb up to play for a soccer team?" },
                { word: "tease", accepts: ["tease"], usage: "Its not nice to tease other kids at school." },
                { word: "thanks", accepts: ["thanks"], usage: "Kaleb said thanks for the snack!" },
                { word: "that", accepts: ["that"], usage: "Kaleb saw something he wanted and said I want that!" },
                { word: "there", accepts: ["there"], usage: "Let's go over there." },
                { word: "their", accepts: ["their"], usage: "Their kids were stomping around." },
                { word: "they", accepts: ["they"], usage: "They did not know their feet were so loud on the floor." },
                { word: "those", accepts: ["those"], usage: "Those kids did not know how loud they were being." },
                { word: "treat", accepts: ["treat"], usage: "If Kaleb is a good boy sometimes he gets a treat." },
                { word: "under", accepts: ["under"], usage: "Maybe the toy is under the couch!" },
                { word: "wash", accepts: ["wash"], usage: "Mommy always makes us wash our hands." },
                { word: "watch", accepts: ["watch"], usage: "Zoe likes to wake up and watch Daniel Tiger." },
                { word: "watches", accepts: ["watches"], usage: "A watch collector has lots of watches." },
                { word: "watermelon", accepts: ["watermelon"], usage: "Watermelon is one of daddy's favorite foods!" },
                { word: "welcome", accepts: ["welcome"], usage: "When someone says thank you its nice to respond with Your Welcome!" },
                { word: "yellow", accepts: ["yellow"], usage: "George was friends with the man in the yellow hat." }];
        }
        return WordBank;
    })();
    BO.WordBank = WordBank;
    var WordSelector = (function () {
        function WordSelector() {
            this.WordBank = new WordBank();
        }
        WordSelector.prototype.chooseRandomWordFromBank = function (level) {
            var min = 0, wordlist = null;
            wordlist = this.getWordListAtLevel(level);
            var max = wordlist.length - 1;
            var rand = Math.floor(Math.random() * (max - min + 1)) + min;
            return wordlist[rand];
        };
        WordSelector.prototype.getWordListAtLevel = function (level) {
            var wordlist;
            wordlist = (level == 1) ? this.WordBank.Level1Words
                : (level === 2) ? this.WordBank.Level2Words
                    : (level === 3) ? this.WordBank.Level3Words
                        : (level === 4) ? this.WordBank.Level4Words
                            : (level > 4) ? this.WordBank.Level4Words : this.WordBank.Level1Words;
            return wordlist.sort();
        };
        WordSelector.prototype.getListOfWordsAtLevel = function (level) {
            var results;
            var wordlist;
            wordlist = (level == 1) ? this.WordBank.Level1Words
                : (level === 2) ? this.WordBank.Level2Words
                    : (level === 3) ? this.WordBank.Level3Words
                        : (level === 4) ? this.WordBank.Level4Words
                            : (level > 4) ? this.WordBank.Level4Words : this.WordBank.Level1Words;
            results = wordlist.map(function (iwe) {
                return iwe.word;
            });
            return results.sort();
        };
        return WordSelector;
    })();
    BO.WordSelector = WordSelector;
})(BO || (BO = {}));
var UI;
(function (UI) {
    var CharacterUI = (function () {
        function CharacterUI(character) {
            this.template = "\n      <div class='character highlightOnHover'>\n<Br><br>\n        <div class='characterPic' style=\"background-image:url('{{imageUrl}}')\"></div>\n        {{#unless currentHealth}}\n        <div class=\"characterIsDeadoverlay\"></div>\n        {{/unless}}\n      </div>\n";
            this.character = character;
            this.el = this.render();
            return this;
        }
        CharacterUI.prototype.render = function () {
            this.el = HBRender.renderTemplate(this.template, this.character);
            return this.el;
        };
        CharacterUI.prototype.showAsCurrentTarget = function (b) {
            if (b) {
                this.el.classList.remove("highlightOnHover");
                this.el.classList.add("currentlyTargeted");
            }
            else {
                this.el.classList.remove("currentlyTargeted");
                this.el.classList.add("highlightOnHover");
            }
        };
        return CharacterUI;
    })();
    UI.CharacterUI = CharacterUI;
    var CharacterPortraitUI = (function () {
        function CharacterPortraitUI(character) {
            this.template = "\n      <div class='characterPortrait'>\n        <div class='characterPortrait_rel'>\n          <div class='characterPortraitPic' style=\"background-image:url('{{portraitImgUrl}}')\"></div>\n          \n          <div class='characterPortraitStats'>\n            <div class='characterPortraitName'>{{name}}</div>\n            {{#renderCharacterHealth currentHealth maxHealth}}{{/renderCharacterHealth}}\n            {{#renderCharacterPowerups currentPowerups maxPowerups}}{{/renderCharacterPowerups}}\n          </div>\n        </div>\n      </div>\n";
            this.character = character;
            this.el = this.render();
            return this;
        }
        CharacterPortraitUI.prototype.render = function () {
            this.el = HBRender.renderTemplate(this.template, this.character);
            return this.el;
        };
        return CharacterPortraitUI;
    })();
    UI.CharacterPortraitUI = CharacterPortraitUI;
})(UI || (UI = {}));
var UI;
(function (UI) {
    var GameSettingsUI = (function () {
        function GameSettingsUI(settings) {
            this.template = "\n      <div class='SettingsPanel'>\n        <div class='AdminSettingsPanel_rel'>\n          <form id='formAdminSettings'>\n            <table>\n              <tbody>\n                <tr><td>CurrentLevel</td><td><input name='CurrentLevel' type='text' value='{{CurrentLevel}}'/></td></tr>\n                <tr><td>WordDifficulty</td><td><input name='WordDifficulty' type='text' value='{{WordDifficulty}}'/></td></tr>\n                <tr><td>PlayerName</td><td><input name='PlayerName' type='text' value='{{PlayerName}}'/></td></tr>\n                <tr><td>HintDuration</td><td><input name='HintDuration' type='text' value='{{HintDuration}}'/></td></tr>\n                <tr>\n                  <td></td>\n                  <td><input type='button' value='Save' onclick='window.game.UI.saveSettings()'</td>\n                </tr>\n              </tbody>\n              <tfoot>\n                <tr>\n                  <td colspan='2'>\n                    <input type='button' value='Prev Enemy' onclick='window.game.UI.cycleToPreviousBadGuy();' />\n                    <input type='button' value='Next Enemy' onclick='window.game.UI.cycleToNextBadGuy();'/>\n                  </td>\n                </tr>\n              </tfoot>\n            </table>\n          </form>\n          <div class='AdminSettingsPanel_ShowHide'>\n            <input type='button' value='&gt;&gt;' onclick='window.game.UI.showAdminPanel(true);'/><br/>\n            <input type='button' value='&lt;&lt;' onclick='window.game.UI.showAdminPanel(false);'/>\n          </div>\n        </div>\n      </div>\n";
            this.gameSettings = settings;
            this.el = this.render();
            return this;
        }
        GameSettingsUI.prototype.render = function () {
            this.el = HBRender.renderTemplate(this.template, this.gameSettings);
            return this.el;
        };
        GameSettingsUI.prototype.getSettings = function () {
            var settings = new BO.GameSettings();
            var form = this.el.querySelector("#formAdminSettings");
            var formElements = form.elements;
            settings.GameMode = BO.GameMode.admin;
            settings.CurrentLevel = parseInt(formElements.CurrentLevel.value.trim(), 10);
            settings.HintDuration = parseInt(formElements.HintDuration.value.trim(), 10);
            settings.WordDifficulty = parseInt(formElements.WordDifficulty.value.trim(), 10);
            settings.PlayerName = formElements.PlayerName.value.trim();
            return settings;
        };
        return GameSettingsUI;
    })();
    UI.GameSettingsUI = GameSettingsUI;
})(UI || (UI = {}));
var UI;
(function (UI) {
    var GameUI = (function () {
        function GameUI(arena) {
            var _this = this;
            this.template = "\n<div style=\"position: relative;\">\n  <div id=\"DivAdminSettingsPanel\" class=\"AdminSettingsPanel\"></div>\n  <div class='ArenaBGOverlay'></div>\n\n  <div id=\"ModalWindow\" class='ModalContainer'>\n    <div class='ModalBG'></div>\n    <div id=\"ModalContent\" class='ModalContent'></div>\n  </div>\n\n  <div id='DivGoodGuyPortrait' class='goodGuyPortrait'></div>\n  <div id='DivBadGuyPortrait' class='badGuyPortrait'></div>\n  \n  <table class='ArenaTable'>\n    <tbody>\n      <tr>\n        <td id=\"GoodGuyCell\"></td>\n        <td id=\"GoodGuyMinionsCell\"></td>\n        <td id=\"WordBankCell\">\n          WORDS<br/>\n          <select id=\"SelWordPicker\">\n          </select>\n          <div>\n            <input id=\"BtnSubmitButton\" type=\"button\" value=\"FIRE\" /><br/>\n            <input id=\"BtnUsePowerup\" type='button' value='Power Up!' />\n          </div>\n        </td>\n        <td id='BadGuyMinionsCell'></td>\n        <td id=\"BadGuyCell\"></td>\n      </tr>\n    </tbody>\n  </table>\n\n  <input id=\"BtnSayCurrentWord\" type=\"button\" value=\"Repeat Word\" />&nbsp;\n  <input id=\"BtnShowCurrentWord\" type=\"button\" value=\"Show Hint\" />\n\n</div>\n";
            this.templateWordHintAndUsage = "\n<div>\n  <div class=\"currentWordArea\" id=\"DivCurrentWordArea\">\n    <span>Word</span>: <b><span id=\"CurrentWord\">{{CurrentWord.word}}</span></b><br>\n    Sentence: <span id=\"CurrentWordSentence\">{{CurrentWord.usage}}</span><br>\n  </div>\n</div>\n";
            this.templatePowerupMathProblem = "\n<div>\n  <div class=\"powerupMathProblem\" id=\"DivPowerupMathProblem\">\n    <span>Problem</span>: <b><span id=\"CurrentMathProblem\">{{CurrentMathProblem.expression}} = </span></b>\n    <input id='InputMathAnswer' type='text' class='txtInputMathAnswer'> <input id='SubmitMathAnswer' type='button' value='Enter'>\n  </div>\n</div>\n";
            this.templateWordListing = "\n<optgroup>\n  {{#each this}}\n  <option>{{this}}</option>\n  {{/each}}\n</optgroup>\n";
            this.render = function (game) {
                _this.el = HBRender.renderTemplate(_this.template, game);
                _this.tdGoodGuy = _this.el.querySelector("#GoodGuyCell");
                _this.tdBadGuy = _this.el.querySelector("#BadGuyCell");
                _this.tdGoodGuyMinions = _this.el.querySelector("#GoodGuyMinionsCell");
                _this.tdBadGuyMinions = _this.el.querySelector("#BadGuyMinionsCell");
                _this.divGoodGuyPortrait = _this.el.querySelector("#DivGoodGuyPortrait");
                _this.divBadGuyPortrait = _this.el.querySelector("#DivBadGuyPortrait");
                _this.divAdminPanel = _this.el.querySelector("#DivAdminSettingsPanel");
                _this.divModalWindow = _this.el.querySelector("#ModalWindow");
                _this.divModalContent = _this.el.querySelector("#ModalContent");
                _this.btnUsePowerup = _this.el.querySelector("#BtnUsePowerup");
                _this.btnShowCurrentWord = _this.el.querySelector("#BtnShowCurrentWord");
                _this.btnSayCurrentWord = _this.el.querySelector("#BtnSayCurrentWord");
                _this.btnSubmitWordAnswer = _this.el.querySelector("#BtnSubmitButton");
                _this.selWordPicker = _this.el.querySelector("#SelWordPicker");
                if (_this.game.Settings.GameMode === BO.GameMode.admin) {
                    _this.renderAdminPanel();
                    setTimeout(function () { _this.showAdminPanel(false); }, 1000);
                }
                _this.renderScene(game.CurrentScene);
                _this.renderWordListing(_this.game.WordSelector.getListOfWordsAtLevel(_this.game.Settings.CurrentLevel));
                _this.renderGoodGuy();
                _this.renderBadGuy();
                _this.renderRoster();
                _this.resetForm();
                return _this;
            };
            this.game = arena;
            this.render(arena);
            this.wireup();
            return this;
        }
        GameUI.prototype.renderScene = function (scene) {
            document.body.style.backgroundImage = "url('" + this.game.CurrentScene.bgImageUrl + "')";
            document.body.style.backgroundSize = "100%";
            document.body.style.backgroundRepeat = "no-repeat";
            return this;
        };
        ;
        GameUI.prototype.renderAdminPanel = function () {
            this.divAdminPanel.appendChild(this.game.Settings.UI.render());
            document.body.appendChild(this.divAdminPanel);
        };
        GameUI.prototype.showAdminPanel = function (b) {
            if (b) {
                this.divAdminPanel.style.left = "0";
            }
            else {
                this.divAdminPanel.style.left = '0';
            }
        };
        GameUI.prototype.renderGoodGuy = function () {
            this.renderCharacter(this.game.GoodGuy, this.tdGoodGuy);
            this.renderCharacterPortrait(this.game.GoodGuy, this.divGoodGuyPortrait);
            this.renderGoodGuyMinions();
            console.log(this.game.GoodGuy.minions);
        };
        GameUI.prototype.renderBadGuy = function () {
            var _this = this;
            this.renderCharacter(this.game.BadGuy, this.tdBadGuy);
            this.renderCharacterPortrait(this.game.BadGuy, this.divBadGuyPortrait);
            this.renderBadGuyMinions();
            this.game.BadGuy.UI.el.onclick = function (e) {
                _this.setEnemyAsCurrentTarget(_this.game.BadGuy);
            };
        };
        GameUI.prototype.renderGoodGuyMinions = function () {
            this.renderCharacterMinions(this.game.GoodGuy, this.tdGoodGuyMinions);
        };
        GameUI.prototype.renderBadGuyMinions = function () {
            var _this = this;
            this.renderCharacterMinions(this.game.BadGuy, this.tdBadGuyMinions);
            this.game.BadGuy.minions.forEach(function (minion) {
                minion.UI.el.onclick = function (e) {
                    _this.setEnemyAsCurrentTarget(minion);
                };
            });
        };
        GameUI.prototype.renderCharacter = function (character, el) {
            el.innerHTML = "";
            el.appendChild(character.UI.render());
            return this;
        };
        GameUI.prototype.renderCharacterPortrait = function (character, div) {
            var foo = new UI.CharacterPortraitUI(character);
            div.innerHTML = "";
            div.appendChild(foo.render());
            return this;
        };
        GameUI.prototype.renderCharacterMinions = function (character, td) {
            td.innerHTML = "";
            character.minions.forEach(function (minion) {
                td.appendChild(minion.UI.render());
            });
            return this;
        };
        GameUI.prototype.renderRoster = function () {
            var rosterHook = document.getElementById("RosterHook");
            if (rosterHook) {
                rosterHook.innerHTML = "";
                rosterHook.parentElement.removeChild(rosterHook);
            }
            var div = document.createElement("div");
            div.setAttribute("id", "RosterHook");
            div.appendChild(this.game.Roster.UI.render());
            document.body.appendChild(div);
        };
        GameUI.prototype.saveSettings = function () {
            var settings = this.game;
        };
        GameUI.prototype.setEnemyAsCurrentTarget = function (enemy) {
            this.unsetCurrentTarget();
            this.game.CurrentTarget = enemy;
            enemy.UI.showAsCurrentTarget(true);
        };
        GameUI.prototype.unsetCurrentTarget = function () {
            if (this.game.CurrentTarget != undefined) {
                this.game.CurrentTarget.UI.showAsCurrentTarget(false);
                this.game.CurrentTarget = null;
            }
        };
        GameUI.prototype.renderWordListing = function (list) {
            var _this = this;
            this.selWordPicker.innerHTML = "";
            // We have to set the size of the select manually because
            // we aren't using the "multiple" attribute (because we only
            // want the kids to be able to pick a single word)
            this.selWordPicker.size = list.length;
            this.selWordPicker.appendChild(HBRender.renderTemplate(this.templateWordListing, list));
            setTimeout(function () {
                var w = _this.selWordPicker.offsetWidth + "px";
                _this.btnSubmitWordAnswer.style.width = w;
                _this.btnUsePowerup.style.width = w;
            }, 10);
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
        GameUI.prototype.showNewMathProblem = function () {
            var _this = this;
            this.game.cycleToNextMathProblem();
            this.showModalWindow(true);
            this.renderModalContent(this.templatePowerupMathProblem, this.game);
            var elTxtInput = this.divModalWindow.querySelector("#InputMathAnswer");
            var enterButton = this.divModalContent.querySelector("#SubmitMathAnswer");
            enterButton.onclick = function (e) {
                var userGotMathAnswerRight = _this.game.numberMatchesCurrentMathProblemAnswer(parseInt(elTxtInput.value.trim()));
                if (userGotMathAnswerRight) {
                    _this.runUserGotMathAnswerRight();
                }
                else {
                    _this.runUserGotMathAnswerWrong();
                }
                _this.showModalWindow(false);
                _this.showNewMathProblemButton(_this.game.GoodGuy.currentPowerups > 0 ? true : false);
            };
        };
        GameUI.prototype.showNewMathProblemButton = function (b) {
            var $el = $(this.btnUsePowerup);
            if (b) {
                $el.show();
            }
            else {
                $el.hide();
            }
        };
        GameUI.prototype.runUserGotMathAnswerWrong = function () {
            this.game.decreaseCharacterPowerups(this.game.GoodGuy, 1);
            this.renderGoodGuy();
            this.game.playWrongAnswerSound();
            this.game.speak("Incorrect. The correct answer was " + this.game.CurrentMathProblem.accepts[0]);
        };
        GameUI.prototype.runUserGotMathAnswerRight = function () {
            // Let's not take away the powerup if the user gets the answer right.
            //this.game.decreaseCharacterPowerups(this.game.GoodGuy, 1);
            this.game.increaseCharacterHealth(this.game.GoodGuy, 1);
            this.renderGoodGuy();
            this.game.speak("Correct. Powerup Rewarded!");
            this.game.playCorrectAnswerSound();
        };
        GameUI.prototype.resetForm = function () {
            $(this.selWordPicker).val([]);
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
            this.btnUsePowerup.onclick = function (e) {
                _this.showNewMathProblem();
            };
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
            this.btnSubmitWordAnswer.onclick = function (e) {
                var enteredWord = _this.selWordPicker.value;
                var isCorrectWord = game.checkWordMatchesCurrentWord(enteredWord);
                var enemy = game.CurrentTarget;
                if (!enemy) {
                    self.game.speak("Please select a target");
                    return;
                }
                if (enemy.currentHealth === 0) {
                    self.game.speak("That target is already defeated. Please select another target");
                    return;
                }
                if (isCorrectWord) {
                    var cntDamage = self.game.HasUsedCurrentWordHint ? 1 : 2;
                    self.game.reduceCharacterHealth(game.CurrentTarget, cntDamage);
                    self.renderBadGuy();
                    self.game.playCorrectAnswerSound();
                    self.game.speak("That's right!");
                    self.game.cycleToNextWord();
                    self.showShowCurrentWordButton(true);
                    self.game.HasUsedCurrentWordHint = false;
                    self.resetForm();
                }
                else {
                    self.game.reduceCharacterHealth(self.game.GoodGuy, 1);
                    self.showShowCurrentWordButton(true);
                    self.renderGoodGuy();
                    self.game.playWrongAnswerSound();
                    self.showShowCurrentWordButton(true);
                    self.game.speak("Try again!");
                    self.game.speak("The word is ");
                    self.game.speakCurrentWordAndPhrase();
                }
                // reset the target to nothing. the user needs to 
                // select the bad guy they want to target
                self.unsetCurrentTarget();
                if (!self.game.checkAllEnemiesOnLevelAreDefeated()) {
                    self.game.speak("The next word is ");
                    self.game.speakCurrentWordAndPhrase();
                }
                else {
                    self.game.speak("Mega Man Wins!");
                    setTimeout(function () {
                        if (self.game.BadGuy === self.game.Roster.BadGuys[self.game.Roster.BadGuys.length - 1]) {
                            self.game.unlockSecretLevels();
                        }
                        self.game.cycleToNextBadGuy();
                        self.game.cycleToNextScene();
                        self.renderRoster();
                        self.renderScene(self.game.CurrentScene);
                        self.renderWordListing(_this.game.WordSelector.getListOfWordsAtLevel(_this.game.Settings.CurrentLevel));
                        self.game.speakCurrentBadGuyIntro();
                        self.renderBadGuy();
                        self.game.cycleToNextWord();
                        self.showShowCurrentWordButton(true);
                        self.game.HasUsedCurrentWordHint = false;
                        self.game.speak("The next word is ");
                        self.game.speakCurrentWordAndPhrase();
                    }, self.game.Settings.HintDuration);
                }
            };
            return this;
        };
        GameUI.prototype.cycleToNextBadGuy = function () {
            this.game.cycleToNextBadGuy();
            this.renderBadGuy();
            return this;
        };
        GameUI.prototype.cycleToPreviousBadGuy = function () {
            this.game.cycleToPreviousBadGuy();
            this.renderBadGuy();
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
        Handlebars.registerHelper('renderCharacterPowerups', function (currentPowerups, maxPowerups) {
            var strHtml = "<div>";
            for (var i = 0; i < maxPowerups; i++) {
                strHtml += "<div class='characterPowerupBlock ";
                if (i < currentPowerups) {
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
    var MinionUI = (function () {
        function MinionUI(minion) {
            this.template = "\n      <div class='minion highlightOnHover'>\n        <img src=\"{{imageUrl}}\" {{#if imageRequiresXAxisFlip}}class=\"XAxisFlip\"{{/if}}/>\n        {{#renderCharacterHealth currentHealth maxHealth}}{{/renderCharacterHealth}}\n        {{#unless currentHealth}}\n        <div class=\"characterIsDeadoverlay\"></div>\n        {{/unless}}\n      </div>\n";
            this.minion = minion;
            this.el = this.render();
            return this;
        }
        MinionUI.prototype.render = function () {
            this.el = HBRender.renderTemplate(this.template, this.minion);
            return this.el;
        };
        MinionUI.prototype.showAsCurrentTarget = function (b) {
            if (b) {
                this.el.classList.remove("highlightOnHover");
                this.el.classList.add("currentlyTargeted");
            }
            else {
                this.el.classList.remove("currentlyTargeted");
                this.el.classList.add("highlightOnHover");
            }
        };
        return MinionUI;
    })();
    UI.MinionUI = MinionUI;
})(UI || (UI = {}));
var UI;
(function (UI) {
    var RosterUI = (function () {
        function RosterUI(roster) {
            this.template = "\n    <div class=\"Roster\">\n      {{#each BadGuys}}\n      <div class='RosterPortrait' style=\"background-image:url('{{imageUrl}}')\" data-level='{{difficulty}}'>\n        <div class='RosterPortraitBG'></div>\n        <div class='RosterCharacterName'>{{name}}</div>\n        <div class='RosterCharacterDifficulty'>{{difficulty}}</div>\n        {{#unless currentHealth}}\n        <div class=\"characterIsDeadoverlay\"></div>\n        {{/unless}}\n      </div>\n      {{/each}}\n    </div>\n";
            this.roster = roster;
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