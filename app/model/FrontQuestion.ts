import { Model, Table, Column, } from 'sequelize-typescript';
@Table
export default class Front_Question extends Model {
    @Column({primaryKey: true})
    fquestion_id!:number
    @Column
    question_name!:string
    @Column
    question_content!:string
}