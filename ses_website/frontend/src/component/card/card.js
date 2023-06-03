import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useContext, useState } from "react"
import Context from '../../context';
import MyVerticallyCenteredModal from '../modal/modal';
import {useSnackbar , SnackbarProvider} from "notistack"
function BasicExample1({ title, description, file, sana , _id }) {
  const {enqueueSnackbar} = useSnackbar()
  const {server , admin  , setPosts  , deleteData} = useContext(Context)
  const [show, setShow] = useState(false)
  const [disablet , setDisaBLET] = useState(false)
  const deletePost = async ()=>{
    setDisaBLET(true)
      const res = await fetch(server+"post/"+_id , {
        method:"DELETE", 
        credentials:"include"
      })
      const deletePostData = await res.json()
      if(res.status !== 200) return snack("error" , deletePost.err)
      if(deletePostData.status === "succes"){
        setTimeout(() => {
          setPosts(prevState=>prevState.filter(posts=>posts._id !== _id))
          deleteData(prevState=>prevState.filter(posts=>posts._id !== _id))
        }, 2200);
        return snack("success" , "Post ochirildi")
      }
      snack("error" , deletePost.message)
  }

  const snack = (variant , message)=>{
    enqueueSnackbar({message , variant , anchorOrigin:{vertical:"top" , horizontal:"left"}})
  }

  const onHide = () => setShow(false)
  return (
    <Card style={{ width: '25rem', margin: 10 }}>
      <Card.Img variant="top" className="mt-2" src={server + "post/file/" + file}  width={"23rem"} height="200px"/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description.length > 50 ? description.slice(0, 50) + "..." : description}
        </Card.Text>
        <div className='d-flex justify-content-around align-items-center'>
          <Button variant="primary" onClick={() => setShow(true)}>Toliq ko'rish</Button>
          {admin && <Button variant="danger" disabled={disablet} onClick={deletePost}>Delete</Button>}
          
          <footer>{sana}</footer>
        </div>
        <MyVerticallyCenteredModal show={show} title={title} deck={description} url={server + "post/file/" + file} onHide={onHide} />
      </Card.Body>
    </Card>
  );
}
function BasicExample(props){
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
      <BasicExample1 {...props}/>
    </SnackbarProvider>
  )
}

export default BasicExample;