import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthcodewordService } from '../../services/authcodeword.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vault',
  imports: [FormsModule],
  templateUrl: './vault.component.html',
  styleUrl: './vault.component.scss'
})
export class VaultComponent {
  input_string: string = "";

  constructor(
    private authService: AuthcodewordService,   // <-- inject the shared service
    private router: Router
  ) {}

  submitText() {
    if (!this.authService.inputCode(this.input_string)) {// will auto route on success
      const input = document.getElementById('textInput') as HTMLInputElement | null;
      if (input){
        input.value = "";
      }
      this.input_string = "";
    }
    
  }
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9a-zA-Z$\(\)\[\]\.\,\'~%#@!&\*\|\\\/:\;?\{\}]/g, '').toUpperCase().slice(0,20);
    this.input_string = input.value;
  }
}
