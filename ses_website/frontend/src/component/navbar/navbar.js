import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Navigate } from 'react-router-dom';
import Context from '../../context';
import ConnectModal from '../modal/modalConnect';

function OffcanvasExample({setData , data}) {
    const [showOfcanvas , setShowOfcanvas] = useState(false)
    const {setCurrentPage , admin} = useContext(Context)
    const [show , setModalshov] = useState(false)
    const [AdminPanel , setAdminPanel] = useState(false)
    const setShow = ()=>{setShowOfcanvas(prevState=>(!prevState))}
    const [text , setText] = useState("")
    const searchPost = ()=>{
      setCurrentPage(1)
      setData(prevstate=>{
            return data.filter(post=>{
              return post.title.search(text) !== -1
            })
      })
    }
    const textSet = ({target})=>{
      setText(target.value)
    }

    const onHide = (cb)=>{
        cb({fullName:"", tell:"" , message:""})
        setModalshov(false)
    }

    if(AdminPanel) return <Navigate to={"pages/admin-panel"} />

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3" fixed='top'>
          <Container fluid>
            <Navbar.Brand>Sanitariya-epidemiologiya stansiyasi</Navbar.Brand>
            <Navbar.Toggle  onClick={setShow} />
            <Navbar.Offcanvas
              show={showOfcanvas}
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              onHide={setShow}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onInput={textSet}
                  />
                  <Button variant="outline-success" onClick={searchPost}>Search</Button>
                </Form>
                {admin ?
                 <Button variant='success' size='lg' className='w-100 mt-5' onClick={()=>{setAdminPanel(true)}}>Admin panel</Button>
                  : <Button variant='success' size='lg' className='w-100 mt-5' onClick={()=>{setModalshov(true); setShowOfcanvas(false)}}>bog'lanish</Button>} 
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <ConnectModal show={show} onHide={onHide}/>
    </>
  );
}

export default OffcanvasExample;