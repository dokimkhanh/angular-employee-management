import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nhanvien } from '../models/nhanvien.model';

const baseUrl = 'http://localhost:8080/api/nhanvien';

@Injectable({
  providedIn: 'root',
})
export class NhanvienService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<Nhanvien[]> {
    return this.http.get<Nhanvien[]>(baseUrl);
  }
  get(id: any): Observable<Nhanvien> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
    20;
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByData(phongban: string, tuoi: number): Observable<Nhanvien[]> {
    return this.http.get<Nhanvien[]>(`${baseUrl}?a=${phongban}&b=${tuoi}`);
  }
}
