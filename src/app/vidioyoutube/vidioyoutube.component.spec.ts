import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VidioyoutubeComponent } from './vidioyoutube.component';

describe('VidioyoutubeComponent', () => {
  let component: VidioyoutubeComponent;
  let fixture: ComponentFixture<VidioyoutubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VidioyoutubeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VidioyoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
