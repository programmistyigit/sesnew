import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Navigate } from 'react-router-dom';
import MyVerticallyCenteredModal from '../modal/modal';
import { useSnackbar, SnackbarProvider } from "notistack"
import Context from '../../../context';

function OffcanvasExample1() {
    const {setAdmin} = useContext(Context)
    const { enqueueSnackbar } = useSnackbar()
    const [show, setShow] = useState(false)
    const [showOfcanvas, setShowOfcanvas] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const logout = () => {
        window.cookieStore.delete("_admin")
        enqueueSnackbar({message:'admin malumotlari brauzerdann ochirildi' , variant:"success" , anchorOrigin:{vertical:"top" , horizontal:"center"}})
        setTimeout(() => {
            setAdmin(false)
            setRedirect(true)
        }, 2000)
    }
    if (redirect) return <Navigate to={"/"} />

    return (
        <>
            {[false].map((expand) => (
                <Navbar key={expand} bg="light" expand={expand} className="mb-3">
                    <Container fluid>
                        <Navbar.Brand href="#">Admin panel</Navbar.Brand>
                        <Navbar.Toggle onClick={() => { setShowOfcanvas(true) }} />
                        <Navbar.Offcanvas
                            show={showOfcanvas}
                            onHide={() => { setShowOfcanvas(false) }}
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Admin dashboart
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body className='d-flex align-item-center' style={{flexDirection:"column"}}>
                                <Button variant="outline-success"  onClick={() => { setShow(true); setShowOfcanvas(false) }}>new Post</Button>
                                <Button variant="outline-danger" onClick={logout}>log out</Button>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
            <MyVerticallyCenteredModal show={show} setShow={setShow} />
        </>
    );
}
function OffcanvasExample(props) {
    return (
        <SnackbarProvider maxSnack={1} autoHideDuration={1900}>
            <OffcanvasExample1 {...props} />
        </SnackbarProvider>
    )
}
export default OffcanvasExample;