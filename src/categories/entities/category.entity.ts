import { Product } from 'src/products/entities/product.entity';
import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length:255 })
    name: string;
    
    // @CreateDateColumn({
    //     type: 'timestamptz',
    //     default: () => 'CURRENT_TIMESTAMP',
    // })
    // createAt: Date;

    // @UpdateDateColumn({
    //     type: 'timestamptz',
    //     default: () => 'CURRENT_TIMESTAMP',
    // })
    // updateAt: Date

    @OneToMany(() => Product, (product) => product.category)
    products: Product[]
}