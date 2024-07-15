import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { link } from "../../core/constants/link"; 
export default function CardVertical({ imgSrc, title, subjectName, price, textButton, _id: subjectId}){
    const handleAddJoinedSubject = async (subject,action)  => {
        const traineeId = JSON.parse(localStorage.getItem('userId')) || ''
        const formData = {
            traineeId: traineeId,
            subjectId: subjectId
        }
        let response = await fetch('http://localhost:9999/trainee/joinedSubject/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Network response was not ok')
            }
        const data = await response.json()
        console.log(data);
    }
    return (
            <Card style={{ width: '18rem', height: '100%', margin: 20}}>
                <div style={{ width: '100%', height: '180px', overflow: 'hidden' }}>
                    <Card.Img 
                        variant="top" 
                        src={imgSrc || `https://coreui.io/react/docs/static/react-83088efde08a5dedde9f67a954cb4b5b.jpg`} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </div>
                <Card.Body>
                    <Card.Title style={{ 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis' 
                    }}>{title}</Card.Title>

                    <Card.Text style={{ 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis' 
                    }}>{subjectName}</Card.Text>

                    <Card.Text>Price: {price || 'Free'}</Card.Text>
                    
                    <Link to = {`${link.trainee}${link.traineeSubjectDetail}/${subjectId}`}>
                        <Button className="button primary">
                            {textButton}
                        </Button>
                    </Link>
                    <Button style={{marginLeft: '10px'}} className="button primary" onClick={() => handleAddJoinedSubject(subjectId)}>
                            Add to my subject
                    </Button>
                </Card.Body>
            </Card>
    )
};