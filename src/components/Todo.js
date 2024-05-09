import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { RiShutDownLine } from "react-icons/ri";
import { Button, Form, Row, Col, Card, Navbar, Container } from 'react-bootstrap';
import { CiEdit } from "react-icons/ci";
import { ImBin } from "react-icons/im";
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';



function Todo() {
  const customStyles = {
    rows: {
        style: {
            minHeight: '72px', 
            // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            background:'lightgreen',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
};
  let logout = useNavigate();
  const click2 = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Log Out Successfully",
      showConfirmButton: false,
      timer: 1500
    });
    logout('/')}
  
  const columns = [
    {
        name:'Category ID',
        selector: (row) => row.categoryId,
        sortable:true,
    },
    {
        name:'Category',
        selector: (row) => row.category,
        sortable:true,
    },
    {
        name:'Description',
        selector: (row) => row.description,
        sortable:true,
    },
    {
        name:'Created By',
        selector: (row) => row.createdBy,
        sortable:true,
    },
    {
      name:'Edit', 
      cell: (row) =>
    (<div>
      <Button  onClick={() =>{handleUpdate(row)}} variant='success'><CiEdit /></Button>&nbsp;
      <Button  onClick={() =>{handleDelete(row.categoryId)}} variant='danger'> <ImBin /></Button></div>),
     
  },


  ]
  const[savebtn,setSavebtn]= useState('Save')
  const[isedit,setIsedit]= useState(false)


    const [input,setInput]=useState({
        categoryId:'',
        createdBy:'',
        category:'',
        description:'',
        
    });
    const [ records, setRecords] = useState([])
    const axiosData = () => {
    axios.get('http://catodotest.elevadosoftwares.com/Category/GetAllCategories')
    .then ((res) =>{
      setRecords(res.data.categoryList)
    })
  

    }
  const handleCancel=() =>{
   setInput({
    category:'',
   description:'',}) 
   }
   const handleUpdate = (row) => {
    setInput({
        createdBy: row.createdBy,
        categoryId: row.categoryId,
        category: row.category,
        description: row.description
    });
    setSavebtn("Update")
    setIsedit(true)
}
    const handleDelete = (value) =>{
      let id = value
      console.log(id);
     // setInput(...input,id)
     Swal.fire({
      title: "Do you want to delete?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
      input: "textarea",
      inputLabel: "Why?",
      
    }).then((result) => {
      
      if (result.isConfirmed) {

        let msg = result.value;
        let data = {
          categoryId:id,
          removedRemarks:msg
}
        axios.post('http://catodotest.elevadosoftwares.com/Category/RemoveCategory',data)
        axiosData();
        Swal.fire("Deleted!", "", "success");
      }
      
   if (result.isDenied) {
        Swal.fire(" not deleted", "", "info");
      }
    } )
    }
   
      const handleChange = (e) =>{
          setInput((prev) =>({
          ...prev,[e.target.name]:e.target.value
        }))
      }

      const handleSave=(e) =>{
        e.preventDefault()
        console.log(input)
       
        const data = {
          id:0,
          category:input.category,
          description:input.description,
          createdBy:0,
          
        }
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            axios.post('http://catodotest.elevadosoftwares.com/Category/InsertCategory',data)
              .then((res) =>{
              axiosData()        
              console.log(res.data);
              handleCancel();
              

    
    })
         Swal.fire("Saved!", "", "success");
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
            handleCancel();
          }
        });



      }
    const handleSubmit = (e) => {
      e.preventDefault()

      if(isedit){
        handleEdited(e)

      }
        else{
          handleSave(e)
        }   
    }

    const handleEdited= (e) =>{
        e.preventDefault()
        console.log(input)
       
        const data = {
          categoryId:input.categoryId,
          category:input.category,
          description:input.description,
          createdBy:input.createdBy, 
        }
        Swal.fire({
          title: "Do you want to update the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Update",
          denyButtonText: `Don't update`
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            axios.post('http://catodotest.elevadosoftwares.com/Category/InsertCategory',data)
              .then((res) =>{
              axiosData()        
              console.log(res.data);
              handleCancel();
    
    })
            Swal.fire("Updated!", "", "success");
          } else if (result.isDenied) {
            Swal.fire("Changes are not updated", "", "info");
            handleCancel();
            handleSubmit();
           

          }
        });
    }
   
  
    useEffect(() => {
        axiosData();
        console.log(records)
    },[])

  return (
    <div style={{backgroundColor:"lightcyan"}}>
       <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand style={{fontSize:"35px", fontFamily:"-moz-initial"}}>Welcome {sessionStorage.getItem("user")}</Navbar.Brand>
        
        <Button className='btnsha' variant="danger" onClick={click2}><RiShutDownLine /></Button>
      </Container>
    </Navbar>
    <br />
    <Row>
    <Col xs={12} md={3}></Col>
    
    <Col xs={12} md={6}>
      <Card className='cardtodo'>
      <Card.Body>
      <Form style={{fontFamily:"cursive"}}>
        
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Category</Form.Label>
        <Form.Control type="category" placeholder="Enter category"
        name='category'
        value={input.category}
        onChange={(e) =>{handleChange(e)}} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Description</Form.Label>
        <Form.Control type="description" placeholder="Enter description"
        name='description'
        value={input.description}
        onChange={(e) =>{handleChange(e)}} />
      </Form.Group>
      </Form>
      <Button variant="success" type="submit" className='btnshadow' style={{marginLeft:"43%"}} onClick={(e)=>{handleSubmit(e)}}>{savebtn}</Button>
      </Card.Body>
      </Card>
      </Col>
      <Col xs={12} md={3}></Col>
      </Row>
      <br />




    
    <DataTable
    columns={columns}
    data={records}
    customStyles={customStyles}
    fixedHeader
    selectableRows
    selectableRowsHighlight
    highlightOnHover
    pagination
    
    />
    




      
    </div>
    
    
   

    
  )
}
export default Todo
