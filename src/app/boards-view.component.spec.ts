import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsViewComponent } from './boards-view.component';

describe('BoardsViewComponent', () => {
  let component: BoardsViewComponent;
  let fixture: ComponentFixture<BoardsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
