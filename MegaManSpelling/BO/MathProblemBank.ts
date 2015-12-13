module BO {

  export interface IMathProblemEntry {
    expression: string;
    accepts: Array<number>;
    usage: string;
  }

  export class MathProblemBank {

    constructor() {

    }

    public Level1Problems: Array<IMathProblemEntry> = [
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

  export class MathProblemSelector {

    MathProblemBank: MathProblemBank = new MathProblemBank();

    chooseRandomExpressionFromBank(level: number): IMathProblemEntry {
      var min = 0,
        expressionlist: Array<IMathProblemEntry> = null;


      expressionlist = (level == 1) ? this.MathProblemBank.Level1Problems : this.MathProblemBank.Level1Problems;
        //: (level === 2) ? this.expressionBank.Level2expressions
        //  : (level === 3) ? this.expressionBank.Level3expressions
        //    : this.expressionBank.Level1expressions;


      var max = expressionlist.length - 1;
      var rand = Math.floor(Math.random() * (max - min + 1)) + min;

      return expressionlist[rand];
    }
  }
}  