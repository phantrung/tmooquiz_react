import React from 'react';
import {Typography,Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import './style.css'
import ListCate from "./ListCate";
import Img from "../../../../@Core/Components/Img";
import SearchField from "./SearchField";
const useStyles = makeStyles(theme => ({
    pageTitle : {
        fontSize : 40,
        fontWeight : 700,
        marginBottom : theme.spacing(3),
        [theme.breakpoints.down('sm')] : {
            fontSize : 28,
        },
        '& span' : {
            paddingRight : 5
        },
        '& .t-one' : {
            color : '#3179b9'
        },
        '& .t-two' : {
            color : '#e86767'
        },
        '& .t-three' : {
            color : '#81c352'
        },
        '& .t-four' : {
            color : '#9e4d83'
        }
    }
}))
const Index = (props) => {
    const classes = useStyles()
    return (
        <div className="wrapper-content h-full">
            <Container maxWidth="lg" className="mt-24">
                <div className="flex flex-wrap items-center">
                    <div className="about-site text-center sm:text-left sm:w-1/2 pl-12 pr-12">
                        <Typography variant="h1" className={classes.pageTitle}>
                            <span className="t-one">Tạo và</span>
                            <span className="t-two">chia sẻ</span>
                            <span className="t-three">đề thi trắc nghiệm</span>
                            <span className="t-four">trực tuyến</span>
                        </Typography>
                        <Typography component="p" className="md:text-lg sm:text-base" color="textSecondary">
                            Thông qua các bài thi, kiểm tra trực tuyến, chúng tôi sẽ giúp bạn rèn luyện và học tốt hơn.
                        </Typography>
                        <div className="search-field mt-12">
                            <SearchField/>
                        </div>
                    </div>
                    <div className="img-banner sm:w-1/2 pl-12 pr-12">
                        <Img src="assets/images/homepage/illustration.png" alt="banner"/>
                    </div>
                </div>
            </Container>
            <ListCate/>
        </div>
    )
}

export default React.memo(Index);