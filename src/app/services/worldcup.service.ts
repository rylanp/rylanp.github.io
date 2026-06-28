import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

export interface Team {
  id: number;
  name: string;
}

export interface Match {
  round: number;

  teamA: string;
  scoreA: number;

  teamB: string;
  scoreB: number;
  won: boolean;
  date: string | undefined;
}

export interface Round {
  roundNumber: number;
  matches: Match[];
}

export interface SurvivorPlayer {
  name: string;

  picks: Match[];

  eliminated?: boolean;
}

export interface ThirdPlaceRule {
  combination: string;

  slot1A: string;
  slot1B: string;
  slot1D: string;
  slot1E: string;
  slot1G: string;
  slot1I: string;
  slot1K: string;
  slot1L: string;
}

export interface WorldCupDatabase {
  matchlist: DataFrame<Match>;
  teams: DataFrame<Team>;
  matches: DataFrame<Match>;
  rounds: Round[];
  players: DataFrame<SurvivorPlayer>;
  thirdPlaceRules: DataFrame<ThirdPlaceRule>;
}
export class DataFrame<T> {

  constructor(
    readonly rows: T[]
  ) {}

  filter(
    predicate: (row: T) => boolean
  ): DataFrame<T> {

    return new DataFrame(
      this.rows.filter(predicate)
    );
  }

  find(
    predicate: (row: T) => boolean
  ): T | undefined {

    return this.rows.find(predicate);
  }

  map<U>(
    mapper: (row: T) => U
  ): DataFrame<U> {

    return new DataFrame(
      this.rows.map(mapper)
    );
  }

  first(): T | undefined {
    return this.rows[0];
  }

  toArray(): T[] {
    return [...this.rows];
  }

  get count(): number {
    return this.rows.length;
  }
}

@Injectable({
  providedIn: 'root'
})
export class WorldcupService {

  async loadWorkbook(
    assetPath: string = 'worldcup.xlsx'
  ): Promise<WorldCupDatabase> {

    const response =
      await fetch(assetPath);

    const workbook =
      XLSX.read(
        await response.arrayBuffer(),
        { type: 'array' }
      );

    const teams =
      this.loadTeams(workbook);

    const rounds =
      this.loadRounds(workbook);

    const players =
      this.loadPlayers(workbook);

    const thirdPlaceRules =
      this.loadThirdPlaceRules(workbook);

    const matches =
      rounds.flatMap(r => r.matches);
      
    const matchlist = this.loadmatchlist(workbook);

    return {
      matchlist: new DataFrame(matchlist),
      teams: new DataFrame(teams),
      matches: new DataFrame(matches),
      rounds,
      players: new DataFrame(players),
      thirdPlaceRules:
        new DataFrame(thirdPlaceRules)
    };
  }

  private sheet(
    workbook: XLSX.WorkBook,
    name: string
  ): any[][] {

    const ws =
      workbook.Sheets[name];

    if (!ws) {
      throw new Error(
        `Sheet ${name} not found`
      );
    }

    return XLSX.utils.sheet_to_json(
      ws,
      {
        header: 1,
        raw: true
      }
    );
  }

  private loadTeams(
    workbook: XLSX.WorkBook
  ): Team[] {

    const rows =
      this.sheet(workbook, 'AllTeams');

    return rows
      .filter(r => r[0])
      .map((r, index) => ({
        id: index + 1,
        name: String(r[0]).trim()
      }));
  }

  private loadmatchlist(
    workbook: XLSX.WorkBook
  ): Match[] {

    const rows =
      this.sheet(workbook, 'Rounds');

    const rounds: Round[] = [];

    for (let roundIndex = 0; roundIndex < 8; roundIndex++) {

      const baseCol =
        roundIndex * 4;

      const matches: Match[] = [];

      for (let row = 1; row < rows.length; row++) {

        const r = rows[row];

        const teamA =
          r?.[baseCol];

        const scoreA =
          Number(r?.[baseCol + 1] ?? undefined);

        const scoreB =
          Number(r?.[baseCol + 2] ?? undefined);

        const teamB =
          r?.[baseCol + 3];

        if (
          !teamA ||
          !teamB
        ) {
          continue;
        }

        const canwin = (scoreA != undefined && scoreB != undefined)
        var won = false;
        if (canwin){
          won = scoreA > scoreB
        }

        matches.push({
          round: roundIndex + 1,

          teamA: String(teamA),
          scoreA,

          teamB: String(teamB),
          scoreB,
          won: won,
          date: undefined
        });
      }

      rounds.push({
        roundNumber:
          roundIndex + 1,
        matches
      });
    }

    return rounds.flatMap(r => r.matches);
  }

