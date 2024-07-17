import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { link } from "../../core/constants/link"; 
import { useEffect, useState } from 'react';
export default function CardVertical({ imgSrc, title, subjectName, price, textButton, _id: subjectId}){
    const [listSubjects, setListSubjects] = useState([])
    useEffect(() => {
        const fetchListSubject = async () => {
            try {
                const traineeId = JSON.parse(localStorage.getItem('userId')) || ''
                let response = await fetch(`http://localhost:9999/trainee/joinedSubject/get-by-id/${traineeId}`, {
                    method: 'GET',
                    credentials: 'include'
                })
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Network response was not ok')
                }
                const data = await response.json()
                if(data) {
                    let list = []
                    data.map(data => list.push(data.subject))
                    setListSubjects(list)
                }
            } catch (error) {
                console.log(error) 
            }
        }
        fetchListSubject()
    }, [])
    const handleAddJoinedSubject = async ()  => {
        try {
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
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
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
                    
                    <Link to = {`${link.trainee}${link.traineeSubjectDetail}/${subjectId}?price=${price}`}>
                        <Button className="button primary">
                            {textButton}
                        </Button>
                    </Link>
                    {!listSubjects.includes(subjectId) && price == 0 && (
                        <Button style={{ marginLeft: '10px' }} className="button primary" onClick={handleAddJoinedSubject}>
                            Add to my subject
                        </Button>
                    )}
                </Card.Body>
            </Card>
    )
};