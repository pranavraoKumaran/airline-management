import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testcomponent } from './testcomponent';

describe('Testcomponent', () => {
  let component: Testcomponent;
  let fixture: ComponentFixture<Testcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Testcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
