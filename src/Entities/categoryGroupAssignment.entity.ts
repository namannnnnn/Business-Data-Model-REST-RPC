/* eslint-disable */

import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./category.entity";
import { AttributeGroup } from "./attribute.entity";

@Entity("categoryGroupAssignment")
export class CategoryGroupAssignment {
  @PrimaryColumn()
  categoryId: number;

  @PrimaryColumn()
  attributeGroupId: number;

  @ManyToOne(
    () => AttributeGroup,
    (attributeGroup) => attributeGroup.categoryGroupAssignments
  )
  attributeGroup: AttributeGroup;

  @ManyToOne(() => Category, (category) => category.categoryGroupAssignments)
  category: Category;
}
