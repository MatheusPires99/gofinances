import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import Category from "./Category";

@Entity("transactions")
class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  type: "income" | "outcome";

  @Column("decimal")
  value: number;

  @Column("varchar")
  category_id: string;

  @ManyToOne(() => Category, category => category.transaction, { eager: true })
  @JoinColumn({ name: "category_id" })
  category: Category;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
