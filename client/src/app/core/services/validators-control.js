import { Errors } from "../constants/errors";

export class ValidatorsControl{
    constructor(form){
        this.form = form;
    }

    validateField(field) {
        const value = field.value;
        for (const validator of field.validators) {
            const error = validator(value);
            if (error) return error;
        }
        return null;
    }

    validateForm(form) {
        const errors = {};
        for (const key in form) {
            const error = this.validateField(form[key]);
            if (error) {
                errors[key] = error;
            }
        }
        return errors;
    }
    
    getFirstErrorMessage(field, error, alias) {
        return error ? this.getMessage(field, error, alias) : '';
    }

    getMessage(field, error, alias) {
        const [validator] = Object.entries(error);
        const message = Errors[validator[0]] ?? '';
        let msg = alias !== '' && alias != undefined ? message.replace(':field', alias) : message.replace(':field', field);
        if(validator[0] === 'maxLength' || validator[0] === 'minLength'){
            msg = msg.replace('{error}', validator[1].requiredLength);
        }
        return msg;
    }

    submitForm(event){
        event.preventDefault();
        const errors = this.validateForm(this.form);
        document.querySelectorAll('.error-message').forEach(element => element.textContent = '');
        if (Object.keys(errors).length > 0) {
            for (const key in errors) {
                const errorElement = document.querySelector(`[validation="${key}"]`);
                if (errorElement) {
                    errorElement.textContent = this.getFirstErrorMessage(key, errors[key], errorElement.getAttribute("alias"));
                }
            }
            return false;
        } else {
            return true;
        }
    }
}