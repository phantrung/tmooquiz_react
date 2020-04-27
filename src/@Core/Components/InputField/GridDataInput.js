import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {CircularProgress, Icon, makeStyles, TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import ReactTable from "react-table";
// import Identify from "../../Helper/Identify";
import CustomCell from "../Table/Cell";
import ProductsModel from "../../../@E3D/Services/Products/Model";
import DialogPopup from "../DialogPopup";
import Checkbox from "@material-ui/core/Checkbox";
import SelectBoxFilter from "../Table/SelectBoxFilter";
// import BrandModel from "../../../Services/Customer/Model/Brand";
import debounce from "lodash/debounce";
import {FuseAnimate} from "../../../@fuse";
import Img from "../Img";
import {LoaderButton} from "../LoaderButton";
import ProducerModel from "../../../@E3D/Services/Customer/Model/Producer";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: 325,
        marginTop:0,
        marginRight: theme.spacing(3)
    },
    inputSearch : {
        padding : 14
    },
}));
let query = {}

const GridDataInput = props => {

    const {defaultValue} = props
    const [listData,setListData] = useState(ProductsModel.defaultResponse)
    const [loading,setLoading] = useState(true)
    const [open,setOpen] = useState(false)
    const [checked,setChecked] = useState(defaultValue)
    const [value,setValue] = useState(defaultValue.join(','))
    const classes = useStyles()
    const handleGetListData = (filter = {}) => {
        setLoading(true)
        filter.isActive = true
        // console.log(filter)
        // ProductsModel.setParamsGet(filter)
        ProductsModel.getList(filter)
            .then(res => {
                setListData(res)
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            })
    }

    useEffect(() => {
        query = {}
        handleGetListData()
        return () => {
            query = {}
        }
    },[])

    // useEffect(() => {
    //
    // },[open])

    const handleToggle = value => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleToggleAll = () => {
        if(checked.length === listData.data.length){
            setChecked([])
        }else{
            let newChecked = listData.data.map(item => item.id)
            setChecked(newChecked);
        }
    }

    const renderListFilter = () => {
        const handleSearchInput = (key,value) => {
            query[key] = value
            if(!value) delete query[key]
            handleGetListData(query)
        }

        const doHandleSearchInput = debounce(handleSearchInput,500)
        return (
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <div className="flex mb-8 relative z-9999">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        name={`sku`}
                        className={classes.textField}
                        inputProps={{
                            className : classes.inputSearch
                        }}
                        onChange={e => doHandleSearchInput(e.target.name,e.target.value)}
                        placeholder="Tìm kiếm theo mã sản phẩm..."
                    />
                    {/*<SelectBoxFilter feature={`product`}*/}
                    {/*                 placeholder={`Nhóm thuộc tính`}*/}
                    {/*                 handleFilterListData={handleGetListData}*/}
                    {/*                 defaultOptions={filter.group_attr.values}*/}
                    {/*                 alias={filter.group_attr.alias}/>*/}
                    <SelectBoxFilter feature={`grid_product`}
                                     placeholder={`Nhà sản xuất`}
                                     handleFilterListData={handleGetListData}
                                     Model={ProducerModel}
                                     async={true}
                                     queryParams={query}
                                     alias={`manufacturerIds`}/>

                </div>
            </FuseAnimate>
        )
    }

    const renderGrid = () => {
        return(
            <div className="grid-data">
                {renderListFilter()}
                <ReactTable
                    loading={loading}
                    loadingText={<CircularProgress/>}
                    defaultPageSize={listData.data.length > 0 ? 10 : 5}
                    pageSize={listData.data.length > 0 ? 10 : 5}
                    showPageSizeOptions={false}
                    data={listData.data}
                    onPageSizeChange={(size,page) => handleGetListData({page,size})}
                    onPageChange={page=>{
                        handleGetListData({page})
                    }}
                    pages={listData.totalPage}
                    page={parseInt(listData.pageIndex)}
                    manual
                    className="grid-table-data -striped -highlight"
                    style={{maxHeight : 600}}
                    columns={[
                        {
                            Header    : listData.data.length > 0 ? <Checkbox checked={checked.length === listData.data.length } onChange={handleToggleAll}/> : null,
                            accessor  : "id",
                            className : "justify-center",
                            width : 50,
                            Cell : props => <Checkbox checked={checked.includes(props.value)} onChange={()=>handleToggle(props.value)}/>
                        },
                        {
                            Header    : "Id",
                            accessor  : "id",
                            className : "justify-center",
                            width : 50
                        },
                        {
                            Header    : "Ảnh đại diện",
                            accessor  : "thumbnail",
                            className : "justify-center",
                            Cell : props => {
                                return (
                                    <div style={{maxWidth:100}}><Img width={100} height={100} src={props.value} alt="image1"/></div>
                                )
                            }
                        },
                        {
                            Header    : "Tên",
                            accessor  : "name",
                            className : "justify-center",
                            Cell : props => <CustomCell {...props}/>
                        },
                        {
                            Header    : "Alias",
                            accessor  : "alias",
                            className : "justify-center",
                            Cell : props => <CustomCell {...props}/>
                        },
                        {
                            Header    : "Sku",
                            accessor  : "sku",
                            className : "justify-center",
                            Cell : props => <CustomCell {...props}/>
                        },
                    ]}
                />
            </div>
        )
    }

    const handleOnChange = () => {
        let val = checked.join(',')
        setValue(val)
        setOpen(false)
        props.onChange(val)
    }

    return (
        <div>
            <div className="grid-input-field">
                <TextField
                    variant="outlined"
                    fullWidth
                    value={value}
                    inputProps={{
                        readOnly:true
                    }}
                    InputProps={{
                        endAdornment : (
                            <InputAdornment position="end" onClick={()=>setOpen(true)}>
                                <IconButton >
                                    <Icon>grid_on</Icon>
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </div>
            <DialogPopup
                open={open}
                dialogTitle={`Danh sách sản phẩm`}
                dialogContent={renderGrid()}
                PaperPropsStyle={{width:'100%',maxWidth:1000}}
                handleClose={() => setOpen(false)}
                dialogAction={
                    <>
                        <LoaderButton variant={`contained`} color={`primary`} onClick={handleOnChange}>
                            Xác nhận
                        </LoaderButton>
                        <LoaderButton variant={`contained`} color={`secondary`} onClick={()=>setOpen(false)}>
                            Huỷ
                        </LoaderButton>
                    </>
                }
            />
        </div>
    );
};
GridDataInput.defaultProps = {
    onChange : () => {},
    defaultValue : []
}
GridDataInput.propTypes = {
    data : PropTypes.array,
    onChange : PropTypes.func,
    defaultValue : PropTypes.array,
};

export default React.memo(GridDataInput);