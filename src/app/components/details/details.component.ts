import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Nhanvien } from 'src/app/models/nhanvien.model';
import { NhanvienService } from 'src/app/services/nhanvien.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  @Input() viewMode = false;
  @Input() current = new Nhanvien();
  message = '';

  constructor(
    private _service: NhanvienService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getDiemkhoan(this.route.snapshot.params['id']);
    }
  }

  getDiemkhoan(id: any): void {
    this._service.get(id).subscribe({
      next: (data) => {
        this.current = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  updateDiemkhoan(): void {
    this.message = '';
    try {
      this._service.update(this.current.id, this.current).subscribe();
      this.message = 'Cập nhật dữ liệu thành công!';
    } catch (error) {
      this.message = 'Không thể cập nhật dữ liệu!';
      console.log(error);
    }
  }
}
