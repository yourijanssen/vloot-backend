import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    DataType,
} from 'sequelize-typescript';
import { Roles } from '../../../../business/model/user';

/**
 * @author Youri Janssen
 * Represents the User model in the database.
 */
@Table({
    tableName: 'User', // Specify the table name
    timestamps: false, // Enable timestamps (createdAt and updatedAt)
})
export class UserModel extends Model<UserModel> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.STRING)
    email!: string;

    @Column(DataType.STRING)
    password!: string;

    @Column(DataType.ENUM('user', 'admin'))
    type!: Roles;

    @Column(DataType.TINYINT)
    active!: number;
}
