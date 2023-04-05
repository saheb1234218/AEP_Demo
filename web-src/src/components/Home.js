
import set from "./images/settings.jpg";
import user from "./images/user.png"

import React, { useState } from 'react'
import { Heading, View } from '@adobe/react-spectrum'
import { Form, TextField, Checkbox } from '@adobe/react-spectrum'
import FormShow from "./Form.jsx";
import axios from "axios";
import Settings from './Settings';

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';

   



export const Home = () => {
  const cardData = [{
    "name": "Profiles",
    "image": user
  },
  {
    "name": "Settings",
    "image": set
  },
  ]
  const [show, setShow] = useState(false)
  const [nameform,setNameform]=useState("");
   

  
   
  return (
    <View width='size-10000'>
      <div role="grid" className='d-flex m-5 p-5'>
        {show ? <>
          {nameform=="Profiles"?<FormShow prev={()=>setShow(false)}/>:<Settings prev={()=>setShow(false)}/>}
        </>  : <>
          {
            cardData.map(x => {
              return (
                <MDBCard style={{ width: '220px', textAlign: 'center', marginRight: '70px' }}>
                  <MDBCardImage width={150} style={{ height: '200px' }} src={x.image} position='top' alt='...' />
                  <MDBCardBody>
                    <MDBCardText>

                    </MDBCardText>
                    <MDBBtn color='dark' onClick={() => {
                      setNameform(x.name)
                      setShow(true)}}>
                      {x.name}
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              )

            })}
        </>
        }
      </div>

    </View>
  )
}
  
export default Home;