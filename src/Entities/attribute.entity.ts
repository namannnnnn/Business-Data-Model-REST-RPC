/* eslint-disable */

import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn ,ManyToOne, OneToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn} from 'typeorm'
import { Master, ReferenceMaster } from './master.entity';
import { CategoryGroupAssignment } from './categoryGroupAssignment.entity'
import { CategoryAssignment } from './categoryAssignment.entity'


@Entity('attributeGroups')
export class AttributeGroup {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tenantId: number

    @Column()
    attributeGroupName: string

    @Column()
    status: boolean

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @OneToMany(() => Attribute, attribute => attribute.attributeGroup)
    attributes : Attribute[];

    @OneToMany(() => CategoryGroupAssignment, categoryGroupAssignment => categoryGroupAssignment.attributeGroup)
    categoryGroupAssignments : CategoryGroupAssignment[];

    // @OneToMany(() => ProductGroupAssignment, productGroupAssignment => productGroupAssignment.attributeGroup)
    // productGroupAssignments : ProductGroupAssignment[];


}

@Entity('attributes')
export class Attribute {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tenantId: number;

    @Column()
    attributeName: string;

    @Column()
    labelDescription: string;

    @Column()
    labelName: string;

    @Column()
    attributeType: string;

    @Column()
    constraint: boolean;

    @Column({nullable: true})
    masterId: number;

    // @Column({nullable: true})
    // rulesId: string;

    @Column({nullable: true})
    attributeGroupId: number;

    @Column({nullable: true})
    referenceMasterId: number;

    @Column()
    status: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    // @OneToMany(() => Rule, rule => rule.attribute)
    // rules : Rule[];

    @OneToMany(() => CategoryAssignment, categoryAssignment => categoryAssignment.attribute)
    categoryAssignments : CategoryAssignment[];

    // @OneToMany(() => ProductAssignment, productAssignment => productAssignment.attribute)
    // productAssignments : ProductAssignment[];

    @ManyToOne(() => Master, master => master.attributes)
    master: Master;

    @ManyToOne(() => ReferenceMaster, referenceMaster => referenceMaster.attributes)
    referenceMaster: ReferenceMaster;

    @ManyToOne(() => AttributeGroup, attributeGroup => attributeGroup.attributes)
    attributeGroup: AttributeGroup;
}

