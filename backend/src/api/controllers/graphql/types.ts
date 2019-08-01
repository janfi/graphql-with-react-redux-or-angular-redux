import { InputObjectType, InputField, Int } from 'typegql';

@InputObjectType()
export class TodoRequest {

  @InputField({type: Int})
  id: number;

  @InputField({type: String})
  text: String;

  @InputField({type: Boolean})
  completed: Boolean;

}