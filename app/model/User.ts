import { Model, Table, Column, } from 'sequelize-typescript';
@Table
export default class User extends Model {
    @Column({primaryKey: true})
    uuid!:number
    @Column
    user_name!:string
    @Column
    password!:string
    @Column
    age!:number
    @Column
    email!:string
    @Column
    sex!:number
    @Column
    city!:string
    @Column
    introduction!:string
    @Column
    head_img!:string
}