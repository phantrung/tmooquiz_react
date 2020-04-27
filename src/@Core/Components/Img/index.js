import React, { Component,memo } from 'react';
import './img.css';
import Identify from "../../Helper/Identify";
import PropTypes from 'prop-types'
import {LoadingImg} from "../LoadingImg";

class Img extends Component {

    constructor(props) {
        super(props);
        this.ironImageHd = null;
        this.state = {
            loaded : false
        }
        this.id = 'img-'+Identify.makeid()
    }

    shouldComponentUpdate(nextProps,nextState){
        if(this.props.src !== nextProps.src){
            return true
        }
        return this.state.loaded !== nextState.loaded;
    }

    componentDidMount(){
        this.ironImageHd = new Image();
        this.ironImageHd.src = this.props.src;
        this.ironImageHd.onload = (e) => {
            if(this.imgLoaded){
                this.imgLoaded.classList.add('iron-image-fade-in')
                this.imgLoaded.style.height = 'auto'
                this.preLoaded.style.display = 'none'
            }
        }
    }

    render() {

        let style = {
            width : this.props.width,
            height : this.props.height
        }
        let imgProps = {...this.props}
        delete imgProps['component']

        return (
            <div className="iron-image-container" ref={(node)=>this.imgContainer = node} style={{...style,background : '#fff'}} id={this.id}>
                <div
                    className="iron-image-loaded"
                    ref={(img)=>this.imgLoaded = img}
                    style={style}
                >
                    <img alt={this.props.alt} src={this.props.src}/>
                </div>
                <div
                    className="iron-image-preload"
                    ref={(loaded) => this.preLoaded = loaded}
                >
                    {/*//style={{ backgroundImage: `url('${this.props.srcPreload}')` }}>*/}
                    <LoadingImg size={20}/>
                </div>

            </div>
        )
    }

}
Img.defaultProps = {
    alt : '',
    style : {},
    width : '100%',
    height: '100%'
}
Img.propTypes = {
    width: PropTypes.node,
    height: PropTypes.node
}
export default memo(Img);