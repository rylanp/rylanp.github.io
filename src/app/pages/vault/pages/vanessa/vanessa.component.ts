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
( 0, 6)              RPH  Originally thought to never occur, it was realized in October of 2025
( 1, 0)            EATUP  Are you hungry?
( 1, 6)              ALE  A ginger soda
( 2, 0)             THAI  Future date
( 2, 6)              TEA  Just needs milk, sugar, and love from a special someone
( 3, 4)            TRIAD  Chord made with only 3 notes
( 4, 0)             BRAS  Very complicated to release someone from
( 4, 6)               OD  Too much
( 6, 1)           MARKET  I am not on it
( 7, 0)              LOL  Haha, that's funny
( 7, 4)            INERT  As it may appear before any arousal
( 8, 0)          ORALSEX  👉😝 ↔️ 📦😝
( 9, 0)          VANESSA  Cutest, kindest woman in the world
(10, 0)             ELSE  If ... then ... ____
(10, 6)              SEX  👉👌

Down Words:
( 0, 0)              WET  You get 💦
( 7, 0)             LOVE  💕 💕 💕
( 0, 1)              HAH  🤡
( 6, 1)            MORAL  Do the right thing
( 0, 2)            UTAMA  The family of a lovely woman
( 6, 2)            ALANS  Who's is this?
( 0, 3)              GUI  Visually stunning software
( 4, 3)              SIR  Lil Raccoon
( 8, 3)              LEE  Enter the Dragon star
( 6, 4)             KISS  Generally the first step before sleepovers
( 5, 5)            GENES  Soudns like my new pants, but they are not worn
( 0, 6)            RATIO  About 3 ciders to every 1 wine is good
( 6, 6)            TEXAS  Cowboy and cowgirl homeland
( 0, 7)            PLEAD  I really want a hug!
( 0, 8)             HEAD  Preferred alternative to avoid pregnancy
( 5, 8)           EATBOX  Hold your breath and where a wetsuit!
`;
  ngOnInit() {
      // 1. Call the parser directly with the string data
      this.puzzleData = parseCrosswordData(this.rawPuzzleDataString);
      this.isLoading = false;
    }
}
