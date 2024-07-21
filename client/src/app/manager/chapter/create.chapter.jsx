import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Tab, Form, Row, Col } from 'react-bootstrap';
import './css/create.css';
import { QuizService } from '../../core/services/quiz.service';
import { ValidatorsControl } from '../../core/services/validators-control';
import { Rules } from '../../core/constants/rules';
import { chapterType } from '../../core/constants/type'
import Swal from 'sweetalert2'
import { ChapterService } from '../../core/services/chapter.service';
import { AuthService } from '../../core/services/auth.service';

export default function CreateChapterComponent({ showModal, handleCloseModal, subjectId }) {

    const [key, setKey] = useState(chapterType.LECTURE);
    const [youtubeLink, setYoutubeLink] = useState('');
    const [selectedQuizzes, setSelectedQuizzes] = useState([]);
    const [quizSearch, setQuizSearch] = useState('');
    const [wordFile, setWordFile] = useState(null);
    const [quizData, setQuizData] = useState([])
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const userId = AuthService.getUserId();

    useEffect( () => {
        const fetchQuizInSubject = async () => {
            if (subjectId) {
                let quizInSubject = await QuizService.getQuizBySubject(subjectId);
                setQuizData(quizInSubject);
            }
        }
        fetchQuizInSubject();
    }, [subjectId]);

    const handleQuizSelect = (quizId) => {
        setSelectedQuizzes((prev) =>
            prev.includes(quizId) ? prev.filter((q) => q !== quizId) : [...prev, quizId]
        );
    };

    const handleAddChapter = async (e) => {
        
        let formControl = new ValidatorsControl({
            title: { value: title, validators: Rules.title},
        })
        if (key === chapterType.LECTURE) {
            formControl.setField('content', content, Rules.content);
        } else if (key === chapterType.VIDEO) {
            formControl.setField('attachments', youtubeLink, Rules.youtubeLink);
        }
        
        let isSubmit = formControl.submitForm(e);
        if(isSubmit){
            let createConditions = {
                subjectId: subjectId,
                title: title,
                createBy: userId,
            }
            if(key === chapterType.LECTURE){
                createConditions = { ...createConditions, content: content, attachments: '', linkVideo: '', quizzes: [], type: chapterType.LECTURE};
            } else if ( key === chapterType.VIDEO){
                createConditions = { ...createConditions, content: '', attachments: '', linkVideo: youtubeLink, quizzes: [], type: chapterType.VIDEO};
            } else if ( key === chapterType.QUIZ){
                createConditions = { ...createConditions, content: '', attachments: '', linkVideo: '',  quizzes: selectedQuizzes, type: chapterType.QUIZ};
            }

            Swal.fire({
                title: `Success request`,
                icon: 'success',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: 'Ok',
                preConfirm: async () => {
                    await ChapterService.createChapterBySubject(createConditions)
                    .catch((error) => {
                        Swal.showValidationMessage(`Request failed: ${error}`);
                    });
                },
            }).then(() => {
                handleCloseModal();
                window.location.reload();
            })
        }
    };

    const handleQuizSearch = (e) => {
        setQuizSearch(e.target.value);
    };

    const filteredQuizzes = quizData.filter((quiz) =>
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
                            <h5 className="modal-title">Add chapter</h5>
                        </div>
                        <div className="modal-body">
                        <div className="flex-direction-column">
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Chapter title</Form.Label>
                                    <Form.Control type="text"  onBlur={(e)=>setTitle(e.target.value)} />
                                    <div validation="title" className="error-message" style={{ color: 'red' }} alias="Chapter title"></div>
                                </Form.Group>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey={0} title="Import Word">
                                        {/* <Form.Group className="mb-3">
                                            <Form.Label>Upload Word File</Form.Label>
                                            <Form.Control
                                                type="file"
                                                accept=".doc,.docx"
                                                onChange={(e) => setWordFile(e.target.files[0])}
                                            />
                                        </Form.Group> */}
                                        <Form.Group className="mb-3">
                                            <Form.Label>Content</Form.Label>
                                            <Form.Control as="textarea" rows={6} onBlur={(e)=>setContent(e.target.value)} />
                                            <div validation="content" className="error-message" style={{ color: 'red' }} alias="Content"></div>
                                        </Form.Group>
                                    </Tab>
                                    <Tab eventKey={1} title="Watching Video">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Link video</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={youtubeLink}
                                                onChange={(e) => setYoutubeLink(e.target.value)}
                                            />
                                            {
                                                youtubeLink && (
                                                    <div className="mt-3">
                                                        <iframe
                                                            width="100%"
                                                            height="315"
                                                            src={`https://www.youtube.com/embed/${youtubeLink.split('v=')[1]}`}
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                            title="Link video"
                                                        ></iframe>
                                                    </div>
                                                )
                                            }
                                            <div validation="attachments" className="error-message" style={{ color: 'red' }} alias="Youtube link"></div>
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
                                                    filteredQuizzes.map((quiz) => (
                                                        <Button
                                                            key={quiz._id}
                                                            variant={selectedQuizzes.includes(quiz._id) ? 'success' : 'secondary'}
                                                            onClick={() => handleQuizSelect(quiz._id)}
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
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Back
                            </Button>
                            <Button variant="success" onClick={handleAddChapter}>
                                Add
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
      )}
    </>
  );
}
