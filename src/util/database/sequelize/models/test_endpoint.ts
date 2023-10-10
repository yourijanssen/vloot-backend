import {
    Table,
    Column,
    Model,
    PrimaryKey,
    DataType,
} from 'sequelize-typescript';

/**
 * @author Thijs van Rixoort
 * Represents the Test table in the database.
 */
@Table({
    tableName: 'Test', // Specify the table name
    timestamps: false, // Disable timestamps (createdAt and updatedAt)
    
})
export class Test extends Model {
    @PrimaryKey
    @Column(DataType.STRING)
    message!: string;
}
