import 'reflect-metadata';
import { Action, BadRequestError, useKoaServer } from 'routing-controllers';
import setupDb from './db';
import TeacherController from './teachers/controller';
import LoginController from './logins/controller';
import EvaluationController from './evaluations/controller';
import { verify } from './jwt';
import Teacher from './teachers/entity';
import * as Koa from 'koa';
import { Server } from 'http';
import StudentController from './students/controller';
import BootcampController from './bootcamps/controller';



const app = new Koa()
const server = new Server(app.callback())
const port = process.env.PORT || 4000

useKoaServer(app, {
  cors: true,
  controllers: [
    TeacherController,
    LoginController,
    EvaluationController,
    StudentController,
    BootcampController

  ],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')

      try {
        return !!(token && verify(token))
      }
      catch (e) {
        throw new BadRequestError(e)
      }
    }

    return false
  },
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')
      
      if (token) {
        const {id} = verify(token)
        return Teacher.findOneById(id)
      }
    }
    return undefined
  }
})



setupDb()
  .then(_ => {
    server.listen(port)
    console.log(`Listening on port ${port}`)
  })
  .catch(err => console.error(err))
