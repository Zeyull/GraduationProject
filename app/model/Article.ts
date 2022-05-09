import { Model, Table, Column, } from 'sequelize-typescript';
@Table
export default class Article extends Model {
    @Column({primaryKey: true,autoIncrement: true,})
    article_id!:number
    @Column
    article_title!:string
    @Column
    article_content!:string
    @Column
    time!:string
    @Column
    author_id!:number
    @Column
    like!:number
    @Column
    img!:string
    @Column
    question_id!:string
    @Column
    author_img!:string
}