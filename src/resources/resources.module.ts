import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProfessionalModule } from './professional/professional.module';
import { AuthModule } from './auth/auth.module';

const resources = [AuthModule, UserModule, ProfessionalModule];

@Module({
    imports: resources,
    exports: resources,
})
export class ResourcesModule {}
