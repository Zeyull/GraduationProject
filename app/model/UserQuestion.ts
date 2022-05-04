import { Model, Table, Column, } from 'sequelize-typescript';
@Table
export default class User_Question extends Model {
    @Column({primaryKey: true})
    uuid!:number
    @Column({primaryKey: true})
    question_id!:number
    @Column
    state!:number
    @Column
    date!:string
    @Column
    time!:string
    @Column
    language!:string
}