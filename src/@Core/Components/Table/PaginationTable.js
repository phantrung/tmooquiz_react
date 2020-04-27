import React from 'react';
import Pagination from "@material-ui/lab/Pagination";
const PaginationTable = (props) => {
    // console.log(`===========> props`,props)
    const {totalPage,onPageChange,pageIndex,pageSize,data,totalElement,pageSizeOptions,onPageSizeChange,showPageSizeOptions} = props
    let from = (pageSize * pageIndex) + 1
    let to = (pageSize * pageIndex) + data.length
    const handleChange = (e,page) => {
        console.log(`===========> value`,page)
        onPageChange(page-1)
    }
    const renderPerPageOptions = () => {
        if(!showPageSizeOptions) {
            return (
                <div className="ml-8 mr-auto">
                    <span>Số hàng trên 1 trang : {pageSize}</span>
                </div>
            )
        }
        const handleChangePageSize = e => {
            onPageSizeChange(e.target.value,pageIndex)
        }

        return (
            <div className="ml-8 mr-auto">
                <span>Số hàng trên 1 trang : </span>
                <select className="select-row-per-page" value={pageSize || 10} onChange={handleChangePageSize}>
                    {
                        pageSizeOptions.map(option => {
                            return <option key={option} value={option}>{option}</option>
                        })
                    }
                </select>
            </div>
        )
    }
    let labelDisplayedRows = null
    if(totalElement && totalElement > 0){
        labelDisplayedRows = <div className="labelDisplayedRows mr-4">{`${from} - ${to} trên tổng số ${totalElement}`}</div>
    }
    return (
        <div className="custom-pagination-table flex">
            {renderPerPageOptions()}
            { labelDisplayedRows}
            <Pagination count={totalPage}
                        page={pageIndex+1}
                        color="secondary"
                        onChange={handleChange}
            />
        </div>
    )
}
export default React.memo(PaginationTable);