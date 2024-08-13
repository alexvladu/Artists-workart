import { Controller, Get, Param, ParseIntPipe, Patch, Body, ValidationPipe, UsePipes, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors, Delete} from '@nestjs/common';
import { WorkArtService } from 'src/workart/service/workart/workart.service';
import { cloneDeep } from 'lodash';
import { UserService } from 'src/user/serivce/user/user.service';
import { AuthService } from 'src/auth/service/auth/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { WorkArtDTO } from 'src/WorkArt/workart.dto';
@Controller('workart')
export class WorkArtController {

    constructor(private workArtService:WorkArtService,
                private userService:UserService,
                private authSerivce:AuthService
    ){}
    @Get('visible')
    getVisibleCard(){
        const workArts=this.workArtService.getData();
        let return_workArt=[];
        for(let i=0; i<workArts.length; i++)
            if(workArts[i].status=="visible")
                return_workArt.push(workArts[i]);
        return return_workArt;
    }
    @Post('byuser/all/:username')
    getAllWorkArtsByUser(@Body('token') token:string, @Param('username') username:string){
        this.authSerivce.validateToken(token);
        const workArts=this.workArtService.getData();
        const user=this.userService.getUserByUserName(username);
        if(!user)
            return null;
        let dict={};
        let return_workArt=[];
        for(let i=0; i<user.posts.length; i++)
            dict[user.posts[i]]=1;
        for(let i=0; i<workArts.length; i++)
            if(dict[workArts[i].id]==1)
                return_workArt.push(workArts[i]);
        return return_workArt;
    }
    @Get('byuser/visible/:username')
    getVisibleWorkArtsByUser(@Param('username') username:string){
        const workArts=this.workArtService.getData();
        const user=this.userService.getUserByUserName(username);
        if(!user)
            return null;
        let dict={};
        let return_workArt=[];
        //salvez in dictionar pe postarile(pozitia) care apar la userul dat
        for(let i=0; i<user.posts.length; i++)
            dict[user.posts[i]]=1;
        for(let i=0; i<workArts.length; i++)
            if(workArts[i].status=="visible" && dict[workArts[i].id]==1)
                return_workArt.push(workArts[i]);
        return return_workArt;
    }
    @Patch('updatestatus/:id')
    @UsePipes(new ValidationPipe())
    updateCard(@Param('id', ParseIntPipe) id:number, @Body('status') status: string){
        if(status!="hidden" && status!="visible")
            throw new HttpException("Status invalid", HttpStatus.PRECONDITION_FAILED);
        let oldWork=this.workArtService.getWorkArtById(id);
        if(oldWork==null)
            throw new HttpException("ArtWork don't exist!", HttpStatus.NOT_FOUND);
        if(oldWork.status==status)
            throw new HttpException("Status invalid", HttpStatus.PRECONDITION_FAILED);
        let newWork=cloneDeep(oldWork);
        newWork.status=status;
        this.workArtService.updateData(oldWork, newWork);
        return newWork;
    }

    @Post('add')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads', 
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
      }),
    )
    addCard(@Body() workArt:WorkArtDTO, @UploadedFile() file: Express.Multer.File) {
        let card={id:0, owner:'', title:'', desc:'', img:'', status:'visible'}
        card.id=+this.workArtService.getMaximumId()+1;
        card.owner=workArt.owner;
        card.title=workArt.title;
        card.desc=workArt.description;
        card.img=file.filename;

        const user=this.userService.getUserByUserName(card.owner);
        if(!user)
            return null;
        user.posts.push(card.id);
        this.workArtService.add(card);
      return {
        message: 'Fișierul a fost încărcat cu succes!',
        filename: file.filename,
      };
    }
    @Delete('delete/:id')
    deleteCard(@Param('id', ParseIntPipe) id:number){
        const workArt=this.workArtService.getWorkArtById(id);
        if(workArt==null)
            return;
        this.workArtService.deleteWorkAryById(workArt.id);
    }
}
