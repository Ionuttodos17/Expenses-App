import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";


declare var cordova:any;
@Injectable()

export class AllData{

  public allEntries: any [] = [];
  private startDate : Date = new Date();

  constructor(private storage: Storage){}

  public addEntrie(entrie: any){

    this.allEntries.push(entrie);
    //sort all data before going into storage
    this.allEntries = this.allEntries.sort((left:any,right:any):number =>{
      if(left.date<right.date) return 1;
      if(left.date>right.date) return -1;
      return 0;
    });
    this.storage.set('allEntries', this.allEntries)
      .then()
      .catch(err => {
        this.allEntries.splice(this.allEntries.indexOf(entrie), 1)
      })
  }

  public loadEntries() {
    return this.allEntries.slice();
  }

  public fetchEntries() {
    return this.storage.get('allEntries')
      .then(
        (entries: any) => {
          this.allEntries = entries != null ? entries : [];
          return this.allEntries.sort((left:any,right:any):number =>{
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

    public deleteAllEntries(){
    this.storage.remove('allEntries');
    }

    public getStartDate(){
    var aVal:any[]=[];
    this.fetchEntries().then((entries:any)=> {aVal = entries;
        this.startDate = aVal[aVal.length-1].date;
    }
    )
        console.log(aVal)
      return this.startDate;
    }

    public getFirstDate(){
    return this.allEntries[this.allEntries.length-1].date;
    }
 /*
    public getTotalValueOfClaim(){
      var aVal:any[]=[];
      var totalValueOfClaim : number = 0;
      this.fetchEntries().then((entries:any)=> {aVal = entries
          for (let entrie of aVal){
        if (entrie.to !==undefined){
          totalValueOfClaim = totalValueOfClaim + entrie.distance
        }
else{ totalValueOfClaim = totalValueOfClaim + entrie.price}
          }
        }
      )
      return dateStart;
    }
    */
}
