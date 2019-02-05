import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import jwt from 'jsonwebtoken';
// JWT seed
const SEED = '@SyTW-@diyhacks';
// import data models
import User from './models/User';
import Post from './models/Post';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json({limit: '200mb'}));

mongoose.connect('mongodb://Administrador:123456@172.16.105.2:27017/admin', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', ()=>{
  console.log('MongoDB conexion establecida');
});

// Post Related Requests
router.route('/posts/get').get((req,res)=>{
  Post.find((err,posts)=>{
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al buscar posts',
        errors: err
      })
    }
    if (posts.length == 0) {
      return res.status(200).json({
        ok: false,
        mensaje: 'No existen posts',
        errors: err
      });
    }
    res.status(200).json({
      ok: true,
      posts: posts,
      id: posts._id
      // token: token,
    });
  })
})
router.route('/post/add').post((req,res)=>{
  let post = new Post(req.body);
  console.log(post);
  post.save().then(post =>{
    res.status(200).json({'post':'Added successfully'})
  })
  .catch(err =>{
    res.status(400).json({
      'info': 'Failed to upload post',
      'err': err
    })
  })
});
router.route('/like/:id').post((req,res)=>{
  Post.findById(req.params.id, (err,post)=>{
    if(err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al buscar el post',
        errors: err
      })
    }
    if (!post) {
      return res.status(200).json({
        ok: false,
        mensaje: 'El post no existe',
        errors: err
      });
    }
    console.log("Llamada a la funcion Like")
    let status = "added"
    post.likes.forEach( (x, i, arr) => {
      if(x == req.body.author) {
        arr.splice(i,1);
        status = "removed";
      }
    } )
    if(status == "added") {
      post.likes.push(req.body.author)
    }
    post.save().then(post =>{
      res.status(200).json({
        ok: true,
        like: status
      });
    }).catch(err =>{
      res.status(400).send('Update failed');
    })

    res.status(200).json({
      ok: true,
      usuario: 'added'
    });
  })
})

// Lista todos los usuarios
router.route('/users').get((req,res)=>{
  User.find((err,users)=>{
    if(err) console.log("No hay usuarios");
    else {
      res.json(users)
    }
  })
})
// // Encuentra un usuario por su id
router.route('/protected/profile/:id').get( (req,res)=>{
  User.findById(req.params.id, (err,user)=>{
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al buscar el usuario',
        errors: err
      })
    }
    if (!user) {
      return res.status(200).json({
        ok: false,
        mensaje: 'Usuario introducido no existe',
        errors: err
      });
    }
    res.status(200).json({
      ok: true,
      usuario: user,
      id: user._id
      // token: token,
    });
  })
});
// Verificar un perfil por su username
router.route('/profile/:id').get((req,res)=>{
  User.findOne({'username': req.params.id}, (err,user)=>{
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al buscar el usuario',
        errors: err
      })
    }
    if (!user) {
      console.log('El usuario no existe');
      return res.status(200).json({
        ok: false,
        mensaje: 'Usuario introducido no existe',
        errors: err
      });
    }
    res.status(200).json({
      ok: true,
      // usuario: user
      // token: token,
      id: user._id
    });
  })
});
// Verificar un perfil por su email
router.route('/email/:id').get((req,res)=>{
  User.findOne({'email': req.params.id}, (err,user)=>{
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al buscar el correo',
        errors: err
      })
    }
    if (!user) {
      return res.status(200).json({
        ok: false,
        mensaje: 'Usuario introducido no existe',
        errors: err
      });
    }
    console.log(user);
    res.status(200).json({
      ok: true,
      // usuario: user
      // token: token,
      id: user._id
    });
  })
});

// Authenticate user (Generar Token)
router.route('/users/authenticate').post((req,res)=>{
  let given = req.body.username;
  let request = {'username': given};
  if (/\S{3,}@\S{3,}\.\S{2,4}$/.test(given)) {
    request = {'email': given};
  }
  console.log("lo introducido es un", request);
  User.findOne( request , (err,user)=>{
    console.log('Lo encontrado es ', user);
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al buscar el usuario',
        errors: err
      })
    }
    if (!user) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Credenciales incorrectas - email',
        errors: err
      });
    }
    if (user.password != req.body.password) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Credenciales incorrectas - password',
        errors: err
      });
    }
    // Crear un token
    let token = jwt.sign({ usuario: user}, SEED, {expiresIn: 14400 }); // 4 horas

    res.status(200).json({
      ok: true,
      token: token,
      id: user._id
    });
  });
})

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
// Actualizar un perfil de usuario
router.route('/protected/profile/update/:id').post((req,res)=>{
  User.findById(req.params.id, (err,user)=>{
    if(!user)
      return next(new Error('Could not load user'))
    else {
      user.usuario = req.body.usuario;
      user.password = req.body.password;
      user.email = req.body.email;
      user.profilepic = req.body.profilepic;

      user.save().then(user =>{
        res.json('Update done');
      }).catch(err =>{
        res.status(400).send('Update failed');
      })
    }
  })
});
// Eliminar un perfil de usuario
router.route('/protected/profile/delete/:id').get((req,res)=>{
  User.findByIdAndRemove({_id: req.params.id}, (err,user) =>{
    if(err)
      res.json(err);
    else {
      res.json('Remove successfully')
    }
  })
});
// JWT filter
app.use('/protected', (req,res,next)=>{
  let token = req.headers.token;
  jwt.verify( token, SEED, ( err, decoded ) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Token no valido',
        errors: err
      })
    }
    next();
  })
});
app.use('/', router);

app.listen(4000, '172.16.104.2', ()=>{
  console.log('Express server on port 4000, ip 172.16.104.2');
});
