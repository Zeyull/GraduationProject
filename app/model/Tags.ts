import { Model, Table, Column, } from 'sequelize-typescript';
@Table
export default class Tags extends Model {
    @Column({primaryKey: true})
    tags_id!:string
    @Column
    tags_name!:string
}