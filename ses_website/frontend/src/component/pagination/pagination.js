import { Pagination } from "react-bootstrap";

function PaginationBtn ({btnCount , currentPage , setCurrentPage}){
    return (
        <Pagination size="sm">
            {btnCount.map(btn=>{
                return <Pagination.Item key={btn} active={btn === currentPage || btnCount.length === 1} onClick={()=>{setCurrentPage(btn)}}>{btn}</Pagination.Item>
            })}
        </Pagination>
    )
}

export default PaginationBtn