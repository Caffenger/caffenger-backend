export const MENU_ROUTES = {
  BASE: 'cafe/:cafeId/menu',
  BY_ID: ':menuId',
  ITEMS: ':menuId/items/:menuItemId',
} as const;
