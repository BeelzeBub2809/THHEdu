import Validators from "../../shared/validators/normal.validator";
import noOnlySpacesValidator from "../../shared/validators/no-only-space.validator";
import customPatternValidator from '../../shared/validators/custom.validator'

export const Rules = {
    loginId: [customPatternValidator(/^[\w-+.!#$%&'*/=?^`{|}~]+@[\w-]+(\.[\w-]+)+$/g, 'password'), Validators.required, Validators.maxLength(255)],
    fullname: [Validators.required, Validators.minLength(4), Validators.maxLength(16), noOnlySpacesValidator()],
    email: [Validators.required, Validators.email, Validators.maxLength(255)],
    subjectName: [Validators.required, Validators.maxLength(255)],
    isActivce: [],
    discription: [Validators.maxLength(255)],
    phoneNumber: [Validators.required, Validators.phoneNumber],
    password: [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.password],
};
