import { JsonController, Post, Body } from 'routing-controllers'
import Teacher from './entity';
import { sign } from '../jwt';

@JsonController()
export default class TeacherController {

  
  @Post('/teachers')
  async signup(
    @Body() data: Teacher
  ) {
    const {password, ...rest} = data
    const entity = Teacher.create(rest)
    await entity.setPassword(password)

    const teacher = await entity.save()
    const jwt = sign({ id: teacher.id! })

    return { jwt }
    return teacher

  }

}
