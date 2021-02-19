import mongoose, {Mongoose} from 'mongoose'

export const connectToDb = async (dbConnectionString: string): Promise<Mongoose> => {
    return await mongoose.connect(dbConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}