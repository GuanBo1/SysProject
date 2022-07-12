import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';


/**
 * 主要用于将所需要的公共的service进行抽取，其他需要时只需要注入此service即可
 */
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    public notification: NzNotificationService
  ) { }
}
