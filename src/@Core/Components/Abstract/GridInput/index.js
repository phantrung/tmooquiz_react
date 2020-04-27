import React from "react";
import ListAbstract from "../Table/List";
import {CircularProgress, Icon} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DialogPopup from "../../DialogPopup";
import {LoaderButton} from "../../LoaderButton";
import './style.css'
import Checkbox from "@material-ui/core/Checkbox";
import {BASE_STATE} from "../index";
import ReactTable from "react-table";
import PaginationTable from "../../Table/PaginationTable";
import Switch from "@material-ui/core/Switch";
import TextFieldSearch from "../../InputField/TextFieldSearch";
import debounce from "lodash/debounce";
import Chip from "@material-ui/core/Chip";
class GridInputAbstract extends ListAbstract{

    constructor(props) {
        super(props);
        let {defaultValue,defaultCheckedAll,showOptionAll} = this.props
        if(!showOptionAll) defaultCheckedAll = false
        this.state = {
            ...BASE_STATE,
            open : false,
            checked : defaultValue ? defaultValue : [],
            value : defaultCheckedAll ? [{id : -1 , alias : 'Tất cả'}] : defaultValue,
            checkedAll : !!defaultCheckedAll,
            toggleAllPage : [],
        }
        this.dialogTitle = this.pageTitle
        this.query = {}
        this.labelKey = 'alias'
        this.page = 0
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.comparePropsState(this,nextProps,nextState)
    }

    componentDidMount() {
        this.getCollectionData(this.query)
    }

    getCollectionData = (filter = {}) => {
        if(this.Model){
            filter.isActive = true
            this.setLoading(true)
            this.Model.getList(filter)
                .then(data => {
                    this.processData(data)
                    // if(toggleAllItem){
                    //     let newChecked = [...checked,...data.data];
                    //     newChecked = new Set(newChecked)
                    //     this.setChecked([...newChecked]);
                    // }
                })
                .catch(err => {
                    this.processError(err)
                })
        }
    }

    setChecked = val => {
        // let newChecked = [...this.state.checked];
        // newChecked.push(val)
        // console.log(`===========> newChecked`,newChecked)
        // newChecked = _uniq(newChecked,'id')
        this.setState({checked : val})
    }


