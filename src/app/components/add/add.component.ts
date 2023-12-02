import { Component } from '@angular/core';
import { Nhanvien } from 'src/app/models/nhanvien.model';
import { NhanvienService } from 'src/app/services/nhanvien.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  model = new Nhanvien;
  submitted = false;

  constructor(private _service: NhanvienService) {}

  saveData(): void {
    const data = {
      manv: this.model.manv,
      tennhanvien: this.model.tennhanvien,
      tenphongban: this.model.tenphongban,
      gioitinh: this.model.gioitinh,
      tuoi: this.model.tuoi
    };

    this._service.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e),
    });
  }

  newDiemkhoan(): void {
    this.submitted = false;
    this.model = new Nhanvien();
  }
}
