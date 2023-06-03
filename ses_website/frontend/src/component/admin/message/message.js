import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function WithHeaderExample({message , tell , view ,fullName}) {
  return (
    <Card className='mt-2'>
      <Card.Header>Message {!view && <span style={{color:'red'}}>new</span>}</Card.Header>
      <Card.Body>
        <Card.Title>{fullName}</Card.Title>
        <Card.Text>
          {message}
        </Card.Text>
        <div className='w-100 d-flex justify-content-end'>
            <a href={"tel:"+tell}>
                <Button variant="primary">telefon qilish</Button>
            </a>
        </div>
      </Card.Body>
    </Card>
  );
}

export default WithHeaderExample;