import { ObjectType, Field, Int } from 'typegql';

@ObjectType()
export class Todo {

  @Field({type: Int})
  id: number;

  @Field({type: String})
  text: String;

  @Field({type: Boolean})
  completed: Boolean;

  @Field({type: String})
  completedAt: String;

}
