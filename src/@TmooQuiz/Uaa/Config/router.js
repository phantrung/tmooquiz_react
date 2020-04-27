import React from "react";
import {authRoles} from "../../../app/auth";
import {ROUTER_ADMIN_ROLE, ROUTER_ADMIN_USER} from "../Model/constants";

export const UaaRouterConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : ROUTER_ADMIN_USER,
            exact    : true,
            component: React.lazy(() => import('../Pages/User/List'))
        },
        {
            path     : ROUTER_ADMIN_ROLE,
            exact    : true,
            component: React.lazy(() => import('../Pages/Role'))
        },
    ]
}

export const LoginConfig = {
    settings: {
        layout: {
            config: {
                navbar        : {
                    display: false
                },
                toolbar       : {
                    display: false
                },
                footer        : {
                    display: false
                },
                leftSidePanel : {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },
    auth : authRoles.onlyGuest,
    routes  : [
        {
            path     : '/login',
            exact    : true,
            component: React.lazy(() => import('../Pages/Login'))
        },
    ]
}