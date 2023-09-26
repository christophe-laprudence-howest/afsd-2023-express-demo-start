import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity()
export class Shop {
  @ObjectIdColumn()
  _id: number
  @Column()
  name: string
  @Column()
  city: string
  @Column()
  twentyFourSeven: boolean
}
