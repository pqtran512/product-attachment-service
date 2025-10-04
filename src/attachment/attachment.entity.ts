import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Product } from 'src/product/product.entity';

@Entity('attachment')
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  filename: string;

  @Column({ length: 500 })
  path: string;

  @Column({ length: 50 })
  extension: string;

  @Column()
  size: number;

  @Column({ length: 100 })
  mime_type: string;

  @CreateDateColumn()
  uploaded_at: Date;

  @ManyToOne(() => Product, (product) => product.attachment, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product?: Product | null;
}
