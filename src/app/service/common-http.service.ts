import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
/**
 * 公共的http服务
 */
@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {

  constructor(
    private httpClient: HttpClient,
    private commonService:CommonService
  ) { }
  private baseUrl:string = '';

  /**
   * 公共 http 请求
   * @param type 请求类型，目前仅仅支持get 与 post
   * @param url 请求链接
   * @param params 参数
   * @returns 
   */
  public request(type:'post'|'get',url:string,params?:Object):Promise<any>{
    
    let aa = this.getHttpPromise(type,url,params).then(res=>{
      return res;
    }).catch(err=>{
      console.log("接口异常：",err)
      this.commonService.notification.create("error","接口异常",JSON.stringify(err));
    })
    return aa;
  }
  private getHttpPromise(type:string,url:string,params:any):Promise<any>{
    let options = {
      headers:new HttpHeaders({ 'Content-type': 'application/json' })
    }
    return new Promise((resolve,reject)=>{
      if(type == 'get'){
        let obj:any = Object.assign(options,{params})
        this.httpClient.get(url,obj).subscribe({
          next(res): any {
            resolve(res);
          },
          error(err): any {
            reject(err);
          }
        })
      }else{
        this.httpClient.post(url,params,options).subscribe({
          next(res): any {
            resolve(res);
          },
          error(err): any {
            reject(err);
          }
        })
      }
    })
  }
}
