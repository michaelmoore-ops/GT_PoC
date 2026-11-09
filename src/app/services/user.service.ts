import { httpResource } from '@angular/common/http';
import { computed, Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import type { User } from './user.model';

/**
 * Loads the list of users and exposes it as read-only signals.
 *
 * Components inject this service and read the signals in their templates;
 * they never subscribe or manage loading/error state themselves.
 */
@Injectable({ providedIn: 'root' })
export class UserService {
  /**
   * `httpResource` issues the GET request and tracks its state as signals
   * (value, isLoading, error, status). It is private so consumers can only
   * read state through the signals below, not call `.set()` on the resource.
   */
  private readonly usersResource = httpResource<User[]>(() => `${environment.apiUrl}/users`, {
    defaultValue: [],
  });

  /** The loaded users; an empty array until the request succeeds. */
  readonly users = computed(() => (this.usersResource.hasValue() ? this.usersResource.value() : []));

  /** True while the request is in flight (initial load or reload). */
  readonly isLoading = this.usersResource.isLoading;

  /** A user-friendly error message, or null when there is no error. */
  readonly error = computed(() => (this.usersResource.error() ? 'Could not load users. Please try again.' : null));

  /** Number of users loaded. */
  readonly count = computed(() => this.users().length);

  /** Re-fetches the users, for example from a retry button or pull-to-refresh. */
  reload(): void {
    this.usersResource.reload();
  }
}
