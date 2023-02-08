import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #f5f5f5;
    padding: 3rem;
    width: 80vw;
    border-radius: 1rem;
    overflow: scroll;

    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
`

export const Button = styled.button`
    background-color: #00425A;
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 0.5rem;
    margin-top: 1rem;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: #006989;
    }
`
