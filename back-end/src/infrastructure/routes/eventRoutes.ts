import { Router } from "express";
import eventRepository from "../../infrastructure/repository/eventRepository";
import eventUseCase from "../../application/eventUseCase";
import eventService from "../../domain/services/eventService";
import eventController from "../../controllers/eventController";
import multer from "multer";

const EventRepository = new eventRepository();
const EventUseCase = new eventUseCase(EventRepository);
const EventService = new eventService(EventUseCase);
const EventController = new eventController(EventService);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  const upload = multer({ storage: storage });
 
const eventRouter = Router();

eventRouter.post('/create', upload.single('file'), (req,res)=> EventController.create(req,res));
eventRouter.get('/getallevents', (req,res)=> EventController.getAllEvents(req,res));
eventRouter.get('/user_event/:userId', (req,res)=> EventController.getEvent(req,res));
eventRouter.get('/:_id', (req,res)=> EventController.getEvent(req,res));
eventRouter.patch('/edit', (req,res)=> EventController.edit(req,res));
eventRouter.patch('/edit_event',upload.single('file'), (req,res)=> EventController.editEvent(req,res));
eventRouter.delete('/delete/:id/:up/:img', (req,res)=> EventController.delete(req,res));
eventRouter.patch('/add_attendee', (req,res)=> EventController.addAttendee(req,res));
eventRouter.patch('/remove_attendee', (req,res)=> EventController.removeAttendee(req,res));

export default eventRouter