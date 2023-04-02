/*
* <license header>
*/

import React, { useState } from 'react'
import { Heading, View } from '@adobe/react-spectrum'
import { Form, TextField, Checkbox } from '@adobe/react-spectrum'
import FormShow from "./Form.jsx";
import axios from "axios";
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
    "name": "Adobe Experience Platform",
    "image": "https://yt3.ggpht.com/a/AGF-l79c3yXjA-ID1TRWFd71Pj4yUlOdXwoKAa4bQg=s900-c-k-c0xffffffff-no-rj-mo"
  },
  {
    "name": "Settings",
    "image": "https://i.pinimg.com/736x/27/8e/aa/278eaa134a686ab147b49a5cf6c3d4f9.jpg"
  },
  ]
  const [show, setShow] = useState(false)
   

  
   
  return (
    <View width='size-10000'>
      <div role="grid" className='d-flex'>
        {show ? <FormShow prev={()=>setShow(false)}/> : <>
          {
            cardData.map(x => {
              return (
                <MDBCard style={{ width: '250px', textAlign: 'center', marginRight: '70px' }}>
                  <MDBCardImage width={200} style={{ height: '200px' }} src={x.image} position='top' alt='...' />
                  <MDBCardBody>
                    <MDBCardTitle style={{ fontSize: '15px' }}>{x.name}</MDBCardTitle>
                    <MDBCardText>

                    </MDBCardText>
                    <MDBBtn color='dark' onClick={() => setShow(true)}>
                      Use Now
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
