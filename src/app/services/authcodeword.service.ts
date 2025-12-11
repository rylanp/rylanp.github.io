import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
type Page = {url: string, access: boolean}
type CodePage = Record<string, Page>;

@Injectable({
  providedIn: 'root'
})
export class AuthcodewordService {
  private dict: CodePage = {
    "CUTIE": {url: "vault/vanessa", access: false},
  };

  constructor(private router: Router) { }

  public inputCode(code: string, auto_route_success: boolean = true): Page | null {
    const key = code.toUpperCase();
    if (this.dict[key]) {
      this.dict[key].access = true;
      if (auto_route_success){
        this.router.navigate([this.dict[key].url]);
      }
      return this.dict[key]
    }
    return null;
  }

  public isValid(url: string): boolean {
    const keys = Object.keys(this.dict);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      if (url == this.dict[key].url){
        return this.dict[key].access;
      }
    }
    return false;
  }

  
}