  private excelTimeToString(excelTime: number): string {

    const totalMinutes =
      Math.round(excelTime * 24 * 60);

    const hours =
      Math.floor(totalMinutes / 60);

    const minutes =
      totalMinutes % 60;

    const period =
      hours >= 12 ? 'PM' : 'AM';

    const displayHours =
      ((hours + 11) % 12) + 1;

    return `${displayHours}:${minutes
      .toString()
      .padStart(2, '0')} ${period}`;
  }

  private loadRounds(
    workbook: XLSX.WorkBook
  ): Round[] {

    const rows =
      this.sheet(workbook, 'Rounds');

    const rounds: Round[] = [];

    for (let roundIndex = 0; roundIndex < 8; roundIndex++) {

      const baseCol =
        roundIndex * 4;

      const matches: Match[] = [];

      for (let row = 1; row < rows.length; row++) {

        const r = rows[row];

        const teamA =
          r?.[baseCol];

        const scoreA =
          Number(r?.[baseCol + 1] ?? 0);

        const scoreB =
          Number(r?.[baseCol + 2] ?? 0);

        const teamB =
          r?.[baseCol + 3];

        if (
          !teamA ||
          !teamB
        ) {
          continue;
        }

        matches.push({
          round: roundIndex + 1,

          teamA: String(teamA),
          scoreA,

          teamB: String(teamB),
          scoreB,
          won: scoreA > scoreB,
          date: undefined
        });
      }

      rounds.push({
        roundNumber:
          roundIndex + 1,
        matches
      });
    }

    return rounds;
  }

  private loadPlayers(
    workbook: XLSX.WorkBook
  ): SurvivorPlayer[] {

    const rows =
      this.sheet(workbook, 'Survivor');

    const players: SurvivorPlayer[] = [];

    for (
      let row = 1;
      row < rows.length;
      row++
    ) {

      const r = rows[row];

      if (!r?.[0]) {
        continue;
      }

      const picks =
        r.slice(1)
          .map(String);
      var actual_picks: string[] = [];
      for (let index = 0; index < picks.length; index+=4) {
        console.log(picks[index], picks[index+1], picks[index+2], picks[index+3]);
        if (picks[index] === "0"){
          break;
        }
        actual_picks.push(picks[index]);
        actual_picks.push(picks[index+1]);
        actual_picks.push(picks[index+2]);
        actual_picks.push(picks[index+3]);
      }
      var matches: Match[] = [];
      for (let index = 0; index < actual_picks.length; index+=4) {
        var m: Match = {
          round: Math.floor(index / 4) + 1,
          teamA: actual_picks[index],
          scoreA: Number(actual_picks[index+1]),
          teamB: actual_picks[index+3],
          scoreB: Number(actual_picks[index+2]),
          won: Number(actual_picks[index+1]) > Number(actual_picks[index+2]),
          date: undefined
        };
        if (Number.isNaN(m.scoreA) || Number.isNaN(m.scoreB)){
          m.won = true;
        }
        matches.push(m);
      }

      players.push({
        name: String(r[0]),
        picks: matches
      });
    }

    return players;
  }

  private loadThirdPlaceRules(
    workbook: XLSX.WorkBook
  ): ThirdPlaceRule[] {

    const rows =
      this.sheet(
        workbook,
        '3rd places'
      );

    const rules: ThirdPlaceRule[] = [];

    for (
      let row = 5;
      row < rows.length;
      row++
    ) {

      const r = rows[row];

      if (!r?.[2]) {
        continue;
      }

      rules.push({
        combination:
          String(r[2]),

        slot1A:
          String(r[3]),

        slot1B:
          String(r[4]),

        slot1D:
          String(r[5]),

        slot1E:
          String(r[6]),

        slot1G:
          String(r[7]),

        slot1I:
          String(r[8]),

        slot1K:
          String(r[9]),

        slot1L:
          String(r[10])
      });
    }

    return rules;
  }
}
