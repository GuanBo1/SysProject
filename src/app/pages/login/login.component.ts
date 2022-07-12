import { CommonService } from './../../service/common.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonHttpService } from 'src/app/service/common-http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private commonHttpService: CommonHttpService,
    private commonService:CommonService,
    private router: Router
  ) {}
  validateForm!: FormGroup;
  async submitForm(): Promise<void> {
    if (this.validateForm.valid) {
      //请求后端接口
      let res = await this.commonHttpService.request(
        'post',
        '/api/userInfo/login',
        this.validateForm.value
      );
      if(res.code == -1){
        this.commonService.notification.error("登陆失败","用户名或者密码错误!")
      }
      res.code == 0 && this.router.navigate(['main']);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
}
