/* eslint-disable */

import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn,ManyToOne, OneToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn} from 'typeorm';


@Entity('pdm_tables')
export class PdmTables {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    categoryId: number;

    @Column({ unique: true })
    tableName: string;

}