import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeVaultComponent } from './recipe-vault.component';

describe('RecipeVaultComponent', () => {
  let component: RecipeVaultComponent;
  let fixture: ComponentFixture<RecipeVaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeVaultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeVaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
