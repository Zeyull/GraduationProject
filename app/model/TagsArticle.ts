import { Model, Table, Column, } from 'sequelize-typescript';
@Table
export default class Tags_Article extends Model {
    @Column({primaryKey: true})
    tags_id!:string
    @Column
    article_id!:string
}