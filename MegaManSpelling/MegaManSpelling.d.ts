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
    class Character {
        name: string;
        imageUrl: string;
        currentHealth: number;
        maxHealth: number;
        difficulty: number;
        UI: UI.CharacterUI;
        constructor(name: string, imageUrl: string, currentHealth: number, maxHealth: number, difficulty: number);
    }
}
declare module BO {
    class Game {
        HasUsedCurrentWordHint: boolean;
        CurrentWord: IWordBankEntry;
        Settings: GameSettings;
        GameVoice: Voice;
        GoodGuy: Character;
        BadGuy: Character;
        UI: UI.GameUI;
        constructor(gameSettings: GameSettings, gameVoice: Voice, currentWord: IWordBankEntry, goodGuy: Character, badGuy: Character);
        start(): Game;
        /**
         * Generates a new word for the user to guess and stores it in
         * the Game.CurrentWord field.
         * @method cycleToNextWord
         */
        cycleToNextWord(): void;
        /**
         * Promotes the player to the next level and sets the bad guy to that level's bad guy
         * @method cycleToNextBadGuy
         */
        cycleToNextBadGuy(): void;
        /**
         * Checks to see if a word matches the games's current selected word
         * @method wordMatchesCurrentWord
         * @param {string} s The word to check for a match against the games Current Word
         */
        wordMatchesCurrentWord(s: string): boolean;
        increaseCharacterHealth(char: Character, n: number): void;
        reduceCharacterHealth(char: Character, n: number): void;
        reduceGoodGuyHealth: any;
        speakCurrentWordAndPhrase(): void;
        speak(s: string): void;
        speakCurrentBadGuyIntro(): void;
        playCorrectAnswerSound(): void;
        playWrongAnswerSound(): void;
    }
}
declare module BO {
    class GameSettings {
        CurrentLevel: number;
        WordDifficulty: number;
        PlayerName: string;
        HintDuration: number;
    }
}
declare module BO {
    class Roster {
        BadGuys: Array<Character>;
        UI: UI.RosterUI;
        constructor();
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
        Level3Words: Array<string>;
    }
    class WordSelector {
        chooseRandomWordFromBank(bank: Array<IWordBankEntry>): IWordBankEntry;
    }
}
declare module UI {
    class CharacterUI implements IUiElement {
        el: HTMLElement;
        character: BO.Character;
        template: string;
        constructor(character: BO.Character);
        render(): HTMLElement;
        putInJail(): void;
    }
}
declare module UI {
    class GameUI implements IUiElement {
        game: BO.Game;
        el: HTMLElement;
        tdGoodGuy: HTMLTableCellElement;
        tdBadGuy: HTMLTableCellElement;
        divModalWindow: HTMLDivElement;
        divModalContent: HTMLDivElement;
        btnShowCurrentWord: HTMLInputElement;
        btnSayCurrentWord: HTMLInputElement;
        btnSubmitAnswer: HTMLInputElement;
        txtUserEntry: HTMLInputElement;
        template: string;
        templateWordHintAndUsage: string;
        constructor(arena: BO.Game);
        render(game: BO.Game): GameUI;
        renderCharacter(character: BO.Character, td: HTMLTableCellElement): GameUI;
        renderModalContent(hbTemplate: string, data: any): void;
        showModalWindow(b: boolean): void;
        showCurrentWord(b: boolean): void;
        showShowCurrentWordButton(b: boolean): void;
        resetForm(): void;
        wireup(): GameUI;
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
    class RosterUI implements IUiElement {
        el: HTMLElement;
        roster: BO.Roster;
        template: string;
        constructor(roster: BO.Roster);
        render(): HTMLElement;
    }
}
