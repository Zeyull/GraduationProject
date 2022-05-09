import { Model, Table, Column, } from 'sequelize-typescript';
@Table
export default class Comment extends Model {
    @Column({primaryKey: true, autoIncrement: true})
    comment_id!:number
    @Column
    time!:string
    @Column
    uuid!:number
    @Column
    content!:string
    @Column
    user_name!:string
    @Column
    article_id!:number
    @Column
    reply_id!:number
    @Column
    reply_name!:string
    @Column
    head_img!:string
}