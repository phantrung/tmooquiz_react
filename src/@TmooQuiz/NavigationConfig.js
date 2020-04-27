import {UaaNavigationConfig} from "./Uaa/Config/navigation";

export const F3DNavigationConfig = [
    {
        'id': 'admin',
        'title': 'Admin',
        'type': 'group',
        'icon': 'apps',
        'children': []
    },
    {
        'id'      : 'system',
        'title'   : 'Hệ thống',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            ...UaaNavigationConfig
        ]
    }
]