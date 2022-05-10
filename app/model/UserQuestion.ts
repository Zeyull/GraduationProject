import { Model, Table, Column, } from 'sequelize-typescript';
@Table
export default class User_Question extends Model {
    @Column
    uuid!:number
    @Column
    question_id!:number
    @Column
    state!:number
    @Column({primaryKey: true})
    date!:string
    @Column
    time!:string
    @Column
    language!:string
    @Column({primaryKey: true})
    submission_id!:string
}