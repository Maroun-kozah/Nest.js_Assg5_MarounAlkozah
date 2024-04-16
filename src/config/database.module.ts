import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module'; // Import the ConfigModule

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Import the ConfigModule here
      useFactory: async () => ({
        uri: process.env.MONGODB_URI,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }),
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
