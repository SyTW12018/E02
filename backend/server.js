import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import User from './models/User'

const app = express();

const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/test');

const connection = mongoose.connection;

connection.once('open', ()=>{
  console.log('MongoDB conexion establecida');
});

router.route('/users').get((req,res)=>{
  User.find((err,users)=>{
    if(err) console.log("No hay usuarios");
    else {
      res.json(users)
    }
  })
})

router.route('/profile/:id').get((req,res)=>{
  User.find({'username': req.params.id}, (err,user)=>{
    if(err) console.log("No existe este usuario");
    else    res.json(user);
  })
});

// router.route('profile/:id').get((req,res)=>{
//   User.findById(req.params.id, (err,user)=>{
//     if (err) console.log(err);
//     else
//       res.json(user);
//   })
// });

// Añadir usuario a la base de datos 
router.route('/profile/add').post((req,res)=>{
  let user = new User(req.body);
  user.save().then(user =>{
    res.status(200).json({'user':'Added successfully'})
  })
  .catch(err =>{
    res.status(400).send('Failed to create new user')
  })
});

router.route('/profile/update/:id').post((req,res)=>{
  User.findById(req.params.id, (err,user)=>{
    if(!user)
      return next(new Error('Could not load user'))
    else {
      user.usuario = req.body.usuario;
      user.password = req.body.password;
      user.email = req.body.email;

      user.save().then(user =>{
        res.json('Update done');
      }).catch(err =>{
        res.status(400).send('Update failed');
      })
    }
  })
});

router.route('/profile/delete/:id').get((req,res)=>{
  User.findByIdAndRemove({_id: req.params.id}, (err,user) =>{
    if(err)
      res.json(err);
    else {
      res.json('Remove successfully')
    }
  })
});

app.use('/', router);

app.listen(4000, ()=>{
  console.log('Express server on port 4000');
});
