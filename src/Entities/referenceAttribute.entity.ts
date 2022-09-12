/* eslint-disable */

import { Entity, Column, PrimaryColumn, OneToMany,ManyToOne, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ReferenceMaster } from './master.entity'


@Entity('referenceAttributes')
export class ReferenceAttributes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tenantId: number;

    @Column()
    attributeName: string;

    @Column()
    displayName: string;

    @Column()
    attributeType: string;

    @Column({nullable: true})
    referenceMasterId: string;

    @Column()
    status: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @ManyToOne(() => ReferenceMaster, referenceMaster => referenceMaster.referenceAttributes)
    referenceMaster: ReferenceMaster;
}