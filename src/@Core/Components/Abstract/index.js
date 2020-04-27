import React from "react";
import {DEFAULT_RESPONSE} from "../../Api/constants";
export const BASE_STATE = {
    loading : true,
    data : null,
    collection : DEFAULT_RESPONSE
}
class AbstractComponent extends React.Component{

    state = BASE_STATE

    comparePropsState(obj,nextProps, nextState) {
        if(JSON.stringify(nextProps) !== JSON.stringify(obj.props) || JSON.stringify(nextState) !== JSON.stringify(obj.state)){
            return true
        }
        return false
    }

    setLoading = loading => this.setState({loading})

    setCollection = collection => this.setState({collection})

    setData = data => this.setState({data})
}
export default AbstractComponent