import { Routes } from '@angular/router';
import { RecipeVaultComponent } from './recipe-vault/recipe-vault.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GalacticwarfarepageComponent } from './galacticwarfarepage/galacticwarfarepage.component';
import { PrivacyPolicyComponent } from './recipe-vault/privacy-policy/privacy-policy.component';
import { CookiePolicyComponent } from './recipe-vault/cookie-policy/cookie-policy.component';
export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'recipe-vault', component: RecipeVaultComponent},
    { path: 'recipe-vault/privacy-policy', component: PrivacyPolicyComponent},
    { path: 'recipe-vault/cookie-policy', component: CookiePolicyComponent},
    { path: 'recipe-vault/home', redirectTo: 'recipe-vault', pathMatch: 'full' },
    { path: 'recipe-vault/contact', redirectTo: 'recipe-vault', pathMatch: 'full' },
    { path: 'galactic-warfare', component: GalacticwarfarepageComponent},
    { path: 'lost', component: PagenotfoundComponent},
    { path: '**', redirectTo: 'lost', pathMatch: 'full' },
];
