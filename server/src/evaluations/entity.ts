import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';



@Entity()
export default class Evaluation extends BaseEntity {

  
  @PrimaryGeneratedColumn()
  id?: number

  
  @Column('integer', { nullable:false})
  teacherId: number

  
  @Column('integer', {nullable:false})
  studentId: number

  
  @Column('date', {nullable:false})
  date: Date

  
  @Column('text', {nullable:false})
  evaluation: string

  
  @Column('text', {nullable:true})
  comments: string

}
