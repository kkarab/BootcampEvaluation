import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { MinLength, IsString } from 'class-validator';



@Entity()
export default class Student extends BaseEntity {

  
  @PrimaryGeneratedColumn()
  id?: number

  
  @IsString()
  @MinLength(8)
  @Column('text',{nullable:false})
  fullName: string

  
  @Column('text',{nullable:false})
  photo: string

  
  @Column('integer')
  bootcamp: number

  //optional column to test if needed
  @Column('text',{default:'No evaluations submitted'})
  evaluation: string


}