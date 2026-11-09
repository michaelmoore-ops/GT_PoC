import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect } from 'vitest';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let host: HTMLElement;

  const echo = (): HTMLParagraphElement | null => host.querySelector('#container p');

  beforeEach(async () => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts with an empty input value', () => {
    expect(component.inputValue).toBe('');
  });

  it('renders the heading and the input', () => {
    expect(host.querySelector('h2')?.textContent).toContain('Ready to create an app?');
    expect(host.querySelector('ion-input')).not.toBeNull();
  });

  it('does not show the echo paragraph when the input is empty', () => {
    expect(echo()).toBeNull();
  });

  it('shows the current value in a paragraph when inputValue is set', async () => {
    component.inputValue = 'Hello Ionic';
    fixture.detectChanges();
    await fixture.whenStable();

    expect(echo()?.textContent?.trim()).toBe('Hello Ionic');
  });

  it('hides the paragraph again when the value is cleared', async () => {
    component.inputValue = 'temp';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(echo()).not.toBeNull();

    component.inputValue = '';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(echo()).toBeNull();
  });

  it('updates inputValue and the paragraph when the user types', async () => {
    const input = host.querySelector('ion-input') as HTMLElement & { value: string };
    input.value = 'typed text';
    input.dispatchEvent(new CustomEvent('ionInput', { detail: { value: 'typed text' }, bubbles: true }));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.inputValue).toBe('typed text');
    expect(echo()?.textContent?.trim()).toBe('typed text');
  });
});
