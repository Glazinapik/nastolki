const { Router } = require('express');
const meetingController = require('../controllers/meeting.controller');
const checkAuth = require('../middlewares/checkAuth');
const checkAuthor = require('../middlewares/checkAuthor');

const meetingRouter = Router();

meetingRouter.post('/', checkAuth, meetingController.createMeeting);
meetingRouter.get('/all', checkAuth, meetingController.getAllMeetings);
meetingRouter.route('/:id')
  .put(checkAuth, checkAuthor, meetingController.editMeeting)
  .get(checkAuth, meetingController.getMeeting)
  .delete(checkAuth, checkAuthor, meetingController.deleteMeeting);
meetingRouter.get('/user/:id', checkAuth, meetingController.getMeetingsOfUser);

module.exports = meetingRouter;

