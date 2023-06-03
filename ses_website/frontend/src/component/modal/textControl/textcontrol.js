import Form from 'react-bootstrap/Form';

function TextControlsExample({setMessage1}) {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Ismingiz</Form.Label>
        <Form.Control type="text" placeholder="your name" onInput={({target})=>{setMessage1("fullName" , target.value)}} />
        <Form.Label>Telefon raqam</Form.Label>
        <Form.Control type="text" placeholder="tell number" onInput={({target})=>{setMessage1("tell" , target.value)}} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Murojat matni</Form.Label>
        <Form.Control as="textarea" rows={3} onInput={({target})=>{setMessage1("message" , target.value)}}/>
      </Form.Group>
    </Form>
  );
}

export default TextControlsExample;