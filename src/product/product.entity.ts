import { Attachment } from 'src/attachment/attachment.entity';
import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from 'typeorm';

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 400, charset: 'utf8' })
    alias: string;

    @Index('name', { fulltext: true })
    @Column({ type: 'varchar', length: 400, charset: 'utf8' })
    name: string;

    @Index('fk_product_brand_idx')
    @Column({ type: 'int', default: 1 })
    brand_id: number;

    @Index('fk_product_category_idx')
    @Column({ type: 'int', nullable: true })
    category_id: number;

    @Column({ type: 'int', default: 0 })
    price: number;

    @Column({ type: 'varchar', length: 50, charset: 'utf8', nullable: true })
    barcode: string;

    @Column({ type: 'varchar', length: 4000, nullable: true })
    description: string;

    @Column({ type: 'float', nullable: true })
    weight: number;

    @Column({ type: 'float', nullable: true })
    length: number;

    @Column({ type: 'float', nullable: true })
    width: number;

    @Column({ type: 'float', nullable: true })
    height: number;


    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'varchar', length: 255, nullable: true, charset: 'utf8mb4' })
    created_by_uuid?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    created_by_name?: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at?: Date;

    @Column({ type: 'varchar', length: 255, nullable: true, charset: 'utf8mb4' })
    updated_by_uuid?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    updated_by_name?: string;

    @Column({ type: 'date', nullable: true })
    deleted_at?: Date | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    deleted_by_uuid?: string | null;

    @Column({ type: 'varchar', length: 50, nullable: true })
    deleted_by_name?: string | null;

    @OneToMany(() => Attachment, (attachment) => attachment.product)
    attachment: Attachment[];
}
