import BasicExample from './card/card';
import Sorovlar from './sorovlar/sorovlar';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/Button';
import Joylashuv from './joylashuv/joylashuv';
import { useState , useContext } from 'react';
import Sarlavha from './sarlavha/sarlavha';
import pagination from "../utils/pagination/pagination"
import PaginationBtn from "./pagination/pagination"
import Context from '../context';
const Client = ({data}) => {
    const {setCurrentPage , currentPage} = useContext(Context)
    const [yangilik, setYangilik] = useState("yangilik")
    const [pageSize , newDataArray] = pagination(data , currentPage , 6)
    const setCurrentPageF=(i)=>{setCurrentPage(i)}
    return (
        <>
            <Sarlavha />
            <center style={{ margin: 10 }}>
                <div style={{ display: "flex", width: 300, justifyContent: "space-evenly" }}>
                    <Button variant="outline-secondary" onClick={() => setYangilik("yangilik")}>Yangililar</Button>
                    <Button variant="outline-secondary" onClick={() => setYangilik("joylashuv")}>Joylashuv</Button>
                </div>
            </center>
            {
                (() => {
                    if (yangilik === "yangilik") {
                        return !data ? (
                            <div className='loaderDiv'>
                                <span className="loader"></span>
                            </div>
                        ) : (
                            <Container style={{ marginTop: "100px" }}>
                                <Row className='d-flex justify-content-center '>
                                    {newDataArray.map(post => (
                                        <BasicExample {...post} key={post._id} />
                                    ))}
                                </Row>
                                <div className='d-flex justify-content-center'>
                                    <PaginationBtn btnCount={pageSize} currentPage={currentPage} setCurrentPage={setCurrentPageF}/>
                                </div>

                            </Container>
                        )
                    }
                    return <Joylashuv />
                })()
            }
            <Sorovlar />
        </>
    )
}

export default Client