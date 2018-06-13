import { JsonController, Authorized, Get, Body, Post, Param, HttpCode } from 'routing-controllers';
import Student from '../students/entity';
import Bootcamp from './entity';



@JsonController()
export default class BootcampController {


    @Authorized()
    @Get('/bootcamps')
    @HttpCode(201)
    getBootcamps() {
        return Bootcamp.find()
    }


    @Authorized()
    @Get('/bootcamps/:id([0-9]+)')
    @HttpCode(201)
    getBootcamp(
        @Param('id') id: number
    ) {
        return Bootcamp.findOneById(id)
    }


    @Authorized()
    @Post('/bootcamp')
    @HttpCode(201)
    async createBootcamp(
        @Body() { bootcamp, startDate, endDate }: Bootcamp
    ) {
        const entity = new Bootcamp
        entity.bootcamp = bootcamp
        entity.startDate = startDate
        entity.endDate = endDate
        await entity.save()

        const createdbootcamp = await Bootcamp.findOneById(entity.id)

        return createdbootcamp
    
    }

}

//////////////////  ALGORITHM BELOW  //////////////////////