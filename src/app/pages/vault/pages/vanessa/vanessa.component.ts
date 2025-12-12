import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for *ngIf
import { CrosswordComponent } from '../../../../components/crossword/crossword.component';
import { parseCrosswordData, ParsedPuzzle } from '../../../../utils/crossword.parser';
@Component({
  selector: 'app-vanessa',
  imports: [CrosswordComponent, CommonModule],
  templateUrl: './vanessa.component.html',
  styleUrl: './vanessa.component.scss'
})
export class VanessaComponent implements OnInit {
  puzzleData: ParsedPuzzle | null = null;
  isLoading = true;
  rawPuzzleDataString = `
WHUG##RPH
EATUP#ALE
THAI##TEA
##M#TRIAD
BRAS##OD#
###I#G##E
#MARKET#A
LOL#INERT
ORALSEX#B
VANESSA#O
ELSE##SEX

Across Words:
( 0, 0)             WHUG  A great act of wrapping up an adored one
( 0, 6)              RPH  Originally thought to never occur, realized in October of 2025
( 1, 0)            EATUP  Snack time!
( 1, 6)              ALE  Ginger soda
( 2, 0)             THAI  Cuisine for a future date
( 2, 6)              TEA  Milk, sugar, and love from a special someone
( 3, 4)            TRIAD  Three notes
( 4, 0)             BRAS  Challenging to remove, well worth the reward
( 4, 6)               OD  Excess of
( 6, 1)           MARKET  RP is not on it
( 7, 0)              LOL  Haha, that's funny
( 7, 4)            INERT  As it may appear before any arousal
( 8, 0)          ORALSEX  👉😝 ↔️ 📦😝
( 9, 0)          VANESSA  Cutest, kindest woman in the world (hot too!)
(10, 0)             ELSE  If then ____
(10, 6)              SEX  👉👌 🤰

Down Words:
( 0, 0)              WET  Horny when my bf is shirtless 🥵
( 0, 1)              HAH  🤡
( 0, 2)            UTAMA  The loving family of a lovely woman
( 0, 3)              GUI  Visually stunning software
( 0, 6)            RATIO  About 3 ciders to every 1 wine is good
( 0, 7)            PLEAD  I really want a hug! 🙏
( 0, 8)             HEAD  Very versatile: showers, cars, beds, etc.
( 4, 3)              SIR  Little Raccoon
( 5, 5)            GENES  Hand me downs from ones parents
( 5, 8)           EATBOX  Tongue meets splash zone
( 6, 1)            MORAL  Do the right thing
( 6, 2)            ALANS  Who's hex key is this?
( 6, 4)             KISS  First step before sleepovers for some
( 6, 6)            TEXAS  Cowboy and cowgirl homeland 🤠
( 7, 0)             LOVE  💕 💕 💕
( 8, 3)              LEE  Enter the Dragon star
`;
  ngOnInit() {
      // 1. Call the parser directly with the string data
      this.puzzleData = parseCrosswordData(this.rawPuzzleDataString);
      this.isLoading = false;
    }
}