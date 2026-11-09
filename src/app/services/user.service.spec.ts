import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { environment } from '../../environments/environment';

import type { User } from './user.model';
import { UserService } from './user.service';

const usersUrl = `${environment.apiUrl}/users`;

const mockUsers = [
  { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz' },
  { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv' },
] as User[];

describe('UserService', () => {
  let service: UserService;
  let http: HttpTestingController;

  /** Lets the resource process the flushed response and update its signals. */
  const settle = () => TestBed.inject(ApplicationRef).whenStable();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UserService);
    http = TestBed.inject(HttpTestingController);
    // httpResource sends its request when Angular runs effects.
    TestBed.tick();
  });

  afterEach(() => {
    http.verify();
  });

  it('starts loading with an empty list and no error', () => {
    http.expectOne(usersUrl);
    expect(service.isLoading()).toBe(true);
    expect(service.users()).toEqual([]);
    expect(service.error()).toBeNull();
  });

  it('exposes the users returned by the API', async () => {
    http.expectOne({ method: 'GET', url: usersUrl }).flush(mockUsers);
    await settle();

    expect(service.isLoading()).toBe(false);
    expect(service.users()).toEqual(mockUsers);
    expect(service.count()).toBe(2);
    expect(service.error()).toBeNull();
  });

  it('exposes an error message and an empty list when the request fails', async () => {
    http.expectOne(usersUrl).flush('Server error', { status: 500, statusText: 'Server Error' });
    await settle();

    expect(service.isLoading()).toBe(false);
    expect(service.users()).toEqual([]);
    expect(service.error()).toBe('Could not load users. Please try again.');
  });

  it('fetches the users again on reload', async () => {
    http.expectOne(usersUrl).flush('Server error', { status: 500, statusText: 'Server Error' });
    await settle();

    service.reload();
    TestBed.tick();
    http.expectOne(usersUrl).flush(mockUsers);
    await settle();

    expect(service.users()).toEqual(mockUsers);
    expect(service.error()).toBeNull();
  });
});
