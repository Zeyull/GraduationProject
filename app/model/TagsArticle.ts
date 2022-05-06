import { Model, Table, Column, } from 'sequelize-typescript';
@Table
export default class Tags_Article extends Model {
    @Column({primaryKey: true})
    tags_id!:number
    @Column({primaryKey: true})
    article_id!:number
}