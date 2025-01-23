import { Global, Module } from "@nestjs/common";
import { ConfigService, ConfigType } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client} from 'pg';

import config from "src/config";

@Global()
@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) => {
                const { user, dbName, host, password, port} = configService.postgres;
                return {
                    type: 'postgres',
                    host,
                    port,
                    username: user,
                    password,
                    database: dbName,
                }
                
            }})
        ],
        providers: [
            {
                provide: 'PG',
                useFactory: (configService: ConfigType<typeof config>) => {
                    const { user, dbName, host, password, port} = configService.postgres;
                    const client = new Client({
                        user,
                        host,
                        database: dbName,
                        password,
                        port,
                    });

                    client.connect()
            },
            inject: [config.KEY]
        }
    ],
    exports: ['PG', TypeOrmModule],
})

export class DatabaseModule {}