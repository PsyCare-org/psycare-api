import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

const core = [AuthModule];

@Module({
    imports: core,
    exports: core,
})
export class CoreModule {}
