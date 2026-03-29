import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard';
import { CreateMenuDto, UpdateMenuDto } from './dtos/dto';
import { MenuItemService } from '../menu-item/menu-item.service';
import { MutateMenuAndItemRelationDto } from '../menu-item/dtos/dto';
import { MENU_ROUTES } from './menu.routes';

@UseGuards(JwtAuthGuard)
@Controller(MENU_ROUTES.BASE)
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private readonly menuItemService: MenuItemService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getCafeMenus(@Param('cafeId') cafeId: string) {
    const cafeMenus = await this.menuService.getMenusOfCafeByCafeId(cafeId);
    console.log(cafeMenus);
    if (!cafeMenus) throw new NotFoundException();

    return cafeMenus;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createMenu(
    @Param('cafeId') cafeId: string,
    @Body() createMenuDto: CreateMenuDto,
  ) {
    console.log('ENTERD MENU CONTROLLER', cafeId, createMenuDto);
    const newMenu = await this.menuService.createMenu(cafeId, createMenuDto);

    if (!newMenu) throw new InternalServerErrorException();

    return newMenu;
  }

  @HttpCode(HttpStatus.OK)
  @Post(MENU_ROUTES.BY_ID)
  async updateMenu(
    @Param('menuId') menuId: string,
    @Body() updateMenuDto: UpdateMenuDto,
  ) {
    const updatedMenu = await this.menuService.updateOneMenu(
      menuId,
      updateMenuDto,
    );

    if (!updatedMenu) throw new InternalServerErrorException();

    return updatedMenu;
  }

  // when delete menu, menu item does not cascade, only remains unassigned
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(MENU_ROUTES.BY_ID)
  async deleteMenu(@Param('menuId') menuId: string) {
    const deletedMenu = await this.menuService.deleteMenu(menuId);
    if (!deletedMenu) throw new NotFoundException();

    return deletedMenu;
  }

  // ----------- handle connection || separation based on menuId -----------
  @HttpCode(HttpStatus.OK)
  @Post(MENU_ROUTES.ITEMS)
  async addToMenu(@Param() dto: MutateMenuAndItemRelationDto) {
    const assignedMenuItem =
      await this.menuItemService.mutateMenuAndMenuItemRelationship(dto);

    if (!assignedMenuItem) throw new InternalServerErrorException();

    return assignedMenuItem;
  }

  @HttpCode(HttpStatus.OK)
  @Delete(MENU_ROUTES.ITEMS)
  async removeFromMenu(@Param() dto: MutateMenuAndItemRelationDto) {
    const removedSuccesfully =
      await this.menuItemService.mutateMenuAndMenuItemRelationship({
        menuItemId: dto.menuItemId,
        menuId: undefined,
      });

    if (!removedSuccesfully) throw new InternalServerErrorException();

    return HttpStatus.OK;
  }
}
