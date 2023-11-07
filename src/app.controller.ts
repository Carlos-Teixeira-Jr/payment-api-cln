import { Controller, Get } from '@nestjs/common'
import { HealthCheckResponse } from 'common/responses/healthCheck.response'
import { LoggerService } from 'modules/logger/logger.service'
import { InjectorLoggerService } from 'modules/logger/InjectorLoggerService'
import { ApiOperation } from '@nestjs/swagger'

@Controller()
export class AppController {
  constructor(
    @InjectorLoggerService(AppController.name)
    private readonly logger: LoggerService,
  ) {}

  @ApiOperation({ summary: 'Health check da aplicação' })
  @Get()
  healthCheck(): HealthCheckResponse {
    this.logger.log({}, 'healthCheck')
    return {
      message: 'OK',
      uptime: process.uptime(),
      timestamp: new Date(),
    }
  }
}
