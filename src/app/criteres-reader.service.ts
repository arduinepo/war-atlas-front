import { Injectable } from '@angular/core';
import {myths,gods,godsAttr,animalsLists,equips,motives,rituals,returnRituals,fightType} from '../assets/criteres.json';
import { Critere, CritereEnum,CritereTree, Features, Motive } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CriteresReaderService {
  private myths:{[key:string]:any}=myths;
  private gods:{[key:string]:any}=gods;
  private godsAttr:{[key:string]:any}=godsAttr;
  private animals:{[key:string]:any}=animalsLists;
  private equips:{[key:string]:any}=equips;
  private motives:{[key:string]:any}=motives;
  private rituals:{[key:string]:any}=rituals;
  private returnRituals:{[key:string]:any}=returnRituals;
  private fightType:{[key:string]:any}=fightType;

  criteres:CritereTree={myths:[],gods:[],godsAttr:[],animals:[],equips:[],motives:[],rituals:[],returnRituals:[],fightType:[]}

  constructor() {
    this.criteres.myths=this.jsonToCritereList(this.myths);
    this.criteres.gods=this.jsonToCritereList(this.gods);
    this.criteres.godsAttr=this.jsonToCritereList(this.godsAttr);
    this.criteres.equips=this.jsonToCritereList(this.equips);
    this.criteres.animals=this.jsonToCritereList(this.animals);
    this.criteres.motives=this.jsonToCritereList(this.motives);
    this.criteres.rituals=this.jsonToCritereList(this.rituals);
    this.criteres.returnRituals=this.jsonToCritereList(this.returnRituals);
    this.criteres.fightType=this.jsonToCritereList(this.fightType);
   }

  sources(features:{[key:string]:string}){
    return features['sources'];
  }

  getCriteres():CritereTree{
    return this.criteres;
  }

  getFeaturesWithValue(data:Features):CritereTree{
    let myths=this.getFeaturesFromBranch(data,this.criteres.myths);
    let gods=this.getFeaturesFromBranch(data,this.criteres.gods);
    let godsAttr=this.getFeaturesFromBranch(data,this.criteres.godsAttr);
    let equips=this.getFeaturesFromBranch(data,this.criteres.equips);
    let animals=this.getFeaturesFromBranch(data,this.criteres.animals);
    let motives=this.getFeaturesFromBranch(data,this.criteres.motives);
    let rituals=this.getFeaturesFromBranch(data,this.criteres.rituals);
    let returnRituals=this.getFeaturesFromBranch(data,this.criteres.returnRituals);
    let fightType=this.getFeaturesFromBranch(data,this.criteres.fightType);
    return {myths:myths,gods:gods,godsAttr:godsAttr,animals:animals,equips:equips,motives:motives,rituals:rituals,returnRituals:returnRituals,fightType:fightType};
  }

  getFeaturesFromBranch(data:Features,branch:Critere[]):Critere[]{
    let l:Critere[]=[];
    for (let c of branch){
      if(!c.sub){
        l.push({name:c.name,label:c.label,value:data[c.name as keyof typeof data]})
      }
      else{
        if(c.causes){
          l.push({name:c.name,label:c.label,value:data[c.name as keyof typeof data],sub:this.getFeaturesFromBranch(data,c.sub),causes:this.getFeaturesFromBranch(data,c.causes)})
        }
        else l.push({name:c.name,label:c.label,value:data[c.name as keyof typeof data],sub:this.getFeaturesFromBranch(data,c.sub)})
      }
    }
    return l;
  }

  jsonToCritereList(dict:{[key:string]:any}):Critere[]{
    let l:Critere[]=[];
    for (let [k,v] of Object.entries(dict)){
      if (typeof v === 'string')
        l.push({name:k,label:v,value:CritereEnum.Unknown});
      else{
        const sub:{[key:string]:any}=v['sub'];
        if (v['cause']){
          l.push({name:k,label:v['label'],value:CritereEnum.Unknown,sub:this.jsonToCritereList(sub),causes:this.jsonToCritereList(v['cause'])});
        }
        else l.push({name:k,label:v['label'],value:CritereEnum.Unknown,sub:this.jsonToCritereList(sub)});
      }
    }
    return l;
  }

  criteresDict(criteres:CritereTree):{[key:string]:any}{
    let dict:{[key:string]:any}={};
    criteres.myths.forEach((k)=>dict[k.name]=k.value);
    criteres.gods.forEach((k)=>dict[k.name]=k.value);
    criteres.godsAttr.forEach((k)=>dict[k.name]=k.value);
    criteres.equips.forEach((k)=>dict[k.name]=k.value);
    criteres.animals.forEach((k)=>dict[k.name]=k.value);
    criteres.motives.forEach((k)=>dict[k.name]=k.value);
    criteres.rituals.forEach((k)=>dict[k.name]=k.value);
    criteres.returnRituals.forEach((k)=>dict[k.name]=k.value);
    criteres.fightType.forEach((k)=>dict[k.name]=k.value);
    return dict;
  }

  filters(criteres:{}):{}{
    return Object.fromEntries(Object.entries(criteres).filter(([k,v])=>v!=CritereEnum.Unknown));
  }

}
