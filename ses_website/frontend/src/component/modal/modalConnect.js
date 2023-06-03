import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TextControlsExample from './textControl/textcontrol';
import {useState , useContext } from "react"
import {useSnackbar , SnackbarProvider} from "notistack"
import Context from '../../context';



function ConnectModal1({show , onHide }) {
  const {enqueueSnackbar} = useSnackbar()
  const {server} = useContext(Context)
  const [message , setMessage] = useState({
    fullName:"",
    tell:"",
    message:""
  })
  
  const setMessage2 = (name , value)=>{
    setMessage(prevStae=>{
      return {...prevStae , [name]:value}
    })
  }

  const hideModal = ()=>{
    onHide(setMessage)
  }

  const SendDataToServer = ()=>{
    fetch(server+"message" , {
      method:"POST",
      body:JSON.stringify(message),
      headers:{"Content-type":"application/json"}
    }).then(data=>data.json())
    .then(res=>{
      if(res.status){
        enqueueSnackbar({message:"Murojaat yuborildi!" , variant:"success" , anchorOrigin:{vertical:"top" , horizontal:"left"}})
        onHide(setMessage)
        return
      } 
        onHide(setMessage)
      enqueueSnackbar({message:"Hatolik tufayli Murojaat yuborilmadi" , variant:"error" ,  anchorOrigin:{vertical:"top" , horizontal:"left"}})
    })
  }
    return (
      <Modal
      show={show}
      onHide={hideModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            ariza yuborish
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextControlsExample setMessage1={setMessage2} />
        </Modal.Body>
        <Modal.Footer>
            <Button variant='success' onClick={SendDataToServer}>Send</Button>
            <Button onClick={hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const ConnectModal = (PROP)=>{
    return(
        <SnackbarProvider maxSnack={1} autoHideDuration={2000}>
          <ConnectModal1 {...PROP}/>
        </SnackbarProvider>
    )
  }

  export default ConnectModal