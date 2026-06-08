import { Component } from '@angular/core';
import { WorldcupService, SurvivorPlayer, Match } from '../../../services/worldcup.service';
@Component({
  selector: 'app-survivor',
  imports: [],
  templateUrl: './survivor.component.html',
  styleUrl: './survivor.component.scss'
})
export class SurvivorComponent {
  loading = true;
  players: SurvivorPlayer[] = [];
  matches: Match[] = [];
  readonly Number = Number;
  constructor(private worldcupService: WorldcupService) {

  }

  async ngOnInit(): Promise<void> {

    const db = await this.worldcupService.loadWorkbook();
    this.matches = db.matchlist.toArray();

    this.players = db.players.toArray();
    this.players.forEach(p => {
      console.log(p);
    })

    this.loading = false;
  }

  trackPlayer(
    index: number,
    player: SurvivorPlayer
  ): string {

    return player.name;
  }
  getMatchForRound(matches: Match[], round: number, team: string) {
    return matches.find(m => m.round === round && (m.teamA === team || m.teamB === team));
  }
  floor(value: number): number {
    return Math.floor(value);
  }
}
