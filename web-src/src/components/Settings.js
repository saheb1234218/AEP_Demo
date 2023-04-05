import React, { useState } from 'react'
import "./Form.css"
import { Item, ListView, Heading, Form, TextField, Checkbox, Button } from '@adobe/react-spectrum'
import axios from 'axios'


export default function Settings(props) {
    const [open, setOpen] = useState(false)
    const [fname,setFname]=useState("");
    const [lname,setLname]=useState("");
    const [email,setEmail]=useState("");
    const [ph,setPh]=useState("");




  return (
    <div className='d-flex flex-column w-100 justify-content-center align-items-center'>
      <Button id="back" alignSelf="flex-start" marginBottom="size-100" width="size-200" onPress={() => props.prev()} variant="accent">Back</Button>
      <Heading>Settings Form</Heading>
      

      <div className="w-100 d-flex flex-column justify-content-center align-items-center">
        <Form className="w-100">
          <div className=" d-flex flex-row justify-content-center gap-5">
            <TextField label="First Name" onChange={(e)=>setFname(e)} placeholder='Enter your first name' />
            <TextField label="Last Name" onChange={(e)=>setLname(e)}  placeholder='Enter your first name' />
          </div>
          <div className=" d-flex flex-row justify-content-center gap-5">
            <TextField label="Email" onChange={(e)=>setEmail(e)} placeholder='Enter your email' />
            <TextField label="Phone Number" onChange={(e)=>setPh(e)}  placeholder='Enter your phonenumber' />
          </div>

          <Button alignSelf="center" marginTop="size-300" width="size-500" onPress={() => {
            console.log(fname,lname,ph,email)
            setOpen(true)
          }} variant="accent">Submit</Button>
        </Form>
      </div>

      
          </div>


  )
}