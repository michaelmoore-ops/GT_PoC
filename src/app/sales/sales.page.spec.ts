import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { SalesPage } from './sales.page';

describe('SalesPage', () => {
  let fixture: ComponentFixture<SalesPage>;
  let host: HTMLElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(SalesPage);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('shows the Sales title', () => {
    expect(host.querySelector('ion-title')?.textContent).toContain('Sales');
  });

  it('shows a placeholder message', () => {
    expect(host.querySelector('[data-testid="sales-placeholder"]')?.textContent).toContain('No sales yet.');
  });
});