    handleToggle = obj => {
        const {checked,checkedAll} = this.state
        if(checkedAll) return true
        const currentIndex = checked.map(item => item.id).indexOf(obj.id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(obj);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        // console.log(`===========> newChecked`,newChecked)
        this.setChecked(newChecked);
    };

    handleToggleAllPage = () => {
        const {collection,checked,toggleAllPage} = this.state
        const newData = [...toggleAllPage];
        const currentIndex = newData.indexOf(this.page);
        if (currentIndex === -1) {
            newData.push(this.page);
            let newChecked = [...checked,...collection.data];
            newChecked = new Set(newChecked)
            this.setChecked([...newChecked]);
        } else {
            let listRemoveObjId = collection.data.map(item => item.id)
            let newChecked = [...checked];
            newChecked = newChecked.filter(item => !listRemoveObjId.includes(item.id))
            newData.splice(currentIndex, 1);
            this.setChecked(newChecked)
        }
        this.setState({toggleAllPage:newData})
    }

    handleToggleAll = (toggle) => {
        const {collection,checked} = this.state
        // this.setState({toggleAllItem : toggle})
        if(!toggle){
            this.setChecked([])
        }else{
            let newChecked = [...checked,...collection.data];
            this.setChecked(newChecked);
        }
    }

    setOpen = open => this.setState({open})

    isChecked = (key,val) => {
        const {checked} = this.state
        return checked.map(item => item[key]).includes(val)
    }

    renderColumnChecked(){
        const {collection,checkedAll,toggleAllPage} = this.state
        // console.log(`===========> checked`,)
        // let checkedAllInPage = checked.length === collection.data.length
        // if(checkedAll) checkedAllInPage = false
        return {
            Header    : collection.data.length > 0 && !checkedAll ? <Checkbox checked={toggleAllPage.includes(this.page)}  onChange={() =>this.handleToggleAllPage()}/> : null,
            accessor  : "id",
            className : "justify-center",
            width : 50,
            Cell : props => <Checkbox checked={this.isChecked('id',props.value) || checkedAll} onChange={()=>this.handleToggle(props.original)}/>
        }
    }

    handleSearchInput = (key,value) => {
        this.query[key] = value
        if(!value || value === ''){
            delete this.query[key]
        }
        this.getCollectionData(this.query)
    }

    doHandleSearchInput = debounce(this.handleSearchInput,500)

    renderTextFieldSearch = props => {
        return <TextFieldSearch name={`name`}
                                placeholder={`Nhập tên ...`}
                                defaultValue={props.name ? this.query[props.name] : null}
                                onChange={e => this.doHandleSearchInput(e.target.name,e.target.value)}
                                {...props}/>
    }

    renderTable(){
        const {collection,loading,size} = this.state
        return (
            <ReactTable
                loadingText={<CircularProgress/>}
                loading={loading}
                data={collection.data}
                className="-striped -highlight"
                pageSizeOptions={[10,20,50,100]}
                page={collection.pageIndex}
                pageSize={size}
                onPageSizeChange={(size,page) => this.getCollectionData({page,size})}
                pages={collection.totalPage}
                onPageChange={page=>{
                    this.getCollectionData({page})
                }}
                PaginationComponent={props => <PaginationTable {...collection} {...props}/>}
                manual
                noDataText={`Không có có dữ liệu nào!`}
                columns={this.renderListColumns()}
            />
        )
    }

    renderListFilter () {
        return this.renderTextFieldSearch()
    }


    handleCheckedAll = () => {
        this.setState(state => {
            return {
                ...state,
                checkedAll : !state.checkedAll
            }
        })
    }
    renderOptionAll () {
        if(this.props.showOptionAll){
            const {checkedAll} = this.state
            return (
                <div>
                    Chọn tất cả
                    <Switch
                        checked={checkedAll}
                        onChange={this.handleCheckedAll}
                    />
                </div>
            )
        }

    }

    renderGrid () {
        console.log(`===========> query`,this.query)

        const {collection,loading} = this.state
        return(
            <div className="grid-data">
                {this.renderListFilter()}
                {this.renderOptionAll()}
                <ReactTable
                    loadingText={<CircularProgress/>}
                    loading={loading}
                    data={collection.data}
                    className="-striped -highlight"
                    pageSizeOptions={[10,20,50,100]}
                    page={collection.pageIndex}
                    pageSize={this.query.size}
                    defaultPageSize={10}
                    onPageSizeChange={(size,page) => {
                        this.query = {
                            ...this.query,
                            page,size
                        }
                        this.getCollectionData(this.query)
                    }}
                    pages={collection.totalPage}
                    onPageChange={page=>{
                        this.query = {
                            ...this.query,
                            page
                        }
                        this.page = page
                        this.getCollectionData(this.query)
                    }}
                    PaginationComponent={props => <PaginationTable {...collection} {...props}/>}
                    manual
                    noDataText={`Không có có dữ liệu nào!`}
                    columns={this.renderListColumns()}
                />
            </div>
        )
    }

    handleDeleteItemChecked = (id) => {
        const {checked} = this.state
        const currentIndex = checked.map(item => item.id).indexOf(id);
        const newChecked = [...checked];
        newChecked.splice(currentIndex, 1);
        this.setChecked(newChecked)
        this.setState({value:newChecked})
        this.props.onChange(newChecked)
    }

    renderCheckedLabel(){
        const {value} = this.state
        return value.map((item,index) => {
            // return <div className="checked-value-input" key={index}>
            //         <span className="checked-value-label">{item.alias}</span>
            //     </div>
            return <Chip key={index}
                         size="small"
                         className="value-input-label"
                         onDelete={(e)=> this.handleDeleteItemChecked(item.id)}
                         label={item[this.labelKey]} />
        })
    }

    handleOnChange = () => {
        if(this.state.checkedAll){
            this.setState({value : [{id : -1 , alias : 'Tất cả'}]})
            this.props.onCheckedAll(true)
        }else{
            let val = this.state.checked
            this.setState({value : val})
            this.props.onChange(val)
            this.props.onCheckedAll(false)
        }
        this.setOpen(false)
    }

    render() {
        const {open} = this.state
        return (
            <div>
                <div className="grid-input-field">
                    <div className="grid-textarea-value">{this.renderCheckedLabel()}</div>
                    <div className="grid-input-field-icon">
                        <IconButton color="primary" onClick={()=>this.setOpen(true)}>
                            <Icon>grid_on</Icon>
                        </IconButton>
                    </div>
                </div>
                <DialogPopup
                    open={open}
                    dialogTitle={this.dialogTitle}
                    dialogContent={open ? this.renderGrid() : null}
                    PaperPropsStyle={{width:'100%',maxWidth:1000}}
                    handleClose={() => this.setOpen(false)}
                    dialogAction={
                        <>
                            <LoaderButton variant={`contained`} color={`primary`} onClick={this.handleOnChange}>
                                Xác nhận
                            </LoaderButton>
                            <LoaderButton variant={`contained`} color={`secondary`} onClick={()=>this.setOpen(false)}>
                                Huỷ
                            </LoaderButton>
                        </>
                    }
                />
            </div>
        )
    }
}
GridInputAbstract.defaultProps = {
    onCheckedAll : () => {},
    defaultValue : [],
    showOptionAll : false

}
export default GridInputAbstract