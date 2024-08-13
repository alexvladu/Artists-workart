import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
@Injectable()
export class WorkArtService {
    private workArts=[];

    constructor() {
        this.loadWorkArts();
    }

    private loadWorkArts() {
        const data = fs.readFileSync('src/workart/workarts.json', 'utf8');
        this.workArts = JSON.parse(data);
    }
    getData(){
        return this.workArts;
    }
    add(workart){
        this.workArts.push(workart);
    }
    getWorkArtById(id:number){
        for(let i=0; i<this.workArts.length; i++)
            if(this.workArts[i].id==id)
                return this.workArts[i];
        return null;
    }
    updateData(oldWorkArt, newWorkArt){
        for(let i=0; i<this.workArts.length; i++)
            if(this.workArts[i].id==oldWorkArt.id)
                this.workArts[i]=newWorkArt;
    }
    getMaximumId():number{
        let maxi=0;
        for(let i=0; i<this.workArts.length; i++)
            if(maxi<this.workArts[i].id)
                maxi=this.workArts[i].id;
        return maxi;
    }
    deleteWorkAryById(id:number){
        let newWorkArt=[];
        for(let i=0; i<this.workArts.length; i++)
            if(this.workArts[i].id!=id)
                newWorkArt.push(this.workArts[i]);
        this.workArts=newWorkArt;
    }
}
