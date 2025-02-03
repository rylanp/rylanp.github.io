export class ProjectData {
    images: string[];
    strings: string[];
    buttonLinks: ButtonLink[];
    constructor(images: string[] = [], strings: string[] = [], butonLinks: ButtonLink[] = []) {
      this.images = images;
      this.strings = strings;
      this.buttonLinks = butonLinks;
    }
  }
export class ButtonLink {
    text: string;
    image: string;

    constructor(text: string = 'Button', image: string = 'RP.gif') {
      this.text = text;
      this.image = image;
    }
}
  