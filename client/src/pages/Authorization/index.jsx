import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { h } from 'preact';
import { useState } from 'preact/hooks';
import userState from '../../state/userState';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';

const GET_USER = gql`
  query getUser($input: UserInput!) {
    getUser(input: $input) {
      id
      name
    }
  }
`;

export const Authorization = observer(() => {
  const [name, setName] =  useState('');
  const [password, setPassword] = useState('s');

//   const GET_USER = gql`
//   query{
//   getUser(input: {name: ${name}, password: ${password}}) {
//     name
//     id
//   }
// }
//   `
  const [getUser, { loading, error, data }] = useLazyQuery(GET_USER);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    getUser({ variables: { input: { name, password } } });
    console.log(name, password)
  }

  const success = (data) => {
    userState.isAuth(true)
    return (<><p>Успешно! ID: {data.getUser.id}, Имя: {data.getUser.name} </p></>)
  }

  return(
    <>
    <form onSubmit={handleSubmit}>
        <h1>Авторизация</h1>
        <input
          type="text"
          value={name}
          placeholder="Имя пользователя"
          onInput={(e) => setName(e.currentTarget.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Пароль"
          onInput={(e) => setPassword(e.currentTarget.value)}
        />
        <button type="submit">Войти</button>
      </form>

      {loading && <p>Загрузка...</p>}
      {error && <p>{error.message}</p>}
      {data && success(data)}
    </>
  )
})