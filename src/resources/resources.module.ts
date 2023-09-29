import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProfessionalModule } from './professional/professional.module';

const resources = [UserModule, ProfessionalModule];

@Module({
    imports: resources,
    exports: resources,
})
export class ResourcesModule {}
