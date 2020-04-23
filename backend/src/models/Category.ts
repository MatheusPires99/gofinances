import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import Transaction from "./Transaction";

@Entity("categories")
class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Transaction, transaction => transaction.category)
  transaction: Transaction;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Category;
