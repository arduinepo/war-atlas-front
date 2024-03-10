export interface Reference{
    author:string;
    reference:string;
    pages:string;
    content:string;
}

export interface Features{
    author:User;
    created_at?:any;
    sources:Reference;
    conflict:War;
}

export interface War{
    name?:string;
    ethnie:Ethnie;
    tabs:{};
    id?:number;
}

export interface Region{
    continent:Continent;
    name:string;
}

export interface Continent{
    name:string;
}

export interface Ethnie{
    name:string;
    region:Region;
    latitude:number;
    longitude:number;
    lang?:string;
}

export interface Critere{
    label:string;
    name:string;
    value:CritereEnum;
    sub?:Critere[];
    causes?:Critere[];
}

export interface Motive extends Critere{
    
}

export enum CritereEnum {
    Unknown="UN",
    KnownAbsence="AB",
    Presence="PR"
}

export interface User{
    username:string;
    email?:string;
    password?:string;
}

export interface AnimalList extends Critere{
    list:Critere[];
  }

export interface CritereTree{
    myths:Critere[];
    gods:Critere[];
    godsAttr:Critere[];
    animals:Critere[];
    equips:Critere[];
    motives:Motive[];
    rituals:Critere[];
    returnRituals:Critere[];
    fightType:Critere[];

  }

