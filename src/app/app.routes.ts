import { Routes } from '@angular/router';
import { RecipeVaultComponent } from './pages/recipe-vault/recipe-vault.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { GalacticwarfarepageComponent } from './pages/galacticwarfarepage/galacticwarfarepage.component';
import { PrivacyPolicyComponent } from './pages/recipe-vault/privacy-policy/privacy-policy.component';
import { CookiePolicyComponent } from './pages/recipe-vault/cookie-policy/cookie-policy.component';
import { DiscgolfComponent } from './pages/discgolf/discgolf.component';
import { PrivacyPolicyComponentDiscGolf } from './pages/discgolf/privacy-policy/privacy-policy.component';
import { AppAdsComponent } from './pages/discgolf/app-ads/app-ads.component';
import { DiscoverpocoComponent } from './pages/discoverpoco/discoverpoco.component';
import { PrivacyPolicyComponentPoco } from './pages/discoverpoco/privacy-policy/privacy-policy.component';
import { VaultComponent } from './pages/vault/vault.component';
import { VanessaComponent } from './pages/vault/pages/vanessa/vanessa.component';
import { GuardService } from './services/guard.service';
export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    { path: 'recipe-vault', component: RecipeVaultComponent},
    { path: 'recipe-vault/privacy-policy', component: PrivacyPolicyComponent},
    { path: 'recipe-vault/cookie-policy', component: CookiePolicyComponent},
    { path: 'recipe-vault/home', redirectTo: 'recipe-vault', pathMatch: 'full' },
    { path: 'recipe-vault/contact', redirectTo: 'recipe-vault', pathMatch: 'full' },

    { path: 'discgolfscoretracker', component: DiscgolfComponent},
    { path: 'discgolfscoretracker/privacy-policy', component: PrivacyPolicyComponentDiscGolf},
    { path: 'discgolfscoretracker/app-ads', component: AppAdsComponent},
    { path: 'discgolfscoretracker/home', redirectTo: 'discgolfscoretracker', pathMatch: 'full' },
    { path: 'discgolfscoretracker/contact', redirectTo: 'discgolfscoretracker', pathMatch: 'full' },

    { path: 'discoverpoco', component: DiscoverpocoComponent},
    { path: 'discoverpoco/privacy-policy', component: PrivacyPolicyComponentPoco},
    { path: 'discoverpoco/home', redirectTo: 'discoverpoco', pathMatch: 'full' },
    { path: 'discoverpoco/contact', redirectTo: 'discoverpoco', pathMatch: 'full' },

    { path: 'galactic-warfare', component: GalacticwarfarepageComponent},

    {path: 'vault', component: VaultComponent},
    {path: 'vault/vanessa', component: VanessaComponent, canActivate: [GuardService], data: { url: 'vault/vanessa' } },

    { path: 'lost', component: PagenotfoundComponent},
    { path: '**', redirectTo: 'lost', pathMatch: 'full' },
];
