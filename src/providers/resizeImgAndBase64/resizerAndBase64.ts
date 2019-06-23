import {Base64} from "@ionic-native/base64";
import {ImageResizer, ImageResizerOptions} from "@ionic-native/image-resizer";
import {Injectable} from "@angular/core";


@Injectable()
export class ResizerAndBase64{

   base64Arr:string[]=[];

      constructor (private base64: Base64,
                   private imageResizer: ImageResizer ){

      }

  public setBase64Arr(claimReceived:any[]){
    for (let data of claimReceived){
      if (data.imageURL !== undefined || data.imageURL !== ''){
        //resize the image
        let options = {
          uri: data.imageURL,
          folderName: 'ProtonetIonut',
          quality: 60,
          width: 340,
          height: 480
        } as ImageResizerOptions;
       this.imageResizer
          .resize(options)
          .then((filePath: string) => {
            //get base64 of the image
        this.base64
              .encodeFile(filePath)
              .then((value:string) => {
                this.base64Arr.push(value.replace('*;charset=utf-8', 'jpg'))
              })
            this.base64Arr = this.base64Arr;
          })

      }
    }
//   return this.base64Arr
  }
}
