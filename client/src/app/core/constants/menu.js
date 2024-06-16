import { role } from "./config";
import { link } from "./link";

export const menu = [
    {
        label: 'Subject',
        url: link.managerSubjectList,
        iconUrl: '',
        allowedRoles: [role.MANAGER]
    },
    {
        label: 'Quizzes',
        url: '',
        iconUrl: '',
        allowedRoles: [role.MANAGER]
    },
    {
        label: 'Question bank',
        url: '',
        iconUrl: '',
        allowedRoles: [role.MANAGER]
    },
    {
        label: 'Lessons',
        url: '',
        iconUrl: '',
        allowedRoles: [role.MANAGER]
    },
];