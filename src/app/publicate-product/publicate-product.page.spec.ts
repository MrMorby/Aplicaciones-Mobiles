import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicateProductPage } from './publicate-product.page';

describe('PublicateProductPage', () => {
  let component: PublicateProductPage;
  let fixture: ComponentFixture<PublicateProductPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicateProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
