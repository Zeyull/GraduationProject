import { Model, Table, Column, } from 'sequelize-typescript';
@Table
export default class Tags extends Model {
    @Column({primaryKey: true,autoIncrement: true,})
    tags_id!:number
    @Column
    tags_name!:string
}