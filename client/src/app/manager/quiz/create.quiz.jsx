import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Tab, Form, Row, Col } from 'react-bootstrap';
import './css/create.css';
import { SubjectService } from '../../core/services/subject.service';
import { ChapterService } from '../../core/services/chapter.service';
import { chapterType } from '../../core/constants/type';
import { QuestionService } from '../../core/services/question.service';
import { ValidatorsControl } from '../../core/services/validators-control';
import { Rules } from '../../core/constants/rules';
import Swal from 'sweetalert2'
import { QuizService } from '../../core/services/quiz.service';

function CreateQuizComponent({ showModal, handleCloseModal }) {
    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedChapter, setSelectedChapter] = useState('');
    const [selectedQuestion, setSelectedQuestions] = useState([]);
    const [quizName, setQuizName] = useState('');
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        async function fetchSubjects() {
            let searchCondition = { isActive: true }
            const data = await SubjectService.getAllSubjects(searchCondition);
            if(Array.isArray(data.subjects)){
                setSubjects(data.subjects);
            } else {
                setSubjects([]);
            }
        }

        fetchSubjects();
    }, []);

    useEffect(() => {
        if (selectedSubject !== '') {
            fetchChapters();
            fetchQuestions();
        } else {
            setChapters([]);
            setQuestions([]);
            setSelectedQuestions([]);
        }
    }, [selectedSubject]);

    async function fetchQuestions() {
        let searchCondition = { isActive: true, searchString: searchString }
        const data = await QuestionService.getQuestionsBySubject(selectedSubject, searchCondition);
        if(data){
            setQuestions(data);
        } else {
            setQuestions([]);
        }
        setSelectedQuestions([]);
    }

    async function fetchChapters() {
        let searchCondition = { isActive: true, type: chapterType.QUIZ }
        const data = await ChapterService.getChaptersBySubject(selectedSubject, searchCondition);
        if(data){
            setChapters(data);
        } else {
            setChapters([]);
        }
        setSelectedChapter('');
    }

    const filteredQuestions = questions.filter((question) =>
        question.questionName.toLowerCase().includes(searchString.toLowerCase())
    );

    const handleQuestionSelect = (questionId) => {
        setSelectedQuestions((prev) =>
            prev.includes(questionId) ? prev.filter((q) => q !== questionId) : [...prev, questionId]
        );
    };

    const handleSearch = (e) => {
        setSearchString(e.target.value);
    };

    async function createQuiz(createConditions){
        await QuizService.createQuizBySubject(createConditions)
    }

    const handleAddQuiz = (e) => {
        let formControl = new ValidatorsControl({
            subjectId: { value: selectedSubject, validators: Rules.requiredString},
            quizName: { value: quizName, validators: Rules.quizName},
            duration: { value: duration, validators: Rules.duration},
        })
        let isSubmit = formControl.submitForm(e);
        if(isSubmit){
            let createConditions = {
                subjectId: selectedSubject,
                chapterId: selectedChapter === '' ? undefined : selectedChapter,
                quizName: quizName,
                duration: duration,
                questionId: selectedQuestion
            }

            try{
                createQuiz(createConditions)
                handleCloseModal();
                window.location.reload();

            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                }).then(()=>{
                    handleCloseModal();
                    window.location.reload();
                })
            }
        }
    }

    return (
      <>
        {showModal &&
          <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Quiz</h5>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex" style={{ gap: '20px' }}>
                            <form className="w-100">
                                <div className="form-group">
                                    <label>Subject</label>
                                    <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                                        <option value="">Select Subject</option>
                                        {
                                            subjects.map(subject => (
                                                <option key={subject._id} value={subject._id}>
                                                    {subject.subjectCode} - {subject.subjectName}
                                                </option>
                                            ))
                                        }
                                    </select>
                                    <div validation='subjectId' className="error-message" style={{ color: 'red' }} alias="Subject"></div>
                                </div>
                                <div className="form-group">
                                    <label>Chapter</label>
                                    <select value={selectedChapter} onChange={(e) => setSelectedChapter(e.target.value)} disabled={!selectedSubject}>
                                        <option value='' >Select Chapter</option>
                                        {
                                            chapters.map(chapter => (
                                                <option key={chapter._id} value={chapter._id}>
                                                    {
                                                        chapter.type == chapterType.LECTURE ? `Lecture`
                                                            : chapter.type == chapterType.VIDEO ? 'Video'
                                                            : `Quiz`
                                                    } - {chapter.title}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Quiz name</label>
                                    <input type="text" onBlur={(e)=>setQuizName(e.target.value)}/>
                                    <div validation="quizName" className="error-message" style={{ color: 'red' }} alias="Quiz name"></div>
                                </div>
                                <div className="form-group">
                                    <label>Duration</label>
                                    <input type="number" onBlur={(e)=>setDuration(e.target.value)}/>
                                    <div validation="duration" className="error-message" style={{ color: 'red' }} alias="Duration"></div>
                                </div>
                                <div className="form-group">
                                    <label>Type</label>
                                    <div>
                                        <label htmlFor="random">
                                            <input type="radio" id="random" name="type" value="random" style={{ width: 'auto' }} />
                                                Random question
                                        </label>
                                        <br />
                                        <label htmlFor="fixed">
                                            <input type="radio" id="fixed" name="type" value="fixed" style={{ width: 'auto' }} />
                                                Fixed question
                                        </label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>All question in subject</label>
                                        <Form.Group className="mb-3">
                                                <Form.Label>Search Quizzes</Form.Label>
                                                <Form.Control
                                                type="text"
                                                value={searchString}
                                                onChange={handleSearch}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Select Quizzes</Form.Label>
                                                <div className='d-flex flex-column'>
                                                    {
                                                        filteredQuestions.map((question) => (
                                                            <Button
                                                                key={question._id}
                                                                variant={selectedQuestion.includes(question._id) ? 'success' : 'secondary'}
                                                                onClick={() => handleQuestionSelect(question._id)}
                                                                className="m-1"
                                                            >
                                                                {question.questionName}
                                                            </Button>
                                                        ))
                                                    }
                                                </div>
                                        </Form.Group>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                        <button type="button" className="btn btn-success"  onClick={handleAddQuiz}>Save</button>
                    </div>
                </div>
              </div>
            </div>
          </>
        }
      </>
    );
};

export default CreateQuizComponent;
