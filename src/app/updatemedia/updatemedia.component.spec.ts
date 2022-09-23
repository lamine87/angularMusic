import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatemediaComponent } from './updatemedia.component';

describe('UpdatemediaComponent', () => {
  let component: UpdatemediaComponent;
  let fixture: ComponentFixture<UpdatemediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatemediaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatemediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
