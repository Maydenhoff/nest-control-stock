import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { ProductModule } from './products/product.module';
import { CategoryModule } from './categories/category.module';
import { DatabaseModule } from './database/database.module';
import config from './config';
import { enviroments } from './enviroments';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: enviroments[process.env.NODE_ENV] || '.env',
    load: [config],
    isGlobal: true,
    validationSchema: Joi.object({
    API_KEY: Joi.number().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    })
  }), HttpModule,UserModule, ProductModule, CategoryModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await http
          .get('https://jsonplaceholder.typicode.com/todos')
          .toPromise();
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
  
})
export class AppModule {}
