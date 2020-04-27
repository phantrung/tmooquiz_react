import {ROUTER_ADMIN_ROLE, ROUTER_ADMIN_USER} from "../Model/constants";

export const UaaNavigationConfig = [
    {
        'id'   : 'user',
        'title': 'Quản lý users',
        'type' : 'item',
        'icon' : 'group',
        'url'  : ROUTER_ADMIN_USER
    },
    {
        'id'   : 'role',
        'title': 'Quản lý vai trò',
        'type' : 'item',
        'icon' : 'how_to_reg',
        'url'  : ROUTER_ADMIN_ROLE
    }
]