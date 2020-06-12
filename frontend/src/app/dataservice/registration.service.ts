import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Registration } from 'src/app/models/Registration.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private appUsersUrl = 'http://localhost:3000/api/carsolenauser';

  constructor(private http: HttpClient) { }

  // Create User(C)
  addRegistration(carsolenauser: Registration): Observable<Registration> {
    return this.http.post<Registration>(this.appUsersUrl, carsolenauser, httpOptions);
  }
  // get one User(R1)---------------------------------------------------------------------------------------------
  getRegistration(id: string): Observable<Registration> {
    const url = `${this.appUsersUrl}/${id}`;
    return this.http.get<Registration>(url);
  }
  // get multiple  Users(Rn)----------------------------------------------------------------------------------------
  getRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.appUsersUrl);
  }
  // Update  User(U)-------------------------------------------------------------------------------------------------
  updateRegistration(carsolenauser: Registration): Observable<any> {
    return this.http.put(this.appUsersUrl, carsolenauser, httpOptions);
  }
  // Delete User(D)---------------------------------------------------------------------------------------
  deleteRegistration(carsolenauser: Registration | string): Observable<Registration> {
    const id = typeof carsolenauser === 'string' ? carsolenauser : carsolenauser._id;
    const url = `${this.appUsersUrl}/${id}`;
    return this.http.delete<Registration>(url, httpOptions);
  }
 // getting unique email id
 userRegistration(carsolenauser: Registration): Observable<Registration> {
  return this.http.post<Registration>(
    "http://localhost:3000/carsolenauser/userRegistration",
    carsolenauser,
    httpOptions
  );
}

}
