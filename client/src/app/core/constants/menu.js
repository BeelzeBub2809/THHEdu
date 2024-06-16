import { role } from "./config";
import { link } from "./link";

export const menu = [
    {
        label: 'Dashboard',
        url: link.managerDashboard,
        iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/f1170514c93b87b2f66d1a5f8546ed28c6542845d5b95a560fded4cc18694e75?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&",
        allowedRoles: [role.MANAGER]
    },
    {
        label: 'Subject',
        url: link.managerSubjectList,
        iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/f1170514c93b87b2f66d1a5f8546ed28c6542845d5b95a560fded4cc18694e75?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&",
        allowedRoles: [role.MANAGER]
    },
    {
        label: 'Quizzes',
        url: link.managerQuizList,
        iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/f1170514c93b87b2f66d1a5f8546ed28c6542845d5b95a560fded4cc18694e75?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&",
        allowedRoles: [role.MANAGER]
    },
    {
        label: 'Questions',
        url: link.managerQuestionList,
        iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/f1170514c93b87b2f66d1a5f8546ed28c6542845d5b95a560fded4cc18694e75?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&",
        allowedRoles: [role.MANAGER]
    },
    // {
    //     label: 'Lessons',
    //     url: link.managerLessonList,
    //     iconUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/f1170514c93b87b2f66d1a5f8546ed28c6542845d5b95a560fded4cc18694e75?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&",
    //     allowedRoles: [role.MANAGER]
    // },
];