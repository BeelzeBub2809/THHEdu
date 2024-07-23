const { DbChapterProgress } = require("../models")

async function createChapterProgress(traineeId, chapterId, videoProgress){
    let newChapterProgress = {
        trainee: traineeId,
        chapter: chapterId,
        isCompleted: true,
        videoProgress: videoProgress | 0,
    };
    const response =  await DbChapterProgress.create(newChapterProgress);
    return response;
}

async function updateTimeVideo(traineeId, chapterId, videoProgress){
    const response = await DbChapterProgress.updateOne(
        {
            trainee: traineeId,
            chapter: chapterId,
        },
        {
            $set: { videoProgress: videoProgress}
        }
    );
    return response;
}

const ChapterProgressRepo = {
    createChapterProgress, updateTimeVideo
}
module.exports = ChapterProgressRepo