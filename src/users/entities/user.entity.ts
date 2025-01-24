import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length:255, unique: true })
    userName: string;
    
    @Column({type: 'varchar', unique:true })
    email: string

    @Column({type: 'varchar'})
    password: string;
    
    @Column({type: 'varchar'})
    role: string;

}