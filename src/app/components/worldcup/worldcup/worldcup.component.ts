import { Component } from '@angular/core';
import { WorldcupService, Match } from '../../../services/worldcup.service';
@Component({
  selector: 'app-worldcup',
  imports: [],
  templateUrl: './worldcup.component.html',
  styleUrl: './worldcup.component.scss'
})
export class WorldcupComponent {
  loading: boolean = true;
  matches: Match[] = [];
  readonly Number = Number;
  constructor(private worldcupservice: WorldcupService){}

  async ngOnInit(): Promise<void> {

    const db =
      await this.worldcupservice.loadWorkbook();

    this.matches =
      db.matchlist.toArray();

    this.loading = false;
  }
}
