import React from "react";
import { Card, Button } from 'react-bootstrap';
  
export default function CardVertical({ imgSrc, title, institution, degree, textButton }){
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
                    }}>{institution}</Card.Text>

                    <Card.Text>{degree}</Card.Text>
                    <Button variant="primary">{textButton}</Button>
                </Card.Body>
            </Card>
        </>
    )
};