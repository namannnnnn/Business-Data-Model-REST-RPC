/* eslint-disable */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Attribute } from "./attribute.entity";

@Entity()
export class TextValidation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenantId: number;

  @Column()
  type: string;

  @Column()
  minCharacters: number;

  @Column()
  maxCharacters: number;

  @Column()
  lowerCaseOnly: boolean;

  @Column()
  upperCaseOnly: boolean;

  @Column()
  allowNumbers: boolean;

  @Column()
  specialCharacters: boolean;

  @Column()
  spacingAllowed: boolean;

  @Column()
  attributeId: number;

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

  @OneToOne(() => Attribute)
  @JoinColumn()
  attribute: Attribute;
}

@Entity()
export class NumericValidation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenantId: number;

  @Column()
  type: string;

  @Column()
  allowDecimal: boolean;

  @Column()
  allowCommas: boolean;

  @Column()
  allowDots: boolean;

  @Column()
  allowSpaces: boolean;

  @Column()
  attributeId: number;

  @Column()
  minValue: number;

  @Column()
  maxValue: number;

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

  @OneToOne(() => Attribute)
  @JoinColumn()
  attribute: Attribute;
}

@Entity()
export class BooleanValidation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenantId: number;

  @Column()
  type: string;

  @Column()
  attributeId: number;

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

  @OneToOne(() => Attribute)
  @JoinColumn()
  attribute: Attribute;
}

@Entity()
export class DateValidation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenantId: number;

  @Column()
  type: string;

  @Column()
  format: string;

  @Column({ type: "date", nullable: true })
  minDate: string;

  @Column({ type: "date", nullable: true })
  maxDate: string;

  @Column()
  attributeId: number;

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

  @OneToOne(() => Attribute)
  @JoinColumn()
  attribute: Attribute;
}

@Entity()
export class TimeValidation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenantId: number;

  @Column()
  type: string;

  @Column()
  format: string;

  @Column({ type: "timestamp" })
  minTime: Date;

  @Column({ type: "timestamp" })
  maxTime: Date;

  @Column()
  attributeId: number;

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

  @OneToOne(() => Attribute)
  @JoinColumn()
  attribute: Attribute;
}

@Entity()
export class RangeValidation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenantId: number;

  @Column()
  type: string;

  @Column()
  inclusiveMin: boolean;

  @Column()
  inclusiveMax: boolean;

  @Column()
  minRange: number;

  @Column()
  maxRange: number;

  @Column()
  attributeId: number;

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

  @OneToOne(() => Attribute)
  @JoinColumn()
  attribute: Attribute;
}

@Entity()
export class SingleSelectionValidation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenantId: number;

  @Column()
  type: string;

  @Column({ nullable: true })
  default: string;

  @Column()
  attributeId: number;

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

  @OneToOne(() => Attribute)
  @JoinColumn()
  attribute: Attribute;
}

@Entity()
export class MultipleSelectionValidation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenantId: number;

  @Column()
  type: string;

  @Column({ nullable: true })
  default: string;

  @Column()
  minEssentialSelection: number;

  @Column({ nullable: true })
  maxSelectionAllowed: number;

  @Column()
  attributeId: number;

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

  @OneToOne(() => Attribute)
  @JoinColumn()
  attribute: Attribute;
}

@Entity()
export class DropdownValidation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenantId: number;

  @Column()
  type: string;

  @Column({ nullable: true })
  default: string;

  @Column()
  limitViewSelections: number;

  @Column()
  attributeId: number;

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

  @OneToOne(() => Attribute)
  @JoinColumn()
  attribute: Attribute;
}

@Entity()
export class UrlValidation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenantId: number;

  @Column()
  type: string;

  @Column()
  emptyProtocol: boolean;

  @Column({ nullable: true })
  protocol: boolean;

  @Column({ nullable: true })
  format: string;

  @Column()
  attributeId: number;

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

  @OneToOne(() => Attribute)
  @JoinColumn()
  attribute: Attribute;
}
