import { Col, Container, Row, Button} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { link } from '../../core/constants/link';
import { useNavigate } from 'react-router-dom';
import { SubjectService } from '../../core/services/subject.service';

function SubjectDetailComponent(){
    const navigation = useNavigate();
    const location = useLocation();
    const { subjectId } = useParams();
    // const [subject, setSubject] = useState(null);
    const [subjectDetail, setSubjectDetail] = useState('');
    const [isJoinedSubject, setIsJoinedSubject] = useState(true);
    const queryParams = new URLSearchParams(location.search);
    const price = queryParams.get('price');
    const [listSubjects, setListSubjects] = useState([])
    const subject = {
        subjectId: subjectId,
        imgSrc: 'https://coreui.io/react/docs/static/react-83088efde08a5dedde9f67a954cb4b5b.jpg',
        title: 'Master of Computer Science in Data Science',
        institution: 'University of Illinois at Urbana-Champaign',
        degree: 'Degree'
    };

    useEffect( () => {
        async function fetchSubject(){
            try {
                const dataSubjectDetail = await SubjectService.getDetailSubject(subjectId);
                setSubjectDetail(dataSubjectDetail);
                const traineeId = JSON.parse(localStorage.getItem('userId')) || ''
                let response = await fetch(`http://localhost:9999/trainee/joinedSubject/get-by-id/${traineeId}`, {
                    method: 'GET',
                    credentials: 'include'
                })
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Network response was not ok')
                }
                const data = await response.json();
                const list = data.map(item => item.subject);
                setListSubjects(list);
                console.log(price);
                // Update isJoinedSubject based on updated listSubjects
                if (price != 0) {
                    setIsJoinedSubject(list.includes(subjectId));
                } else {
                    setIsJoinedSubject(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSubject();
    }, []);

    const handleNavigateSubject = async () => {
        if(isJoinedSubject) {
            navigation(`${link.trainee}${link.traineeLearnSubject}/${subjectId}`)
        }else {
            try {
                const traineeId = JSON.parse(localStorage.getItem('userId')) || ''
                let response = await fetch('http://localhost:9999/payment/create-payment-link', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amount: price,
                        userId : traineeId,
                        subjectId: subjectId
                    }),
                    credentials: 'include'
                })
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Network response was not ok')
                }
                const data = await response.json()
                if(data) {
                    window.location.href = data.payUrl
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    return (
        <Container>
            <Row>
                <div
                    className='text-white text-center d-flex align-items-center justify-content-center'
                    style={{
                        height: '100%',
                        backgroundImage: `url(${subject.imgSrc})`,
                        background: `url(${subject.imgSrc})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        minHeight: subject.title ? '120px' : '200px',
                        fontWeight: '400',
                        fontSize: '32px',
                        color: 'white',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <h1> {subjectDetail.subjectName}
                        <h4>{subject.institution}</h4>
                    </h1>
                </div>
            </Row>
            <Row style = {{ padding: '40px', width: '80%', backgroundColor: 'white', marginTop: 40}}>
                <Row>
                    <Col className= {styles.center}
                        style = {{ flexDirection: 'column', height: '100%'}}>
                        <h3>Finish in 12-36 months</h3>
                        <h6>8 courses total, 10-12 hours per week</h6>
                    </Col>
                    <Col className={styles.center}
                        style = {{ flexDirection: 'column'}}>
                        <h3>$ {subjectDetail.price} USD</h3>
                        <h6>Competitively priced with pay-as-you-go tuition</h6>
                    </Col>
                </Row>
                <Row style = {{ marginTop: 40}}>
                    <Row>
                        <Col className={styles.center}>
                            <Button
                                onClick={() => handleNavigateSubject()}
                            >{ isJoinedSubject ? 'Go to subject' : 'Buy the subject'}</Button>
                        </Col>
                    </Row>
                    
                    <Row style = {{ marginTop: 40}}>
                        <div>
                            <h2>Master cutting-edge programming skills and prepare for a high-growth tech career</h2>
                            <span>Whether you’re just beginning your technology journey, or returning to education to change or advance your career, the University of London’s online Computer Science degree will give you all the tools you need to thrive in this ever-changing field.
                                During this course, you’ll master sought-after programming, mathematical and computing skills through practical project-based modules. You’ll choose a learning path to focus on IT career specialisms such as Data Science, Web and Mobile Development, or Machine Learning and AI. Along with the same applied computing knowledge and expertise you’d receive from studying on-campus, you’ll gain job-ready transferable professional skills, allowing you to solve problems and manage tech projects in almost any industry, including business, finance, education, science, and engineering.
                                Learning to use a range of programming languages, including Python and C++, you’ll position yourself for a range of exciting roles in an industry that’s expected to grow by 15% this decade (the US). What’s in this degree program?</span>
                        </div>
                        
                        <Row style={{marginTop:'40px'}} >
                            <Col className='sm-8'>
                                <h2>Overview</h2>
                                <li>Chapter 1</li>
                                <li>Chapter 2</li>
                                <li>Chapter 3</li>
                                <li>Chapter 4</li>
                            </Col>
                            
                            <Col className='lg-4'>
                                <h2>Experienced trainer</h2>
                                <span>
                                    NTH
                                    TTH
                                    NAT
                                </span>
                            </Col>
                        </Row>
                    </Row>
                </Row>
            </Row>
        </Container>
    )
}

const styles = {
    center : 'text-center d-flex align-items-center justify-content-center'
}

export default SubjectDetailComponent;