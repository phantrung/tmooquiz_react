import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
import {F3DRouterConfig} from "../../@TmooQuiz/RouterConfig";

const routeConfigs = [
    ...F3DRouterConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        // path     : '/',
        component: () => <Redirect to="/"/>
    }
];

export default routes;
