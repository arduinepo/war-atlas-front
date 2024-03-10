import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Region,Continent,Ethnie, War, Critere, CritereEnum, User, CritereTree, Features, Reference } from '../models/models';
import { Observable,BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CriteresReaderService } from './criteres-reader.service';

@Injectable({
  providedIn: 'root'
})
export class SupplyingService {
  urlBase='http://localhost:8000/rickwars/'
  user:User={username:'',password:''};
  isLoggedIn = false;
  redirectUrl: string | null = null;

  emptyRef:Reference={author:'',content:'',pages:'',reference:''};
  emptyFeat:Features={
    conflict:{
        tabs:{},
        ethnie:{
          name:'',latitude:0,longitude:0,
          region:{continent:{name:''},name:''}
        }
      },
      author:{username:''},
      sources:this.emptyRef
  }

  regionsSubject=new BehaviorSubject<Region[]>([]);
  ethniesSubject=new BehaviorSubject<Ethnie[]>([]);
  critereSubject=new BehaviorSubject<Critere>({label:'',name:'',value:CritereEnum.Unknown});
  conflictsSubject=new BehaviorSubject<War[]>([]);
  langsSubject=new BehaviorSubject<string[]>([]);
  conflictSubject=new BehaviorSubject<Features>(this.emptyFeat);
  featuresSubj=new BehaviorSubject<Features[]>([]);

  getWar(id:number):void{
    this.http.get<Features>(this.urlBase+"conflict/"+id).subscribe((war)=>this.conflictSubject.next(war));
  }

  getConflict():Observable<Features>{
    return this.conflictSubject.asObservable();
  }

  getFeaturesObs():Observable<Features[]>{
    return this.featuresSubj.asObservable();
  }

  getFeatures(id:number){
    this.http.get<Features[]>(this.urlBase+'featuresByConflict/'+id).subscribe((fs)=>this.featuresSubj.next(fs));
  }

  constructor(private http:HttpClient,private router: Router,private criteresServ: CriteresReaderService) {
   }

  logout(): void {
    this.isLoggedIn = false;
    this.user.username='';
  }

  login(user:User){
    return this.http.post<any>(this.urlBase + "login/", {
      "username": user.username,"password": user.password
    }).pipe(
      tap((res) => {
        if (res.user){
          this.user=user;
          this.isLoggedIn = true;
          if(this.redirectUrl!=null){
            this.router.navigate([this.redirectUrl]);
            this.redirectUrl = '';
          }
          else this.router.navigate(['/']);
        }
      })
    );
  }

  navigateWar(id:number|undefined){
    this.router.navigateByUrl("/war/"+id);
  }

  goEdit(id:number){
    this.router.navigateByUrl("/war/edit/"+id);
  }

  getRegionsSubject():Observable<Region[]>{
    return this.regionsSubject.asObservable();
  }

  getEthniesSubject():Observable<Ethnie[]>{
    return this.ethniesSubject.asObservable();
  }

  getLangsSubject():Observable<string[]>{
    return this.langsSubject.asObservable();
  }

  getRegions(continent:Continent):void{
    this.http.get<Region[]>(this.urlBase+continent.name+'/regions/').subscribe((regions)=>this.regionsSubject.next(regions))
  }

  getEthnies(region:Region):void{
    this.http.get<Ethnie[]>(this.urlBase+region.name+'/ethnies/').subscribe((ethnies)=>this.ethniesSubject.next(ethnies));
  }

  getAllEthnies():void{
    this.http.get<Ethnie[]>(this.urlBase+'allEthnies/').subscribe((ethnies)=>this.ethniesSubject.next(ethnies));
  }

  getLangs():void{
    this.http.get<string[]>(this.urlBase+'langs/').subscribe((langs)=>this.langsSubject.next(langs));
  }

  setCritere(crit:Critere){
    this.critereSubject.next(crit);
  }

  uploadTribes(f:File){
    const data = new FormData();
    data.append("csv", f);
    this.http.post<void>(this.urlBase+"uploadTribes/", data).subscribe(()=>console.log("badaboum"));
  }

  addWar(ethnie:Ethnie,criteres:{[key:string]:any},tabs:{},sources:Reference):void{
    const war:War={ethnie:ethnie,tabs:tabs};
    const filteredCrits:{[key:string]:any}=this.criteresServ.filters(criteres);
    this.http.post<{res:number}>(this.urlBase+"addConflict/",
    {features:filteredCrits,author:this.user,conflict:war,sources:sources})
      .subscribe((res)=>this.router.navigateByUrl("/war/"+res));
  }

  updateWar(war:any,criteres:{[key:string]:any},tabs:{},sources:Reference):void{
    criteres['author']=this.user;
    criteres['sources']=sources;
    Object.entries(tabs).forEach(([k,v])=>war[k]=v);
    criteres['conflict']=war
    this.http.post<any>(this.urlBase+"updateConflict/",criteres)
      .subscribe((res)=>{this.router.navigateByUrl("/war/"+res['1']);console.log(res)});
  }

  getCritereSubject():Observable<Critere>{
    return this.critereSubject.asObservable();
  }

  getConflictsSubject():Observable<War[]>{
    return this.conflictsSubject.asObservable();
  }

  searchWars(criteres:{}):void{
    this.http.post<War[]>(this.urlBase+'conflicts/',criteres).subscribe((wars)=>this.conflictsSubject.next(wars));
  }

  addTribe(tribe:any):void{
    tribe.user=this.user;
    this.http.post<boolean>(this.urlBase+"addTribe/",tribe).subscribe((res)=>null
    
    );
  }

  getAllWars():void{
    this.http.get<War[]>(this.urlBase+'conflicts/').subscribe((wars)=>this.conflictsSubject.next(wars));
  }

  goVersions(id:number){
    this.router.navigateByUrl('/war/versions/'+id);
  }

}
