import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import CardVertical from '../../shared/components/card.vertical'

const subjects = [
    {
      imgSrc: 'https://coreui.io/react/docs/static/react-83088efde08a5dedde9f67a954cb4b5b.jpg',
      title: 'Master of Computer Science in Data Science',
      institution: 'University of Illinois at Urbana-Champaign',
      degree: 'Degree'
    },
    {
      imgSrc: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/b4/d31c1aa3be4c0aa4eae2e201426f7e/Coursera_UMDInformal_360x360.png?auto=format%2Ccompress&dpr=1&w=56px&h=56px&auto=format%2Ccompress&dpr=1',
      title: 'Master of Science in Computer Science',
      institution: 'University of Colorado Boulder',
      degree: 'Degree'
    },
    {
      imgSrc: 'https://coreui.io/react/docs/static/react-83088efde08a5dedde9f67a954cb4b5b.jpg',
      title: 'Bachelor of Science in Computer Science',
      institution: 'University of London',
      degree: 'Degree'
    },
    {
      imgSrc: 'https://coreui.io/react/docs/static/react-83088efde08a5dedde9f67a954cb4b5b.jpg',
      title: 'Postgraduate Diploma in Applied Statistics',
      institution: 'Indian Statistical Institute',
      degree: 'Degree'
    }
];
  
function MySubjectComponent(){
    return (
        <Container>
            <h2>Most popular subjects</h2>
            <Row>
                {subjects.map((subject, index) => (
                    <Col key={index} md={3} className="mb-4" style = {{margin: 'auto'}}>
                        <CardVertical {...subject} textButton={'Go to subject'} />
                    </Col>
                ))}
            </Row>
            <Button variant="primary">Show 8 more</Button>
        </Container>
    )
}

export default MySubjectComponent;