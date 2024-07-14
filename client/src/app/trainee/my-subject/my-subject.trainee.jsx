import { Container, Row, Col, Button } from 'react-bootstrap';
import CardVertical from '../../shared/components/card.vertical'
import React, { useState, useEffect } from 'react';
import { SubjectService } from '../../core/services/subject.service';

function MySubjectComponent(){
    const [subjects, setSubjects] = useState([]);

    useEffect( () => {
        async function fetchSubject(){
            const subjectFetch = await SubjectService.getAllSubjects();
            if (Array.isArray(subjectFetch.subjects)) {
                setSubjects(subjectFetch.subjects);
                if (subjectFetch.subjects.length > 0) {
                    setSubjects(subjectFetch.subjects);
                }
            } else {
                setSubjects([]);
            }
        }
        fetchSubject();
    },[]);
    

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