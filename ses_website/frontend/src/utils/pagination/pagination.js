import _ from "lodash"
const pagination = (arr , currentPage , maxCount)=>{
    const pageSize = _.range(1,Math.ceil(arr.length / maxCount)+1)
    const startIndex = (currentPage -1)*maxCount
    const postArr =arr.length > 6 ? _(arr).slice(startIndex).take(maxCount).value():arr
    return [pageSize , postArr]
}

export default pagination