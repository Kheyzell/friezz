import { AnswerEntity } from "@friezz/server/questionnaire/entities/answer.entity";
import { QuestionEntity } from "@friezz/server/questionnaire/entities/question.entity";
import { QuestionnaireEntity } from "@friezz/server/questionnaire/entities/questionnaire.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";

class TypeOrmConfig {
    static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
        const ssl = configService.get<string>('DATABASE_SSL') === "true";
        
        return {
            type: 'postgres',

            host: configService.get<string>('DATABASE_HOST'),
            port: configService.get<number>('DATABASE_PORT'),
            database: configService.get<string>('DATABASE_DATABASE'),
            username: configService.get<string>('DATABASE_USERNAME'),
            password: configService.get<string>('DATABASE_PASSWORD'),
            ssl,
            logging: configService.get<boolean>('DATABASE_LOGGING'),

            entities: [QuestionnaireEntity, QuestionEntity, AnswerEntity],
        }
    }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService)
}