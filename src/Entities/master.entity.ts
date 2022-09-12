/* eslint-disable */

import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ReferenceAttributes } from "./referenceAttribute.entity";
import { Attribute } from "./attribute.entity";

@Entity("masters")
export class Master {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenantId: number;

  @Column()
  masterEntityName: string;

  @Column()
  masterEntityType: string;

  @Column()
  masterEntityDescription: string;

  @Column("int")
  masterEntityLevels: number;

  @Column()
  hierarchyDescription: string;

  @Column()
  status: boolean;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updatedAt: Date;

  @OneToMany(() => Attribute, (attribute) => attribute.master)
  attributes: Attribute[];
}

@Entity("referenceMasters")
export class ReferenceMaster {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  masterEntityName: string;

  @Column()
  masterEntityType: string;

  @Column()
  masterEntityDescription: string;

  @Column()
  masterColumnName: string;

  @Column()
  status: boolean;

  @Column()
  tenantId: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updatedAt: Date;

  @OneToMany(() => Attribute, (attribute) => attribute.referenceMaster)
  attributes: Attribute[];

  @OneToMany(
    () => ReferenceAttributes,
    (referenceAttributes) => referenceAttributes.referenceMaster
  )
  referenceAttributes: ReferenceAttributes[];
}
