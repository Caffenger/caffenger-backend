import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './features/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CafeModule } from './features/cafe/cafe.module';
import { MenuModule } from './features/menu/menu.module';
import { MenuItemModule } from './features/menu-item/menu-item.module';
@Module({
  imports: [
    AuthModule,
    CafeModule,
    MenuModule,
    MenuItemModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
