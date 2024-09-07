import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Vista2Page } from './vista2.page';

describe('Vista2Page', () => {
  let component: Vista2Page;
  let fixture: ComponentFixture<Vista2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Vista2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
