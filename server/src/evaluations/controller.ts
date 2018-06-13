import { JsonController, Authorized, Post, Get, Body, Param, HttpCode } from 'routing-controllers';
import Student from '../students/entity';
import Evaluation from './entity';




@JsonController()
export default class EvaluationController {

    @Authorized()
    @Post('/students/:id([0-9]+)/evaluations')
    @HttpCode(201)
    async newEvaluation(
      @Body() body: Evaluation,
      @Param('id') id: number
    )
      {
        const student = await Student.findOneById(id)
        const teacher = body.teacherId
        const newDate = new Date()
        const evaluation = body.evaluation
        const comments = body.comments
        if (student) {
            const color = await Evaluation.create({
              teacherId: teacher,
              studentId: student.id,
              date: newDate,
              evaluation,
              comments
            }).save()

          student.evaluation = evaluation
          await student.save()
          
          return Evaluation.findOne({where: {id: color.id}}) 
        }
      } 

    @Authorized()
    @Get('/students/:id([0-9]+)/evaluation')
    @HttpCode(201)
    async getEvaluation(
      @Param('id') id: number
    ) {
      const grade = await Evaluation.findOneById({student: id})
      if (evaluation) {
        const lastgrade = Evaluation.sort((a,b) => 
        Number(new Date(b.date))-number(new Date(a.date))))[0]
        return lastgrade
      }

      else { return "No evaluations submitted..."}
    }

}