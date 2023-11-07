import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ScheduleModule } from '@nestjs/schedule'
import { APP_INTERCEPTOR } from '@nestjs/core'

import { LoggerModule } from 'modules/logger/logger.module'
import { AppController } from './app.controller'
import { LoggerService } from 'modules/logger/logger.service'
import { ErrorsInterceptor } from 'common/interceptors/errors.interceptor'
import { PaymentModule } from './modules/payment/payment.module'
import { CustomerModule } from './modules/customer/customer.module'

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_HOST),
    ScheduleModule.forRoot(),
    LoggerModule.forRoot(),
    PaymentModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [
    LoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule {}
