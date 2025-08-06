import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUpdaterComponent } from './detail-updater.component';

describe('DetailUpdaterComponent', () => {
  let component: DetailUpdaterComponent;
  let fixture: ComponentFixture<DetailUpdaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailUpdaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailUpdaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
