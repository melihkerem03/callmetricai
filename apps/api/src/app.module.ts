import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { MockModule } from './mock.module';

@Module({
  imports: [HealthModule, MockModule],
})
export class AppModule {}