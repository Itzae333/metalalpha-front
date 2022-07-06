import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroventasComponent } from './registroventas.component';

describe('RegistroventasComponent', () => {
  let component: RegistroventasComponent;
  let fixture: ComponentFixture<RegistroventasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroventasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
