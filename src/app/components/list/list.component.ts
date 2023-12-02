import { Component } from '@angular/core';
import { Nhanvien } from 'src/app/models/nhanvien.model';
import { NhanvienService } from 'src/app/services/nhanvien.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  nhanvien?: Nhanvien[];
  currentNhanVien: Nhanvien = {};
  currentIndex = -1;
  tenphongban = '';
  tuoi = 0;

  constructor(
    private _service: NhanvienService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.retrieveNhanVien();
  }
  retrieveNhanVien(): void {
    this._service.getAll().subscribe({
      next: (data) => {
        this.nhanvien = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
  refreshList(): void {
    this.retrieveNhanVien();
    this.currentNhanVien = {};
    this.currentIndex = -1;
  }
  setActiveNhanVien(_model: Nhanvien, index: number): void {
    this.currentNhanVien = _model;
    this.currentIndex = index;
  }
  removeAllData(): void {
    this._service.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e),
    });
  }
  searchTitle(): void {
    this.currentNhanVien = {};
    this.currentIndex = -1;

    if (this.tenphongban != null || this.tuoi > 0) {
      this._service.findByData(this.tenphongban, this.tuoi).subscribe({
        next: (data) => {
          this.nhanvien = data;
          console.log(data);
        },
        error: (e) => console.error(e),
      });
    } else {
      this.refreshList();
    }
  }
  deleteNV(id: number): void {
    this._service.delete(id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/nhanvien']);
        this.refreshList();
      },
      error: (e) => console.error(e),
    });
  }
}
