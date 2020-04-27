import React from "react";
import {ROUTER_CATE_QUIZ, ROUTER_SEARCH_QUIZ} from "../Model/constants";

export const HomepageConfig = {
    settings: {
        layout: {
            config: {
                navbar        : {
                    display: false
                },
                // toolbar       : {
                //     display: false
                // },
                // footer        : {
                //     display: false
                // },
                // leftSidePanel : {
                //     display: false
                // },
                // rightSidePanel: {
                //     display: false
                // }
            }
        }
    },
    // auth : authRoles.onlyGuest,
    routes  : [
        {
            path     : '/',
            exact    : true,
            component: React.lazy(() => import('../Pages/Homepage'))
        },
    ]
}

export const ListQuizConfig = {
    settings: {
        layout: {
            config: {
                // navbar        : {
                //     display: false
                // },
                // toolbar       : {
                //     display: false
                // },
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
    // auth : authRoles.onlyGuest,
    routes  : [
        {
            path     : ROUTER_SEARCH_QUIZ,
            exact    : true,
            component: React.lazy(() => import('../Pages/ListQuiz'))
        },
        {
            path     : ROUTER_CATE_QUIZ,
            exact    : true,
            component: React.lazy(() => import('../Pages/ListQuiz'))
        },
    ]
}