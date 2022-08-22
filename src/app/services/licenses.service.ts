import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { License } from '../models/license.model';

@Injectable({
  providedIn: 'root'
})
export class LicensesService {

  baseApiUrl:string=environment.baseApiUrl

  constructor(private http: HttpClient) { }
  getAllLicenses():Observable<License[]> {
    return this.http.get<License[]>(this.baseApiUrl + '/api/Licenses')
  }

  addLicense(license: License):Observable<License> {
    license.id = '00000000-0000-0000-0000-000000000000'
    return this.http.post<License>(this.baseApiUrl + '/api/Licenses', license) 
  }

  deleteLicense(id: string):Observable<License> {
    return this.http.delete<License>(this.baseApiUrl + '/api/Licenses/' + id)
  }
}
