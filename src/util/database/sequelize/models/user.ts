import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    DataType,
} from 'sequelize-typescript';

/**
 * @author Youri Janssen
 * Represents the User model in the database.
 */
@Table({
    tableName: 'user', // Specify the table name
    timestamps: true, // Enable timestamps (createdAt and updatedAt)
})
export class UserModel extends Model<UserModel> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.STRING)
    userMail!: string;

    @Column(DataType.STRING)
    userPassword!: string;
}
