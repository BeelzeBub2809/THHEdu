import { Container, Row, Col, Button } from 'react-bootstrap';
import CardVertical from '../../shared/components/card.vertical'

const subjects = [
    {
      subjectId: 1,
      imgSrc: 'https://coreui.io/react/docs/static/react-83088efde08a5dedde9f67a954cb4b5b.jpg',
      title: 'Master of Computer Science in Data Science',
      institutionName: 'University of Illinois at Urbana-Champaign',
      price: 100,
    },
    {
      subjectId: 2,
      imgSrc: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/b4/d31c1aa3be4c0aa4eae2e201426f7e/Coursera_UMDInformal_360x360.png?auto=format%2Ccompress&dpr=1&w=56px&h=56px&auto=format%2Ccompress&dpr=1',
      title: 'Master of Science in Computer Science',
      institutionName: 'University of Colorado Boulder',
    },
    {
      subjectId: 3,
      imgSrc: 'https://coreui.io/react/docs/static/react-83088efde08a5dedde9f67a954cb4b5b.jpg',
      title: 'Bachelor of Science in Computer Science',
      institutionName: 'University of London',
      price: 100,
    },
    {
      subjectId: 4,
      imgSrc: 'https://coreui.io/react/docs/static/react-83088efde08a5dedde9f67a954cb4b5b.jpg',
      title: 'Postgraduate Diploma in Applied Statistics',
      institutionName: 'Indian Statistical Institute',
    }
];
  
function MySubjectComponent(){
    return (
        <Container>
            <h2>My enrolled subjects</h2>
            <Row>
                {subjects.map((subject, index) => (
                    <Col key={index} md={3} className="mb-4 m-auto">
                        <CardVertical {...subject} textButton={'Go to subject'}/>
                    </Col>
                ))}
            </Row>
            <Button variant="primary">Show 8 more</Button>
        </Container>
    )
}

export default MySubjectComponent;