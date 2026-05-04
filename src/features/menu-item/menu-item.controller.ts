import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { MutateMenuAndItemRelationDto, MutateMenuItemDto } from './dtos/dto';

@Controller('cafe/:cafeId')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @HttpCode(HttpStatus.OK)
  @Get('menu-item')
  async getCafeMenuItems(@Param('cafeId') cafeId: string) {
    const menuItems = await this.menuItemService.getManyByCafeId(cafeId);

    if (!menuItems) throw new NotFoundException();

    return menuItems;
  }

  @HttpCode(HttpStatus.OK)
  @Get('menu/:menuId/menu-item')
  async getMenuItems(@Param('menuId') menuId: string) {
    const menuItemsOfMenu = await this.menuItemService.getManyByMenuId(menuId);

    if (!menuItemsOfMenu) throw new NotFoundException();

    return menuItemsOfMenu;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('menu/:menuId/menu-item/mutate')
  async mutate(@Body() mutateMenuItemDto: MutateMenuItemDto, @Param('cafeId') cafeId: string) {
    const newMenuItem =
      await this.menuItemService.mutateOneMenuItem(mutateMenuItemDto, cafeId);

    if (!newMenuItem) throw new InternalServerErrorException();

    return newMenuItem;
  }
}
