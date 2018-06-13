import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';



@Entity()
export default class Bootcamp extends BaseEntity {

    
    @PrimaryGeneratedColumn()
    id?: number


    
    @Column('integer', {nullable:false})
    bootcamp: number


    
    @Column('date', {nullable:false})
    startDate: Date


    
    @Column('date', {nullable:false})
    endDate: Date

}