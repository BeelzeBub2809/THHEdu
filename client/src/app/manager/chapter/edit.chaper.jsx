import { React, useState, useEffect }  from 'react';
import './css/create.css';
import { Modal, Button, Tabs, Tab, Form, Row, Col } from 'react-bootstrap';
import { QuizService } from '../../core/services/quiz.service';
import { ValidatorsControl } from '../../core/services/validators-control';
import { Rules } from '../../core/constants/rules';
import { chapterType } from '../../core/constants/type'
import Swal from 'sweetalert2'
import { ChapterService } from '../../core/services/chapter.service';

function EditChapterComponent({ showModal, handleCloseModal, item, subjectId }) {
    const [key, setKey] = useState(0);
    const [quizSearch, setQuizSearch] = useState('');
    const [quizData, setQuizData] = useState([])

    const [title, setTitle] = useState(item.title);
    const [content, setContent] = useState(item.content);
    const [youtubeLink, setYoutubeLink] = useState(item.attachments);
    const [selectedQuizzes, setSelectedQuizzes] = useState([]);

    useEffect( () => {
        const fetchQuizData = async () => {
            if (item && item._id) {
                let quizInChapter = await QuizService.getQuizByChapter(item._id);
                let quizInSubject = await QuizService.getQuizBySubject(subjectId);
                if(quizInChapter && quizInSubject){
                    setQuizData(quizInSubject);
                    setSelectedQuizzes(quizInChapter.map(q => q._id));
                } else {
                    setQuizData([]);
                    setSelectedQuizzes([]);
                }
            } else {
                setQuizData([]);
            }
        }
        fetchQuizData();
        changeTab();
    }, [item]);

   
    const changeTab = (e) => {
        if(item){
            setKey(item.type)
        }
        if(e){
            setKey(item.type)
        }
    }

    const handleQuizSelect = (quizId) => {
        setSelectedQuizzes((prev) =>
            prev.includes(quizId) ? prev.filter((q) => q !== quizId) : [...prev, quizId]
        );
    };

    const handleEditChapter = async (e) => {
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
            let updateCondition = {
                title: title,
                type: key,
            }
            if(key === chapterType.LECTURE){
                updateCondition = { ...updateCondition, content: content, type: chapterType.LECTURE, };
            } else if ( key === chapterType.VIDEO){
                updateCondition = { ...updateCondition, attachments: youtubeLink, type: chapterType.VIDEO};
            } else if ( key === chapterType.QUIZ){
                updateCondition = { ...updateCondition, quizzes: selectedQuizzes, type: chapterType.QUIZ};
            }
            console.log(updateCondition);
            Swal.fire({
                title: `Success request`,
                icon: 'success',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: 'Ok',
                preConfirm: async () => {
                    await ChapterService.editChapter(item._id, updateCondition)
                    .catch((error) => {
                        Swal.showValidationMessage(`Request failed: ${error}`);
                    });
                },
            }).then(() => {
                handleCloseModal();
                window.location.reload();
            })
        }
    }


    const handleQuizSearch = (e) => {
        setQuizSearch(e.target.value);
    };

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
                                <h5 className="modal-title">Update chapter</h5>
                            </div>
                            <div className="modal-body">
                            <div className="flex-direction-column">
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Chapter title</Form.Label>
                                        <Form.Control type="text"  onChange={(e)=>setTitle(e.target.value)} value={title}/>
                                    <div validation="title" className="error-message" style={{ color: 'red' }} alias="Chapter title"></div>
                                    </Form.Group>
                                    <Tabs
                                        id="controlled-tab-example"
                                        activeKey={key}
                                        onSelect={(k) => setKey(k)}
                                        className="mb-3"
                                    >
                                        <Tab eventKey={0} title="Content of lecture">
                                            <Form.Group className="mb-3">
                                            <Form.Control as="textarea" rows={6} onChange={(e)=>setContent(e.target.value)} value={content}/>
                                            <div validation="content" className="error-message" style={{ color: 'red' }} alias="Content"></div>
                                            </Form.Group>
                                        </Tab>
                                        <Tab eventKey={1} title="YouTube Video">
                                            <Form.Group className="mb-3">
                                                <Form.Label>YouTube Link</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={youtubeLink}
                                                    onChange={(e) => setYoutubeLink(e.target.value)}
                                                />
                                                {
                                                    item && item.attachments && (
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
                                                        filteredQuizzes.length > 0 && filteredQuizzes.map((quiz) => (
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
                                <Button variant="secondary" onClick={handleCloseModal}>Back</Button>
                                <Button variant="success" onClick={handleEditChapter}>Save</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
          )}
        </>
      );
};

export default EditChapterComponent;
