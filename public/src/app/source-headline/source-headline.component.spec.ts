import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceHeadlineComponent } from './source-headline.component';

describe('SourceHeadlineComponent', () => {
  let component: SourceHeadlineComponent;
  let fixture: ComponentFixture<SourceHeadlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceHeadlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceHeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
