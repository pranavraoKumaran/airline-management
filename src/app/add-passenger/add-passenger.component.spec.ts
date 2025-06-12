import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPassengerComponent } from './add-passenger.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Gender } from '../models/model';

describe('AddPassengerComponent', () => {
  let component: AddPassengerComponent;
  let fixture: ComponentFixture<AddPassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPassengerComponent, HttpClientModule, CommonModule, FormsModule, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create add passenger component', () => {
    expect(component).toBeTruthy();
  });

  it('should render heading "Passenger Form"', () => {
    const heading = fixture.nativeElement.querySelector('h1');
    expect(heading.textContent).toContain('Passenger Form');
  });

  it('should be name input to passenger.name', async () => {
    const input = fixture.debugElement.query(By.css('input[name="name"]')).nativeElement;
    input.value = 'sample';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.newPassenger.name).toBe('sample');
  });

  it('should call addPassenger on submite', () => {
    spyOn(component, 'addPassenger');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    expect(component.addPassenger).toHaveBeenCalled();
  })

  it('should populate gender dropdown with options', () => {
    component.genders = [
      Gender.female, Gender.male
    ];
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('select[name="gender"] option'));

    expect(options.length).toBe(2);
    expect(options[0].nativeElement.textContent.trim()).toBe("Female");
    expect(options[1].nativeElement.textContent.trim()).toBe("Male");

  })

});
