// import Router from './modules/Route/Router';
// import SignIn from './views/SignIn/SignIn';
// import SignUp from './views/SignUp/SignUp';
// import Scoreboard from './views/Scoreboard/Scoreboard';
// import Main from './views/Main/Main';
//
// import './css/reset.scss';
//
// const router = new Router();
//
// router
//   .addRoute('/SignUp', SignUp)
//   .addRoute('/SignIn', SignIn)
//   .addRoute('/Scoreboard', Scoreboard)
//   .addRoute('/', Main)
//   .start();

import Form from './components/Form/Form';

import tmpl from './test.tmpl.xml';

const form = new Form([{
  element: 'title',
  text: 'Sign In',
}, {
  element: 'label',
  text: 'Email address',
}, {
  element: 'input',
  type: 'email',
  placeholder: 'Email address',
}, {
  element: 'label',
  text: 'Password',
}, {
  element: 'input',
  type: 'password',
  placeholder: 'Password',
}, {
  element: 'button',
  type: 'submit',
  text: 'Sign In',
},
]);

document.body.querySelector('.content').appendChild(form.render());

const node = document.createElement('div');
node.innerHTML = tmpl({ text: 'Пора начинать активнее разрабатывать' });

document.body.querySelector('.content').appendChild(node);
