import { Entity, PrimaryColumn, Column, }  from 'typeorm';

@Entity()
export class User {
  
  @PrimaryColumn()
  type_id: string;

  @PrimaryColumn()
  id: string;
  
  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  city: string;
  
}
