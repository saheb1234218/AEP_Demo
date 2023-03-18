/*
* <license header>
*/

import React from 'react'
import { Heading, View } from '@adobe/react-spectrum'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';

export const Home = () => (
  <View width='size-6000'>
    <div role="grid">
    <MDBCard style={{width:'250px',textAlign:'center'}}>
      <MDBCardImage width={200} style={{height:'200px'}} src='https://yt3.ggpht.com/a/AGF-l79c3yXjA-ID1TRWFd71Pj4yUlOdXwoKAa4bQg=s900-c-k-c0xffffffff-no-rj-mo' position='top' alt='...' />
      <MDBCardBody>
        <MDBCardTitle style={{fontSize:'15px'}}>Adobe experince platform</MDBCardTitle>
        <MDBCardText>
          
        </MDBCardText>
        <MDBBtn color='dark'>
        Use Now
      </MDBBtn>
      </MDBCardBody>
    </MDBCard>
</div>
  </View>
)
