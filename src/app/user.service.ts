import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://127.0.0.1:8000/api/usuario/';

  constructor(private http: HttpClient) { }

  getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  createUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

  updateUsuario(id: number, usuario: Usuario): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.put(url, usuario);
  }  

  deleteUsuario(id: number): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.delete(url);
  }
}
