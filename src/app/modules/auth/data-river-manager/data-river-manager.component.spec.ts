import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRiverManagerComponent } from './data-river-manager.component';

describe('DataRiverManagerComponent', () => {
  let component: DataRiverManagerComponent;
  let fixture: ComponentFixture<DataRiverManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataRiverManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataRiverManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
