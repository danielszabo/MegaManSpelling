/// <reference path="Scripts/typings/handlebars/handlebars.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
declare class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;
    constructor(element: HTMLElement);
    start(): void;
    stop(): void;
}
declare class GameLauncher {
    constructor();
    launch(): void;
}
declare module BO {
    interface IDamageable {
        currentHealth: number;
        maxHealth: number;
        UI: UI.ITargetable;
    }
    interface IRenderable {
        UI: UI.ITargetable;
    }
    class Character implements IDamageable, IRenderable {
        name: string;
        imageUrl: string;
        portraitImgUrl: string;
        currentLevel: number;
        currentHealth: number;
        maxHealth: number;
        currentPowerups: number;
        maxPowerups: number;
        difficulty: number;
        minions: Array<BO.Minion>;
        UI: UI.CharacterUI;
        constructor(name: string, imageUrl: string, portraitImgUrl: string, currentHealth: number, maxHealth: number, currentPowerups: number, maxPowerups: number, difficulty: number, minions: Array<BO.Minion>);
    }
}
declare module BO {
    class Game {
        HasUsedCurrentWordHint: boolean;
        CurrentTarget: BO.IDamageable;
        CurrentWord: IWordBankEntry;
        WordSelector: WordSelector;
        CurrentMathProblem: IMathProblemEntry;
        MathProblemSelector: MathProblemSelector;
        CurrentScene: IScene;
        SceneSelector: SceneSelector;
        Settings: GameSettings;
        GameVoice: Voice;
        GoodGuy: Character;
        BadGuy: Character;
        Roster: Roster;
        UI: UI.GameUI;
        constructor(gameSettings: GameSettings, gameVoice: Voice, currentWord: IWordBankEntry, wordSelector: WordSelector, currentMathProblem: IMathProblemEntry, mathProblemSelector: MathProblemSelector, goodGuy: Character, badGuy: Character, roster: Roster, currentScene: IScene, sceneSelector: SceneSelector);
        start(): Game;
        /**
         * Generates a new word for the user to guess and stores it in
         * the Game.CurrentWord field.
         * @method cycleToNextWord
         */
        cycleToNextWord(): void;
        /**
         * Generates a new math problem for the user to guess and stores it in
         * the Game.CurrentMathProblem field
         */
        cycleToNextMathProblem(): void;
        /**
         * Generates a new scene (bg, music, etc.)
         */
        cycleToNextScene(): void;
        /**
         * Promotes the player to the next level and sets the bad guy to that level's bad guy
         * @method cycleToNextBadGuy
         */
        cycleToNextBadGuy(): void;
        /**
         * Promotes the player to the next level and sets the bad guy to that level's bad guy
         * @method cycleToNextBadGuy
         */
        cycleToPreviousBadGuy(): void;
        /**
         * Checks to see if a word matches the games's current selected word
         * @method wordMatchesCurrentWord
         * @param {string} s The word to check for a match against the games Current Word
         */
        checkWordMatchesCurrentWord(s: string): boolean;
        /**
         * Checks to see if the bad guy and all of his minions health
         * are all at zero.
         * @method checkAllEnemiesOnLevelAreDefeated
         * @returns {boolean} True if all enemies are defeated, false otherwise.
         */
        checkAllEnemiesOnLevelAreDefeated(): boolean;
        /**
         * Checks to see if a number is the solution to the game's current math problem
         * @method numberMatchesCurrentMathProblemAnswer
         * @param {number} n The guess/answer to the game's current Math Problem
         */
        numberMatchesCurrentMathProblemAnswer(n: number): boolean;
        increaseCharacterHealth(char: IDamageable, n: number): void;
        reduceCharacterHealth(char: IDamageable, n: number): void;
        increaseCharacterPowerups(char: Character, n: number): void;
        decreaseCharacterPowerups(char: Character, n: number): void;
        speakCurrentWordAndPhrase(): void;
        speak(s: string): void;
        speakCurrentBadGuyIntro(): void;
        playCorrectAnswerSound(): void;
        playWrongAnswerSound(): void;
        playExposionSound(): void;
        playEvilLaughter(): void;
        unlockSecretLevels(): void;
    }
}
declare module BO {
    class GameSettings {
        GameMode: GameMode;
        CurrentLevel: number;
        WordDifficulty: number;
        PlayerName: string;
        HintDuration: number;
        UI: UI.GameSettingsUI;
        constructor();
    }
    enum GameMode {
        easy = 0,
        medium = 1,
        hard = 2,
        admin = 3,
    }
}
declare module BO {
    interface IMathProblemEntry {
        expression: string;
        accepts: Array<number>;
        usage: string;
    }
    class MathProblemBank {
        constructor();
        Level1Problems: Array<IMathProblemEntry>;
    }
    class MathProblemSelector {
        MathProblemBank: MathProblemBank;
        chooseRandomExpressionFromBank(level: number): IMathProblemEntry;
    }
}
declare module BO {
    class Minion implements IDamageable, IRenderable {
        name: string;
        imageUrl: string;
        currentHealth: number;
        maxHealth: number;
        difficulty: number;
        imageRequiresXAxisFlip: boolean;
        UI: UI.MinionUI;
        constructor(name: string, imageUrl: string, currentHealth: number, maxHealth: number, difficulty: number, imageRequiresXAxisFlip?: boolean);
    }
}
declare module BO {
    class Roster {
        GoodGuys: Array<Character>;
        BadGuys: Array<Character>;
        SecretCharacters: Array<Character>;
        UI: UI.RosterUI;
        constructor();
    }
}
declare module BO {
    interface IScene {
        name: string;
        bgImageUrl: string;
        bgMusicUrl: string;
    }
    class SceneBank {
        Scenes: Array<IScene>;
        constructor();
    }
    class SceneSelector {
        SceneBank: SceneBank;
        constructor();
        chooseRandomSceneFromBank(): IScene;
    }
}
declare module BO {
    class Voice {
        constructor();
        speak(phrase: string): any;
    }
}
declare module BO {
    interface IWordBankEntry {
        word: string;
        accepts: Array<string>;
        usage: string;
    }
    class WordBank {
        constructor();
        Level1Words: Array<IWordBankEntry>;
        Level2Words: Array<IWordBankEntry>;
        Level3Words: Array<IWordBankEntry>;
        Level4Words: Array<IWordBankEntry>;
    }
    class WordSelector {
        WordBank: WordBank;
        chooseRandomWordFromBank(level: number): IWordBankEntry;
        getWordListAtLevel(level: number): Array<IWordBankEntry>;
        getListOfWordsAtLevel(level: number): Array<string>;
    }
}
declare module UI {
    interface ITargetable {
        showAsCurrentTarget(b: boolean): any;
        render(): HTMLElement;
    }
    class CharacterUI implements IUiElement, ITargetable {
        el: HTMLElement;
        character: BO.Character;
        template: string;
        constructor(character: BO.Character);
        render(): HTMLElement;
        showAsCurrentTarget(b: boolean): void;
    }
    class CharacterPortraitUI implements IUiElement {
        el: HTMLElement;
        character: BO.Character;
        template: string;
        constructor(character: BO.Character);
        render(): HTMLElement;
    }
}
declare module UI {
    class GameSettingsUI implements IUiElement {
        el: HTMLElement;
        gameSettings: BO.GameSettings;
        template: string;
        constructor(settings: BO.GameSettings);
        render(): HTMLElement;
        getSettings(): BO.GameSettings;
    }
}
declare module UI {
    class GameUI implements IUiElement {
        game: BO.Game;
        el: HTMLElement;
        divAdminPanel: HTMLDivElement;
        tdGoodGuy: HTMLTableCellElement;
        tdGoodGuyMinions: HTMLTableCellElement;
        tdBadGuy: HTMLTableCellElement;
        tdBadGuyMinions: HTMLTableCellElement;
        divGoodGuyPortrait: HTMLDivElement;
        divBadGuyPortrait: HTMLDivElement;
        divWordListing: HTMLTableCellElement;
        divModalWindow: HTMLDivElement;
        divModalContent: HTMLDivElement;
        btnShowCurrentWord: HTMLInputElement;
        btnSayCurrentWord: HTMLInputElement;
        btnSubmitWordAnswer: HTMLInputElement;
        btnUsePowerup: HTMLInputElement;
        selWordPicker: HTMLSelectElement;
        template: string;
        templateWordHintAndUsage: string;
        templatePowerupMathProblem: string;
        templateWordListing: string;
        constructor(arena: BO.Game);
        render: (game: BO.Game) => GameUI;
        renderScene(scene: BO.IScene): GameUI;
        renderAdminPanel(): void;
        showAdminPanel(b: boolean): void;
        renderGoodGuy(): void;
        renderBadGuy(): void;
        renderGoodGuyMinions(): void;
        renderBadGuyMinions(): void;
        renderCharacter(character: BO.IDamageable, el: HTMLElement): GameUI;
        renderCharacterPortrait(character: BO.Character, div: HTMLDivElement): GameUI;
        renderCharacterMinions(character: BO.Character, td: HTMLTableCellElement): GameUI;
        renderRoster(): void;
        saveSettings(): void;
        setEnemyAsCurrentTarget(enemy: BO.IDamageable): void;
        unsetCurrentTarget(): void;
        renderWordListing(list: Array<string>): void;
        renderModalContent(hbTemplate: string, data: any): void;
        showModalWindow(b: boolean): void;
        showCurrentWord(b: boolean): void;
        showShowCurrentWordButton(b: boolean): void;
        showNewMathProblem(): void;
        showNewMathProblemButton(b: boolean): void;
        runUserGotMathAnswerWrong(): void;
        runUserGotMathAnswerRight(): void;
        resetForm(): void;
        wireup(): GameUI;
        cycleToNextBadGuy(): GameUI;
        cycleToPreviousBadGuy(): GameUI;
    }
}
declare class HBRender {
    static init(): void;
    static renderTemplate(sourceHtml: string, viewModel: any): HTMLElement;
}
declare module UI {
    interface IUiElement {
        template: string;
        el: HTMLElement;
        render(context: any): any;
    }
}
declare module UI {
    class MinionUI implements IUiElement, ITargetable {
        el: HTMLElement;
        minion: BO.Minion;
        cssXAxisFlipClassName: string;
        template: string;
        constructor(minion: BO.Minion);
        render(): HTMLElement;
        showAsCurrentTarget(b: boolean): void;
    }
}
declare module UI {
    class RosterUI implements IUiElement {
        el: HTMLElement;
        roster: BO.Roster;
        template: string;
        constructor(roster: BO.Roster);
        render(): HTMLElement;
    }
}
