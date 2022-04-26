import { Model, Table, Column, } from 'sequelize-typescript';
@Table
export default class Comment extends Model {
    @Column({primaryKey: true})
    comment_id!:string
    @Column
    time!:string
    @Column
    uuid!:string
    @Column
    content!:string
    @Column
    user_name!:string
    @Column
    article_id!:string
    @Column
    reply_id!:string
    @Column
    reply_name!:string
}