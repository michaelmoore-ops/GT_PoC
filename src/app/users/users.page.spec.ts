import { computed, signal } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { User } from '../services/user.model';
import { UserService } from '../services/user.service';

import { UsersPage } from './users.page';

const mockUsers = [
  {
    id: 1,
    name: 'Leanne Graham',
    email: 'Sincere@april.biz',
    company: { name: 'Romaguera-Crona' },
    address: { city: 'Gwenborough' },
  },
  {
    id: 2,
    name: 'Ervin Howell',
    email: 'Shanna@melissa.tv',
    company: { name: 'Deckow-Crist' },
    address: { city: 'Wisokyburgh' },
  },
] as User[];

/** A stand-in for UserService whose signals the tests set directly. */
class FakeUserService {
  readonly users = signal<User[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly count = computed(() => this.users().length);
  readonly reload = vi.fn();
}

describe('UsersPage', () => {
  let fixture: ComponentFixture<UsersPage>;
  let userService: FakeUserService;
  let host: HTMLElement;

  const render = async () => {
    fixture.detectChanges();
    await fixture.whenStable();
  };
  const byTestId = (id: string) => host.querySelector(`[data-testid="${id}"]`);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: UserService, useClass: FakeUserService }],
    });
    userService = TestBed.inject(UserService) as unknown as FakeUserService;
    fixture = TestBed.createComponent(UsersPage);
    host = fixture.nativeElement as HTMLElement;
  });

  it('shows a spinner while the users are loading', async () => {
    userService.isLoading.set(true);
    await render();

    expect(byTestId('loading')).not.toBeNull();
    expect(byTestId('user-list')).toBeNull();
  });

  it('lists each user with name, email, company and city', async () => {
    userService.users.set(mockUsers);
    await render();

    const items = host.querySelectorAll('[data-testid="user-list"] ion-item');
    expect(items).toHaveLength(2);
    expect(items[0].textContent).toContain('Leanne Graham');
    expect(items[0].textContent).toContain('Sincere@april.biz');
    expect(items[0].textContent).toContain('Romaguera-Crona');
    expect(items[0].textContent).toContain('Gwenborough');
    expect(items[1].textContent).toContain('Ervin Howell');
  });

  it('keeps showing the list while a refresh is in progress', async () => {
    userService.users.set(mockUsers);
    userService.isLoading.set(true);
    await render();

    expect(byTestId('loading')).toBeNull();
    expect(host.querySelectorAll('[data-testid="user-list"] ion-item')).toHaveLength(2);
  });

  it('shows a message when there are no users', async () => {
    await render();

    expect(byTestId('empty')?.textContent).toContain('No users found.');
  });

  it('shows the error and retries when "Try again" is clicked', async () => {
    userService.error.set('Could not load users. Please try again.');
    await render();

    const error = byTestId('error') as HTMLElement;
    expect(error.textContent).toContain('Could not load users. Please try again.');

    (error.querySelector('ion-button') as HTMLElement).click();
    expect(userService.reload).toHaveBeenCalledTimes(1);
  });

  it('reloads the users when the toolbar Refresh button is clicked', async () => {
    await render();

    (host.querySelector('ion-toolbar ion-buttons[slot="end"] ion-button') as HTMLElement).click();
    expect(userService.reload).toHaveBeenCalledTimes(1);
  });
});
