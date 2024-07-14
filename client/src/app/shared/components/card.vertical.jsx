import React from "react";
import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { link } from "../../core/constants/link"; 
export default function CardVertical({ imgSrc, title, subjectName, price, textButton, _id: subjectId }){
    return (
        <>
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

                    <Card.Text>{price || 'Freed'}</Card.Text>
                    
                    <Link to = {`${link.trainee}${link.traineeSubjectDetail}/${subjectId}`}>
                        <Button className="button primary">
                            {textButton}
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        </>
    )
};