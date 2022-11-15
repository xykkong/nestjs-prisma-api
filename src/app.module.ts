import { Module } from '@nestjs/common';
import { AuthModule, HealthCheckModule, NoteModule } from './modules';
import { ProvidersModule } from './providers';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './config/env.schema';

@Module({
  imports: [
    HealthCheckModule,
    ProvidersModule,
    AuthModule,
    NoteModule,
    ConfigModule.forRoot({
      validationSchema: envValidationSchema,
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
