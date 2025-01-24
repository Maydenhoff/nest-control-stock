import { Category } from 'src/categories/entities/category.entity';
import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column({type: 'varchar', length:255, unique: true })
    name: string;
    
    @Column({type: 'text' })
    description: string

    @Column({type: 'int'})
    price: number;
    
    @Column({type: 'int'})
    stock: number;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updateAt: Date

    @ManyToOne(() => Category, (category => category.products))
    category:Category;

}