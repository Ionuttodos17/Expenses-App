import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";


declare var cordova:any;
@Injectable()

export class ClaimService{

  private claims: any [] = [];

  constructor(private storage: Storage){}

  public addClaim(claim: any){
    this.claims.push(claim)
    this.storage.set('allClaims', this.claims)
      .then()
      .catch(err => {
        this.claims.splice(this.claims.indexOf(claim), 1)
      })
  }

  public loadClaims() {
    return this.claims.slice();
  }

  public fetchClaims() {
    return this.storage.get('allClaims')
      .then(
        (claims: any) => {
          this.claims = claims != null ? claims : [];
          return this.claims.sort((left:any,right:any):number =>{
            if(left.date<right.date) return 1;
            if(left.date>right.date) return -1;
            return 0;
          });

        }
      )
      .catch(
        err => console.log(err)
      );
  }

  deleteClaim(index: number) {
    const claim = this.claims[index];
    this.claims.splice(index, 1);
    this.storage.set('allClaims', this.claims)
      .then(
        () => {
        }
      )
      .catch(
        err => console.log(err)
      );
  }

}
