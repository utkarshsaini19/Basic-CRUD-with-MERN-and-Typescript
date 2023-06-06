import { Schema,model,Document } from "mongoose";

export interface IExample extends Document {
    name : string,
    id: string
}

const ExampleSchema: Schema = new Schema({
    name:String,
    id:String
})

export default model<IExample>('Example',ExampleSchema)