import { Col, Container, Row, Button} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { link } from '../../core/constants/link';
import { useNavigate } from 'react-router-dom';

function SubjectDetailComponent(){
    const navigation = useNavigate();

    const { subjectId: subjectId } = useParams();
    // const [subject, setSubject] = useState(null);
    
    const [isJoinedSubject, setIsJoinedSubject] = useState(true);
    const subject = {
        subjectId: subjectId,
        imgSrc: 'https://coreui.io/react/docs/static/react-83088efde08a5dedde9f67a954cb4b5b.jpg',
        title: 'Master of Computer Science in Data Science',
        institution: 'University of Illinois at Urbana-Champaign',
        degree: 'Degree'
    };

    useEffect( () => {
        //call api to get subject detail
        // setSubject(data);

        //call api to check enrolled subject? from joinedSubject table by userId
    }, [subjectId]);

    const handleNavigateSubject = () => {
        return isJoinedSubject 
            ? navigation(`${link.trainee}${link.traineeLearnSubject}/${subjectId}`)
            : navigation(`${link.trainee}${link.traineeLearnSubject}/${subjectId}`)
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
                    <h1>{subject.title}
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
                        <h3>$24,128 USD</h3>
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