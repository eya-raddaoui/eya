import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllForumPostComponent } from './all-forum-post.component';

describe('AllForumPostComponent', () => {
  let component: AllForumPostComponent;
  let fixture: ComponentFixture<AllForumPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllForumPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllForumPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
