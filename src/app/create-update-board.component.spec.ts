import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateBoardComponent } from './create-update-board.component';

describe('CreateUpdateBoardComponent', () => {
  let component: CreateUpdateBoardComponent;
  let fixture: ComponentFixture<CreateUpdateBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
