import Validators from "../../shared/validators/normal.validator";
import noOnlySpacesValidator from "../../shared/validators/no-only-space.validator";
import customPatternValidator from '../../shared/validators/custom.validator'

export const Rules = {
    noValidate: [],
    loginId: [customPatternValidator(/^[\w-+.!#$%&'*/=?^`{|}~]+@[\w-]+(\.[\w-]+)+$/g, 'password'), Validators.required, Validators.maxLength(255)],
    fullname: [Validators.requiredString, Validators.minLength(4), Validators.maxLength(16), noOnlySpacesValidator()],
    email: [Validators.requiredString, Validators.email, Validators.maxLength(255)],
    subjectName: [Validators.requiredString, Validators.maxLength(255)],
    isActivce: [],
    description: [Validators.maxLength(255)],
    phoneNumber: [Validators.requiredString, Validators.phoneNumber],
    password: [Validators.requiredString, Validators.minLength(8), Validators.maxLength(20), Validators.password],
    code: [Validators.requiredString, Validators.minLength(3), Validators.maxLength(6)],
    price: [Validators.required, Validators.number],
    title: [Validators.requiredString, Validators.maxLength(40)],
    content: [Validators.requiredString],
    youtubeLink: [Validators.requiredString, Validators.youtubeLink],
    question: [Validators.requiredString, Validators.maxLength(500)],
    answerContent: [Validators.requiredString, Validators.maxLength(100)],
    explain: [Validators.requiredString, Validators.maxLength(500)],
    requiredString: [Validators.requiredString],
};
