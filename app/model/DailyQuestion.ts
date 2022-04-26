import { Model, Table, Column, } from 'sequelize-typescript';
@Table
export default class Daily_Question extends Model {
    @Column({primaryKey: true})
    date!:string
    @Column
    question_id!:string
}