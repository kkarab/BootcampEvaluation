import { JsonController, Get, Post, Put, Delete, Param, Body, Authorized, HttpCode, BadRequestError } from 'routing-controllers';
import Student from './entity';

@JsonController()
export default class StudentController {

    
    @Authorized()
    @Post('/students')
    @HttpCode(201)
    async createStudent(
        @Body() {fullName, photo, evaluation}: Student
    ) {
        if (fullName==='') throw new BadRequestError('Full name required...')
        if (photo==='') photo = 'https://www.yhail.net/images/default-user-icon-profile.png'
        
        const entity = new Student
        entity.fullName = fullName
        entity.photo = photo
        entity.evaluation = evaluation

        const student = await entity.save()

        return student

    }

    
    @Authorized()
    @Get('/students/:id([0-9]+)')
    @HttpCode(201)
    async getStudents(@Param('id') id: number) {
        return await Student.find({bootcamp: id})
    }

    
    @Authorized()
    @Get('/students')
    @HttpCode(201)
    async getStudentList() {
        return await Student.find()
    }
    
    
    @Authorized()
    @Put('/students/:id')
    @HttpCode(201)
    async updateStudent(@Param('id') id: number,
        @Body() { fullName, photo, bootcamp }: Student
    ) {
        const person = await Student.findOneById(id)
        if (person) {
            person.fullName = (fullName)?fullName:person.fullName
            person.photo = (photo)?photo:person.photo
            person.bootcamp = bootcamp
            return await person.save()
        } else {
            throw new BadRequestError ('Student ID not found...')
        }
    }
    
    
    @Authorized()
    @Delete('/students/:id[0-9]+)')
    @HttpCode(201)
    async deleteStudent(
        @Param('id') id: number
    ) {
        const student = await Student.findOneById(id)
        if (student)
            return await student.remove()
    }

    
    @Authorized()
    @Get('/getbootcamp/:id([0-9]+)')
    @HttpCode(201)
    async getBootcamp(@Param('id') id: number) {
        const student = await Student.findOneById(id)
        if (!student) throw new BadRequestError('Students not found...')
        return {student}
    }



}   

