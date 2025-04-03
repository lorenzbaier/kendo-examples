import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTreeWrapperComponent } from './simple-tree-wrapper.component';

describe('SimpleTreeWrapperComponent', () => {
  let component: SimpleTreeWrapperComponent;
  let fixture: ComponentFixture<SimpleTreeWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleTreeWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimpleTreeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
