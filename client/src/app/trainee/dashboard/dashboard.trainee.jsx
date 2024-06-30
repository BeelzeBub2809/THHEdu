import './css/dashboard.trainee.css'
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
  
const popularCertificates = [
    {
      imgSrc: 'link_to_image',
      title: 'Certificate 1',
      institution: 'IBM'
    },
    {
      imgSrc: 'link_to_image',
      title: 'Certificate 2',
      institution: 'IBM'
    },
    {
      imgSrc: 'link_to_image',
      title: 'Certificate 3',
      institution: 'IBM'
    },
    {
      imgSrc: 'link_to_image',
      title: 'Certificate 4',
      institution: 'IBM'
    }
];
  
const CertificateCard = ({ imgSrc, title, institution }) => (
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={imgSrc} />
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{institution}</Card.Text>
        </Card.Body>
    </Card>
);


function DashboardTraineePage(){
    return (
        <Container>
            <h2>Most popular subjects</h2>
            <Row>
                {subjects.map((subject, index) => (
                    <Col key={index} md={3} className="mb-4" style = {{margin: 'auto'}}>
                        <CardVertical {...subject} textButton={'Enroll'} />
                    </Col>
                ))}
            </Row>

            <h2>Paid subjects</h2>
            <Row>
                {subjects.map((subject, index) => (
                    <Col key={index} md={3} className="mb-4" style = {{margin: 'auto'}}>
                        <CardVertical {...subject} textButton={'Enroll'} />
                    </Col>
                ))}
            </Row>

            {/* <div class="row container-xxl py-5">
                <div class="container">
                    <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: 600}}>
                        <h1 class="mb-3">School Classes</h1>
                        <p>Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
                    </div>
                    <div class="row g-4">
                        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div class="classes-item">
                                <div class="bg-light rounded-circle w-75 mx-auto p-3">
                                    <img class="img-fluid rounded-circle" src="http://127.0.0.1:5500/img/classes-6.jpg" alt=""/>
                                </div>
                                <div class="bg-light rounded p-4 pt-5 mt-n5">
                                    <a class="d-block text-center h3 mt-3 mb-4" href="">Art & Drawing</a>
                                    <div class="d-flex align-items-center justify-content-between mb-4">
                                        <div class="d-flex align-items-center">
                                            <img class="rounded-circle flex-shrink-0" src="http://127.0.0.1:5500/img/classes-6.jpg" alt="" style={{width: 45, height: 45}}/>
                                            <div class="ms-3">
                                                <h6 class="text-primary mb-1">Jhon Doe</h6>
                                                <small>Teacher</small>
                                            </div>
                                        </div>
                                        <span class="bg-primary text-white rounded-pill py-2 px-3" href="">$99</span>
                                    </div>
                                    <div class="row g-1">
                                        <div class="col-4">
                                            <div class="border-top border-3 border-primary pt-2">
                                                <h6 class="text-primary mb-1">Age:</h6>
                                                <small>3-5 Years</small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="border-top border-3 border-success pt-2">
                                                <h6 class="text-success mb-1">Time:</h6>
                                                <small>9-10 AM</small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="border-top border-3 border-warning pt-2">
                                                <h6 class="text-warning mb-1">Capacity:</h6>
                                                <small>30 Kids</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div class="classes-item">
                                <div class="bg-light rounded-circle w-75 mx-auto p-3">
                                    <img class="img-fluid rounded-circle" src="img/classes-2.jpg" alt=""/>
                                </div>
                                <div class="bg-light rounded p-4 pt-5 mt-n5">
                                    <a class="d-block text-center h3 mt-3 mb-4" href="">Color Management</a>
                                    <div class="d-flex align-items-center justify-content-between mb-4">
                                        <div class="d-flex align-items-center">
                                            <img class="rounded-circle flex-shrink-0" src="img/user.jpg" alt="" style={{width: 45, height: 45}}/>
                                            <div class="ms-3">
                                                <h6 class="text-primary mb-1">Jhon Doe</h6>
                                                <small>Teacher</small>
                                            </div>
                                        </div>
                                        <span class="bg-primary text-white rounded-pill py-2 px-3" href="">$99</span>
                                    </div>
                                    <div class="row g-1">
                                        <div class="col-4">
                                            <div class="border-top border-3 border-primary pt-2">
                                                <h6 class="text-primary mb-1">Age:</h6>
                                                <small>3-5 Years</small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="border-top border-3 border-success pt-2">
                                                <h6 class="text-success mb-1">Time:</h6>
                                                <small>9-10 AM</small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="border-top border-3 border-warning pt-2">
                                                <h6 class="text-warning mb-1">Capacity:</h6>
                                                <small>30 Kids</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div class="classes-item">
                                <div class="bg-light rounded-circle w-75 mx-auto p-3">
                                    <img class="img-fluid rounded-circle" src="img/classes-3.jpg" alt=""/>
                                </div>
                                <div class="bg-light rounded p-4 pt-5 mt-n5">
                                    <a class="d-block text-center h3 mt-3 mb-4" href="">Athletic & Dance</a>
                                    <div class="d-flex align-items-center justify-content-between mb-4">
                                        <div class="d-flex align-items-center">
                                            <img class="rounded-circle flex-shrink-0" src="img/user.jpg" alt="" style={{width: 45, height: 45}}/>
                                            <div class="ms-3">
                                                <h6 class="text-primary mb-1">Jhon Doe</h6>
                                                <small>Teacher</small>
                                            </div>
                                        </div>
                                        <span class="bg-primary text-white rounded-pill py-2 px-3" href="">$99</span>
                                    </div>
                                    <div class="row g-1">
                                        <div class="col-4">
                                            <div class="border-top border-3 border-primary pt-2">
                                                <h6 class="text-primary mb-1">Age:</h6>
                                                <small>3-5 Years</small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="border-top border-3 border-success pt-2">
                                                <h6 class="text-success mb-1">Time:</h6>
                                                <small>9-10 AM</small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="border-top border-3 border-warning pt-2">
                                                <h6 class="text-warning mb-1">Capacity:</h6>
                                                <small>30 Kids</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div class="classes-item">
                                <div class="bg-light rounded-circle w-75 mx-auto p-3">
                                    <img class="img-fluid rounded-circle" src="img/classes-4.jpg" alt=""/>
                                </div>
                                <div class="bg-light rounded p-4 pt-5 mt-n5">
                                    <a class="d-block text-center h3 mt-3 mb-4" href="">Language & Speaking</a>
                                    <div class="d-flex align-items-center justify-content-between mb-4">
                                        <div class="d-flex align-items-center">
                                            <img class="rounded-circle flex-shrink-0" src="img/user.jpg" alt="" style={{width: 45, height: 45}}/>
                                            <div class="ms-3">
                                                <h6 class="text-primary mb-1">Jhon Doe</h6>
                                                <small>Teacher</small>
                                            </div>
                                        </div>
                                        <span class="bg-primary text-white rounded-pill py-2 px-3" href="">$99</span>
                                    </div>
                                    <div class="row g-1">
                                        <div class="col-4">
                                            <div class="border-top border-3 border-primary pt-2">
                                                <h6 class="text-primary mb-1">Age:</h6>
                                                <small>3-5 Years</small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="border-top border-3 border-success pt-2">
                                                <h6 class="text-success mb-1">Time:</h6>
                                                <small>9-10 AM</small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="border-top border-3 border-warning pt-2">
                                                <h6 class="text-warning mb-1">Capacity:</h6>
                                                <small>30 Kids</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div class="classes-item">
                                <div class="bg-light rounded-circle w-75 mx-auto p-3">
                                    <img class="img-fluid rounded-circle" src="img/classes-5.jpg" alt=""/>
                                </div>
                                <div class="bg-light rounded p-4 pt-5 mt-n5">
                                    <a class="d-block text-center h3 mt-3 mb-4" href="">Religion & History</a>
                                    <div class="d-flex align-items-center justify-content-between mb-4">
                                        <div class="d-flex align-items-center">
                                            <img class="rounded-circle flex-shrink-0" src="img/user.jpg" alt="" style={{width: 45, height: 45}}/>
                                            <div class="ms-3">
                                                <h6 class="text-primary mb-1">Jhon Doe</h6>
                                                <small>Teacher</small>
                                            </div>
                                        </div>
                                        <span class="bg-primary text-white rounded-pill py-2 px-3" href="">$99</span>
                                    </div>
                                    <div class="row g-1">
                                        <div class="col-4">
                                            <div class="border-top border-3 border-primary pt-2">
                                                <h6 class="text-primary mb-1">Age:</h6>
                                                <small>3-5 Years</small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="border-top border-3 border-success pt-2">
                                                <h6 class="text-success mb-1">Time:</h6>
                                                <small>9-10 AM</small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="border-top border-3 border-warning pt-2">
                                                <h6 class="text-warning mb-1">Capacity:</h6>
                                                <small>30 Kids</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div class="classes-item">
                                <div class="bg-light rounded-circle w-75 mx-auto p-3">
                                    <img class="img-fluid rounded-circle" src="img/classes-6.jpg" alt=""/>
                                </div>
                                <div class="bg-light rounded p-4 pt-5 mt-n5">
                                    <a class="d-block text-center h3 mt-3 mb-4" href="">General Knowledge</a>
                                    <div class="d-flex align-items-center justify-content-between mb-4">
                                        <div class="d-flex align-items-center">
                                            <img class="rounded-circle flex-shrink-0" src="img/user.jpg" alt="" style={{width: 45, height: 45}}/>
                                            <div class="ms-3">
                                                <h6 class="text-primary mb-1">Jhon Doe</h6>
                                                <small>Teacher</small>
                                            </div>
                                        </div>
                                        <span class="bg-primary text-white rounded-pill py-2 px-3" href="">$99</span>
                                    </div>
                                    <div class="row g-1">
                                        <div class="col-4">
                                            <div class="border-top border-3 border-primary pt-2">
                                                <h6 class="text-primary mb-1">Age:</h6>
                                                <small>3-5 Years</small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="border-top border-3 border-success pt-2">
                                                <h6 class="text-success mb-1">Time:</h6>
                                                <small>9-10 AM</small>
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div class="border-top border-3 border-warning pt-2">
                                                <h6 class="text-warning mb-1">Capacity:</h6>
                                                <small>30 Kids</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <Button variant="primary">Show 8 more</Button>
        
            {/* <h2>Most Popular Certificates</h2>
            <Row>
                {popularCertificates.map((certificate, index) => (
                    <Col key={index} md={3}>
                        <CertificateCard {...certificate} />
                    </Col>
                ))}
            </Row> */}

            
        </Container>
    )
}

export default DashboardTraineePage;