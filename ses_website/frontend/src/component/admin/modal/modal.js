import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useContext, useRef, useState } from 'react';
import Context from '../../../context';
import { SnackbarProvider, useSnackbar } from "notistack"
import { Navigate } from 'react-router-dom';

function MyVerticallyCenteredModal1({ show, setShow }) {
  const ref = useRef()
  const { enqueueSnackbar } = useSnackbar()
  const { server , setPosts} = useContext(Context)
  const [redirect, setRedirect] = useState(false)
  const [data, setData] = useState({ title: "", description: "", file: null  , sana:""})

  const SETdata = (name, value) => {
    console.log(value);
    setData(prevState => ({ ...prevState, [name]: value }))
    console.log(data);
  }
  const Submit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("description", data.description)
    formData.append("title", data.title)
    formData.append("avatar", data.file)
    formData.append("sana", data.sana)
    console.log(formData);
    const res = await fetch(server + "post", {
      method: "POST",
      body: formData,
      credentials: "include"
    })

    if (res.status === 200) {
      setTimeout(() => {
        setRedirect(true)
      }, 2000)
      const respons = await res.json()
      setPosts(prevState=>{
        return [respons , ...prevState]
      })
      return enqueueSnackbar({ message: "post joylashtirildi", variant: "success", anchorOrigin: { vertical: "top", horizontal: "center" } })
    }
    const error = await res.json()
    return enqueueSnackbar({ message: error.err, variant: "error", anchorOrigin: { vertical: "top", horizontal: "center" } })
  }

  if (redirect) return <Navigate to={"/"} />

  return (
    <Modal
      onHide={() => { setShow(false) }}
      show={show}
      size="mg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          yangi post qoyish
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={Submit} as="form">
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Rasm biriktirish</Form.Label>
            <Form.Control type="file" name='file' accept='.jpg , .png , .jpeg' onInput={(e) => { SETdata("file", e.target.files[0]) }} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Sarlavha</Form.Label>
            <Form.Control type="text" placeholder="srlavha" name='title' onInput={({ target }) => { SETdata("title", target.value) }} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Toliq malumot</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" onInput={({ target }) => { SETdata("description", target.value) }} />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="date" onInput={({ target }) => { SETdata("sana", target.value) }} />
          </Form.Group>
          <button ref={ref} hidden></button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='success' onClick={() => { ref.current.click() }}>send</Button>
        <Button onClick={() => { setShow(false) }}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function MyVerticallyCenteredModal(props) {
  return (
    <SnackbarProvider maxSnack={1} autoHideDuration={2000}>
      <MyVerticallyCenteredModal1 {...props} />
    </SnackbarProvider>
  )
}

export default MyVerticallyCenteredModal

