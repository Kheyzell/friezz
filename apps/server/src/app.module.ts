import { typeOrmConfigAsync } from '@friezz/server/config/type-orm.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
      exclude: ['/api/(.*)'],
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    /* TypeOrmModule.forRoot({
      type: 'postgres',

      // host: 'dpg-cm5khsi1hbls73ak9rog-a',
      // port: 5432,
      // database: 'friezz',
      // username: 'friezz_user',
      // password: 'Sb8Cn9T82TStZiA3TnuKRguZWMoM61BJ',

      host: 'localhost',
      port: 5432,
      database: 'friezz',
      username: 'postgres',
      password: 'yES3i9sD#yM3Q@xP',

      entities: [QuestionnaireEntity, QuestionEntity, AnswerEntity],
      logging: true,
    }), */
    QuestionnaireModule,
  ],
})
export class AppModule { }