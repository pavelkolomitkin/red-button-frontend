import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import RegisterData from '../data/model/register-data.model';
import User from '../../core/data/model/user.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import LoginCredentials from '../data/model/login-credentials.model';

@Injectable()
export class SecurityService
{
  constructor(private http: HttpClient) {}

  registerUser(data: RegisterData): Observable<User>
  {
    return this.http.post<{ user: User }>('/security/register', data).pipe(
      map(result => <User> result.user)
    );
  }

  registerConfirm(confirmationKey: string): Observable<User>
  {
    return this.http.post<{ user: User }>('/security/confirm-register/' + confirmationKey, {}).pipe(
      map(result => <User> result.user)
    );
  }

  login(credentials: LoginCredentials)
  {
    return this.http.post<{ token: string }>('/security/login_check', {
      username: credentials.email,
      password: credentials.password
    }).pipe(
      map(result => result.token)
    );
  }

  getAuthorizedUser()
  {
    return this.http.get<{user: User}>('/security/profile').pipe(
      map((result) => {
        return User.createFromRawData(result.user);
      })
    );
  }

  passwordRecoverRequest(email)
  {
    return this.http.post('/security/recovery-request', {
      email: email
    });
  }

  verifyRecoveryKey(key)
  {
    return this.http.get('/security/verify-recovery-key/' + key);
  }

  resetPassword(key: string, data: Object)
  {
    return this.http.put('/security/reset-password/' + key, data)
  }
}
