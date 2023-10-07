import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Card from 'react-bootstrap/Card'; // Import Bootstrap Card component
import Container from 'react-bootstrap/Container';
import { Row,Col } from 'react-bootstrap';

function About() {
  return (
    <div>
        <Container>
        
        <div className="d-flex justify-content-center">
      <Card
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0)',
          color: 'white',
          padding: '20px',
          marginLeft: '100', // Align the card to the left
          marginRight: '100', 
          width:"500px"
        }}
      >
        <Card.Body>
          <Card.Text>
          <h1><center>ABOUT US </center></h1>
            Ford is a family company, one that spans the globe and has shared ideals.
            We value service to each other and the world as much as to our customers.
            Generations have made their memories with us and included us in their
            hopes and dreams. After 120 years, we’re used to adapting to and leading
            change. That’s why we’re evolving to focus on services, experiences,
            and software as well as vehicles.<br></br>
          </Card.Text>
        </Card.Body>
      </Card>
      </div>

      <Row>
  <Col md={6}>
    <Card
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: 'white',
        padding: '20px',
        width: '100%', // Set the card width to 100%
        border: 'none', // Remove card border if needed
      }}
    >
      <Card.Body>
        <Card.Text>
          <h1 style={{ textAlign: 'center' }}>OUR PURPOSE</h1>
          We believe in the power of creating a world with fewer obstacles and limits,
          where people have the freedom to build a better life and pursue their dreams.
          To shorten the distance between where you are and where you want to go.
          To connect people down the road and over the horizon — to discover possibilities,
          and enjoy the thrill, adventure, and pride of moving freely.
          From day one, we've provided people with tools to help them move forward and upward.
          We've innovated to expand their opportunities.
          And we've worked to earn their trust, every single day.
          We honor our legacy as we build the future – a better world for generations to come.
          Because when everyone is free to move, and free to dream, we do what we do best: we change the world.
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
  <Col md={6}>
    <Card>
      <Card.Img
        variant="top"
        src="assets/img/fordabtus1.jpeg"
        style={{ width: '100%' }} // Adjust image size to fit the card
      />
    </Card>
  </Col>
</Row>


      <Row>
      <Col md={6}>
    <Card>
      <Card.Img
        variant="top"
        src="assets\img\fordabts3.jpeg"
        style={{ width: '100%' }} // Adjust image size to fit the card
      />
    </Card>
  </Col>
      <Card
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0)',
          color: 'white',
          padding: '20px',
          marginLeft: '100', // Align the card to the left
          marginRight: '100', 
          width:"500px"
        }}
      >
        <Card.Body>

          <Card.Text>
          <h1><center> OUR HISTORY </center></h1>
          Henry Ford transformed not only the automobile but working life and the role of transportation.<br></br> 
          Having played our part in everything from the birth of the middle class to the recent global pandemic,<br></br> 
          we serve the world with integrity and competence.<br></br>
          The Blue Oval is one of the most recognized corporate symbols in history, continually striving to earn the trust of all stakeholders.


          </Card.Text>
        
        </Card.Body>
      </Card>
      </Row>
    <Row>
      <Card
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0)',
          color: 'white',
          padding: '20px',
          marginLeft: '100', // Align the card to the left
          marginRight: '100', 
          width:"500px"
        }}
      >
        <Card.Body>
          <Card.Text>
          <h1><center> OUR LEADERSHIP </center></h1>
          With the people of Ford around the world, our leadership is committed to serving all of our stakeholder groups.<br></br>
        Like generations of leaders before them, they understand that by helping to create a world with fewer obstacles and limits,<br></br>
           we help people to move forward and upward.


          </Card.Text>
        </Card.Body>
      </Card>
      <Col md={7}>
    <Card>
      <Card.Img
        variant="top"
        src="assets\img\fordabts4.jpeg"
        style={{ width: '100%' }} // Adjust image size to fit the card
      />
    </Card>
  </Col>
      
      </Row>
      </Container>
    </div>
  );
}

export default About;
