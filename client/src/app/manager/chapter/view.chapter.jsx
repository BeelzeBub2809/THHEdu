import { React, useState, useEffect }  from 'react';
import './css/create.css';
import { Modal, Button, Tabs, Tab, Form, Row, Col } from 'react-bootstrap';
import { QuizService } from '../../core/services/quiz.service';

function ViewChapterComponent({ showModal, handleCloseModal, item }) {
    const [key, setKey] = useState(0);
    const [quizSearch, setQuizSearch] = useState('');
    const [quizData, setQuizData] = useState([])
    
    useEffect( () => {
        const fetchQuizData = async () => {
            if (item._id) {
                let quizDataFetch = await QuizService.getQuizByChapter(item._id);

                if(quizDataFetch){
                    setQuizData(quizDataFetch);
                } else {
                    setQuizData([]);
                }
            } else {
                setQuizData([]);
            }
        }
        fetchQuizData();
        changeTab();
    }, [item]);

    const handleQuizSearch = (e) => {
        setQuizSearch(e.target.value);
    };
    
    const changeTab = () => {
        setKey(item.type)
    }

    const filteredQuizzes = quizData.length > 0 && quizData.filter((quiz) =>
        quiz.quizName.toLowerCase().includes(quizSearch.toLowerCase())
    );

    return (
        <>
          {showModal && (
            <>
                <div className="modal-backdrop fade show"></div>
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">View chapter</h5>
                            </div>
                            <div className="modal-body">
                            <div className="flex-direction-column">
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Chapter title</Form.Label>
                                        <Form.Control type="text"  readOnly value={item.title} />
                                    </Form.Group>
                                    <Tabs
                                        id="controlled-tab-example"
                                        activeKey={key}
                                        onSelect={(k) => setKey(k)}
                                        className="mb-3"
                                    >
                                        <Tab eventKey={0} title="Import Word">
                                            <Form.Group className="mb-3">
                                                <Form.Label>Content</Form.Label>
                                                <Form.Control as="textarea" rows={6} value={item.content} readOnly/>
                                            </Form.Group>
                                        </Tab>
                                        <Tab eventKey={1} title="YouTube Video">
                                            <Form.Group className="mb-3">
                                                <Form.Label>YouTube Link</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    readOnly
                                                    value={item.attachments}
                                                />
                                                {
                                                    item.attachments && (
                                                        <div className="mt-3">
                                                            <iframe
                                                                width="100%"
                                                                height="315"
                                                                src={`https://www.youtube.com/embed/${item.attachments.split('v=')[1]}`}
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen
                                                                title="YouTube video"
                                                            ></iframe>
                                                        </div>
                                                    )
                                                }
                                            </Form.Group>
                                        </Tab>
                                        <Tab eventKey={2} title="Quizzes">
                                            <Form.Group className="mb-3">
                                                <Form.Label>Search Quizzes</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={quizSearch}
                                                    onChange={handleQuizSearch}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Select Quizzes</Form.Label>
                                                <div className='d-flex flex-column'>
                                                    {
                                                        filteredQuizzes.length > 0 && filteredQuizzes.map((quiz) => (
                                                            <Button
                                                                key={quiz._id}
                                                                variant={'success'}
                                                                className="m-1"
                                                            >
                                                                {quiz.quizName}
                                                            </Button>
                                                        ))
                                                    }
                                                </div>
                                            </Form.Group>
                                        </Tab>
                                    </Tabs>
                                </Form>
                            </div>
                            </div>
                            <div className="modal-footer">
                                <Button variant="secondary" onClick={handleCloseModal}>Back</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
          )}
        </>
      );
};

export default ViewChapterComponent;
