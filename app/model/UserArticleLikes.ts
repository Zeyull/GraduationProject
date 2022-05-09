import { Model, Table, Column, } from 'sequelize-typescript';
@Table
export default class UserArticle_Likes extends Model {
    @Column({primaryKey: true})
    uuid!:number
    @Column({primaryKey: true})
    article_id!:number
}