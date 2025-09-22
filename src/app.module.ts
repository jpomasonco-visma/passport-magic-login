import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:secret@localhost:27018/nest-magic-poc?authSource=admin',
    ),
    UsersModule,
  ],
})
export class AppModule {}
