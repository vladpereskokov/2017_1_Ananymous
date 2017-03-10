import transport from '../../../public/modules/Transport/Transport';

describe('Api tests', () => {
  it('Ошибка при logout', (done) => {
    transport.post('/logout')
      .then(response => {
        expect(response.status).toEqual(401);
        done(true);
      });
  });

  it('Регистрация', (done) => {
    transport.post('/signup', JSON.stringify({
      'login': 'pazan1',
      'email': 'robiqt112@mail.ru',
      'password': 'qwertyqwerty'
    }))
      .then(response => {
        expect(response.status).toEqual(200);
        done(true);
      });
  });

  it('Вход', (done) => {
    transport.post('/signin', JSON.stringify({
      'username': 'robiqt112@mail.ru',
      'password': 'qwertyqwerty'
    }))
      .then(response => {
        expect(response.status).toEqual(200);
        done(true);
      });
  });

  it('Норм logout', (done) => {
    transport.post('/logout')
      .then(response => {
        expect(response.status).toEqual(200);
        done(true);
      });
  });
});
