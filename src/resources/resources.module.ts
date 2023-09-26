import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

const resources = [UserModule];

@Module({
    imports: resources,
    exports: resources,
})
export class ResourcesModule {}
