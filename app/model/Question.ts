import { Model, Table, Column, } from 'sequelize-typescript';
@Table
export default class Question extends Model {
    @Column({primaryKey: true})
    question_id!:number
    @Column
    question_index!:number
    @Column
    question_name!:string
    @Column
    level!:number
    @Column
    content!:string
}