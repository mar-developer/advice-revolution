import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);;
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    padding: 3rem;
    border-radius: 1rem;
`


export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;

  h1 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  input {
    height: 30px;
    border: 1px solid lightgrey;
    width: 20rem;
    border-radius: 10px;
    padding: 0.5rem 1rem;
  }

  > div {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;

    label {
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
    }
  }

  button {
    margin-top: 2rem;
    display: inline-block;
    height: 36px;
    border: none;
    border-radius: 10px;
    background-color: #00c9ff;
    color: white;
    font-weight: bold;
    width: 100px;
    cursor: pointer;
  }
`;

