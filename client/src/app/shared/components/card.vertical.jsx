import React from "react";
import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { link } from "../../core/constants/link"; 
export default function CardVertical({ imgSrc, title, institutionName, price, textButton, subjectId }){
    return (
        <>
            <Card style={{ width: '18rem', height: '100%', margin: 20}}>
                <div style={{ width: '100%', height: '180px', overflow: 'hidden' }}>
                    <Card.Img 
                        variant="top" 
                        src={imgSrc} 
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
                    }}>{institutionName}</Card.Text>

                    <Card.Text>{price || 'Freeds'}</Card.Text>
                    
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