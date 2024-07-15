import { Container, Row, Col, Button } from 'react-bootstrap';
import CardVertical from '../../shared/components/card.vertical'
import React, { useState, useEffect } from 'react';
import { SubjectService } from '../../core/services/subject.service';

function MySubjectComponent(){
    const [subjects, setSubjects] = useState([]);
    const hasSubjects = (subjects && subjects.length > 0);
    
    useEffect(() => {
        async function fetchSubject() {
            try {
                async function fetchSubject() {
                    try {
                        let userId = JSON.parse(localStorage.getItem('userId')) || '';
                        let response = await fetch(`http://localhost:9999/trainee/joinedSubject/get-by-id/${userId}`, {
                            method: 'GET',
                            credentials: 'include'
                        });
        
                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(errorData.message || 'Network response was not ok');
                        }
        
                        const data = await response.json()
                        const allSubjectIds = data.flatMap(item => item.subjectId);
                        const subjectsData = await Promise.all(allSubjectIds.map(async (id) => {
                            let response2 = await fetch(`http://localhost:9999/subject/${id}`, {
                                method: 'GET',
                                credentials: 'include'
                            });
        
                            if (!response2.ok) {
                                const errorData2 = await response2.json();
                                throw new Error(errorData2.message || 'Network response was not ok');
                            }
        
                            return await response2.json();
                        }));
        
                        setSubjects(subjectsData);
                    } catch (error) {
                        console.error('Error fetching subjects:', error);
                    }
                }
        
                fetchSubject();
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        }

        fetchSubject();
    }, []);
    

    return (
        <Container>
            <h2>My enrolled subjects</h2>
            {hasSubjects ? (
                <Row>
                    {subjects.map((subject, index) => (
                        <Col key={index} md={3} className="mb-4 m-auto">
                            <CardVertical {...subject} textButton={'Go to subject'} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <p>No subjects enrolled yet.</p>
            )}
            <Button variant="primary">Show 8 more</Button>
        </Container>
    )
}

export default MySubjectComponent;