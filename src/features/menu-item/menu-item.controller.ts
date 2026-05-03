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

@Controller('cafe/:cafeId/menu/:menuId/menu-item')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getMenuItems(@Param('menuId') menuId: string) {
    const menuItemsOfMenu = await this.menuItemService.getManyByMenuId(menuId);

    if (!menuItemsOfMenu) throw new NotFoundException();

    return menuItemsOfMenu;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('mutate')
  async mutate(@Body() mutateMenuItemDto: MutateMenuItemDto, @Param('cafeId') cafeId: string) {
    const newMenuItem =
      await this.menuItemService.mutateOneMenuItem(mutateMenuItemDto, cafeId);

    if (!newMenuItem) throw new InternalServerErrorException();

    return newMenuItem;
  }
}
