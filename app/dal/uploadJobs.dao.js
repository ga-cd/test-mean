const mysql = require('../database/models');

const createUploadJob = (uploadJobObject) => mysql.uploadJobs.create(uploadJobObject);
const getUploadJobs = (userId, offset, limit) => mysql.uploadJobs.findAll({
    where: {
        userId,
    },
    offset,
    limit,
    raw: true,
});

module.exports = {
    createUploadJob,
    getUploadJobs,
};
