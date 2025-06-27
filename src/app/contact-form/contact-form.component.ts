import { Component } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})

export class ContactFormComponent {
  sentform: Boolean = false;

  public sendEmail(e: Event) {
    if (this.sentform){
      return;
    }
    e.preventDefault();

    emailjs
      .sendForm('service_0cj39sd', 'template_wr5em3w', e.target as HTMLFormElement, {
        publicKey: 'Jff314ssiHxQbiqQ2',
      })
      .then(
        () => {
          console.log('SUCCESS!');
         this.sentform = true;
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
        },
      );
  }
}