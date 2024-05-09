import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';
import Swal from 'sweetalert2'
import todoimg from '../image/todoimg.jpg'

function Login() {
  const [values,setValues]= useState({
    username:"",
    password:"",
  })

  const handleChange =(e)=>{
    setValues({...values,[e.target.name]:e.target.value})
  }
  let Todo = useNavigate();
  const click1 = (e) => {
    e.preventDefault()
    console.log(values);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Log in !",
      showConfirmButton: false,
      timer: 1500
    });
   
    Todo('/Todo')}
    sessionStorage.setItem("user",values.username)
   
  return (
    <div>
      <img src={todoimg} className='bgsetup' />
      <div className='bgtxt' >
        <Row>
        <Col xs={12} md={4}></Col>
        
        <Col xs={12} md={4}>
            
        <Card className='card1'>
          <Card.Header style={{textAlign:"center",fontFamily:"-moz-initial",fontSize:"30px"}}>TO DO Project</Card.Header>
        <Card.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={handleChange} type="text" name='username' placeholder="Enter email" />
        </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" onChange={handleChange} placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={click1} className='btnshadow' >
        Log in
      </Button>
    </Form>
    </Card.Body>
    </Card>
    </Col>
    <Col xs={12} md={4}></Col>
    <Col xs={12} md={3}></Col>
    </Row>
    </div>
    </div>
  )
}

export default Login
