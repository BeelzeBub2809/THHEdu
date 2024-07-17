import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Button, Tabs, Tab, Form, Row, Col } from 'react-bootstrap';
import './css/create.css';
import { status } from '../../core/constants/config';
import { SubjectService } from '../../core/services/subject.service';
import { ChapterService } from '../../core/services/chapter.service';
import { questionType, chapterType, chapterTypeIcon } from '../../core/constants/type';
import { ValidatorsControl } from '../../core/services/validators-control';
import { Rules } from '../../core/constants/rules';
import Swal from 'sweetalert2'
import { QuestionService } from '../../core/services/question.service'

function CreateQuestionComponent({ showModal, handleCloseModal }) {
    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [questionName, setQuestionName] = useState('');
    const [explain, setExplain] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedChapter, setSelectedChapter] = useState('');
    const [answers, setAnswers] = useState([{ answerContent: '', isCorrected: false }]);
    const [type, setType] = useState('');

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

            fetchChapters();
        } else {
            setChapters([]);
        }
    }, [selectedSubject]);

    const handleAddAnswer = () => {
        setAnswers([...answers, { answerContent: '', isCorrected: false }]);
    };

    const handleRemoveAnswer = (index) => {
        const newAnswers = answers.filter((_, i) => i !== index);
        setAnswers(newAnswers);
      };

    const handleInputChange = (index, event) => {
        const { value } = event.target;
        const newAnswers = [...answers];
        newAnswers[index].answerContent = value;
        setAnswers(newAnswers);
    };

    const handleCheckboxChange = (index, event) => {
        const { checked } = event.target;
        const newAnswers = [...answers];
        newAnswers[index].isCorrected = checked;
        setAnswers(newAnswers);
    };

    const handleAddQuestion = (e) =>{
        let formControl = new ValidatorsControl({
            subjectId: { value: selectedSubject, validators: Rules.requiredString},
            questionName: { value: questionName, validators: Rules.question},
            explain: { value: explain, validators: Rules.explain},
            type: { value: type, validators: Rules.requiredString},
        })

        if(type !== questionType.BOOLEAN){
            answers.map((a, index) => {
                formControl.setField(`answerContent_${index}`, a.answerContent, Rules.answerContent)
            })
        }
        
        let isSubmit = formControl.submitForm(e);
        if( handleCheckType() && isSubmit){
            let createConditions = {
                questionName: questionName,
                subjectId: selectedSubject,
                chapterId: selectedChapter === '' ? undefined : selectedChapter,
                type: type,
                answer: type === questionType.BOOLEAN ? [
                        {
                            answerContent: 'True',
                            isCorrected: true,  
                        },
                        {
                            answerContent: 'False',
                            isCorrected: false,  
                        }
                    ] 
                    : answers,
                explain: explain,
            }

            Swal.fire({
                title: `Success request`,
                icon: 'success',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: 'Ok',
                preConfirm: async () => {
                    await QuestionService.createQuestionBySubject(createConditions)
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

    const handleCheckType = () => {
        if( type === questionType.BOOLEAN){
            return true;
        }
        const element = document.querySelector('.error-type');
        if(element){
            element.textContent = '';
            if(!checkAnswerValidType()){
                element.textContent = 'Error in creating answer with each types'
                return false;
            }
        }
        return true;
    }

    const checkAnswerValidType = () => {
        if(type !== questionType.BOOLEAN){
            if(answers.length == 0 || !answers.some(a => a.isCorrected)){
                return false;
            }
            if(type === questionType.MCQ && answers.filter((a) => a.isCorrected).length >= 2){
                return false;
            }
        }
        return true;
    }

    return (
    <>
        {showModal &&
            <Fragment>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add question</h5>
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
                                        <label>Question name</label>
                                        <input type="text" onBlur={(e)=>setQuestionName(e.target.value)}/>
                                        <div validation="questionName" className="error-message" style={{ color: 'red' }} alias="Question name"></div>
                                    </div>

                                    <div className="form-group">
                                        <label>Question Type</label>
                                        <div>
                                            <label className='d-flex'>
                                                Multiple Choice
                                                <input type="radio" name="type" value={questionType.MCQ} onChange={e => setType(e.target.value)}/> 
                                            </label>
                                            <label className='d-flex'>
                                                Multiple Answer
                                                <input type="radio" name="type" value={questionType.MAQ} onChange={e => setType(e.target.value)}/> 
                                            </label>
                                            <label className='d-flex'>
                                                True/False
                                                <input type="radio" name="type" value={questionType.BOOLEAN} onChange={e => setType(e.target.value)}/>
                                            </label>
                                        </div>
                                        <div validation='type' className="error-message" style={{ color: 'red' }} alias="Question type"></div>
                                    </div>

                                    {type !== questionType.BOOLEAN && (
                                        <>
                                            {
                                                answers.map((answer, index) => (
                                                    <Fragment>
                                                        <div key={index} className="form-group d-flex align-items-center">
                                                            <input
                                                                type="text"
                                                                name={`answerContent_${index}`}
                                                                value={answer.answerContent}
                                                                onChange={e => handleInputChange(index, e)}
                                                                className="form-control"
                                                                style={{ marginRight: '10px' }}
                                                            />
                                                            <label className="form-check-label">
                                                                <input
                                                                    type="checkbox"
                                                                    name="isCorrected"
                                                                    checked={answer.isCorrected}
                                                                    onChange={e => handleCheckboxChange(index, e)}
                                                                    className="form-check-input"
                                                                    style={{ marginRight: '10px' }}
                                                                /> Is Correct
                                                            </label>
                                                            <button type="button" onClick={() => handleRemoveAnswer(index)} className="btn btn-danger">x</button>
                                                        </div>
                                                        <div validation={`answerContent_${index}`} className="error-message" style={{ color: 'red' }} alias="This answer"></div>
                                                    </Fragment>
                                                ))
                                            }
                                            <button type="button" onClick={handleAddAnswer} className="btn btn-primary">Add Answer</button>
                                            <div className="error-type" style={{ color: 'red' }}></div>
                                        </>
                                    )}

                                    <Form.Group className="mb-3">
                                        <Form.Label>Explain</Form.Label>
                                        <Form.Control as="textarea" rows={6} onBlur={(e)=>setExplain(e.target.value)}/>
                                        <div validation="explain" className="error-message" style={{ color: 'red' }} alias="Explain"></div>
                                    </Form.Group>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                            <button type="button" className="btn btn-success " onClick={handleAddQuestion}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            </Fragment>
        }
    </>
  );
}

export default CreateQuestionComponent;