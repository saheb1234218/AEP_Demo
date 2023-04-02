import React,{useState} from 'react'
import "./Form.css"
import { Heading,Form,TextField,Checkbox ,Button} from '@adobe/react-spectrum'


export default function showForm(props) {
  const [open,setOpen]=useState(false)

  return (
    <div className='d-flex flex-column w-100'>
      <Button marginBottom="size-100" width="size-200" onClick={()=>props.prev() } variant="accent">Back</Button>
      <Heading>PEGA Configuration Form</Heading>
      
      <div className="w-50">
      <Form className="w-50">
  <TextField label="First Name"  />
  <TextField label="Last Name" />
  <TextField label="Email" />
  <TextField label="Phone Number" />
  <Button marginTop="size-300" width="size-500" onClick={()=>setOpen(true)} variant="accent">Submit</Button>
</Form>
      </div>
      
    {/* <form className='w-75 p-5 pt-0'>
    <button onClick={()=>props.prev()} type="submit" class="btn btn-primary mb-3">Back</button>
        <Heading>PEGA Configuration Form</Heading>
        <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">First Name</label>
    <input type="text" class="form-control" id="fName" placeholder='Enter your first Name'/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Last Name</label>
    <input type="text" class="form-control" id="lName" placeholder='Enter your last Name'/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" placeholder='Enter your Email'/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Phone Number</label>
    <input type="tel" class="form-control" id="phoneNo" placeholder='Enter your PhoneNumber'/>
  </div>
  
  <button onClick={()=>setOpen(true)} type="submit" class="btn btn-primary">Submit</button>
</form> */}
{open?<><hr></hr>
<div className="row p-5 pt-0">
  <div className="col-sm-6 d-flex flex-column justify-content-center ">
    <h4>Internal Information</h4>
    
    <ul style={{listStyle:'none'}}>
      <li>Apurba</li>
      <li>Ganguly</li>
      <li>Asansol</li>
      <li>7001365857</li>
    </ul>
  </div>
  <div className="col-sm-6 d-flex flex-column justify-content-center ">
    <h4>Personal Details</h4>
    
    <ul style={{listStyle:'none'}}>
      <li>Cts</li>
      <li>EAS Adobe</li>
      <li>AEP</li>
      <li>C1 7th Floor</li>
    </ul>
  </div>
</div></>:null}
    </div>
    
    
  )
}
