import styled from 'styled-components';



export const TableWrapper = styled.table`
    border-collapse: collapse;
    margin-top: 2rem;
    border-radius: 1rem;

    th, td {
        border-bottom: 1px solid #ddd;
        text-align: left;
        padding: 1rem;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    th {
        background-color: #00425A;
        color: white;
        position: sticky;
        top: 0;
    }

    tr:hover {
        background-color: #ddd;
    }

    td {
        position: relative;
    }

    .delete-button {
        background-color: #f44336;
        color: white;
        border: none;
        border-radius: 0.5rem;
        padding: 0.5rem;
        cursor: pointer;
    }
`

export const Icon = styled.img`
    width: 1rem;
    height: 1rem;
    background-color: transparent;
    margin-left: 0.5rem;
    fill: white;
    cursor: pointer;
    color: white;
    filter: invert(1);
`

export const FilterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 1rem;
    border-radius: 1rem;
    padding: 2rem;
    box-sizing: border-box;
    width: 100%;
    background-color: #F3ECB0;


    .form-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        > div {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        .search {
            input {
                margin: 1rem 0;
                width: 20rem;
                padding: 0.5rem;
                border: none;
                border-radius: 0.5rem;
                margin-right: 1rem;
            }
        }

        .select {
            select {
                margin: 1rem 0;
                width: 20rem;
                padding: 0.5rem;
                border: none;
                border-radius: 0.5rem;
                margin-right: 1rem;

                option {
                    padding: 0.5rem;

                    &:hover {
                        background-color: #ddd;
                    }
                }
            }
        }

        .checkbox {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            margin-right: 1rem;

            input[type=checkbox] {
                margin-right: 0.5rem;
            }
        }
    }

    .button-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        float: right;

        button {
            background-color: #00425A;
            color: white;
            padding: 1rem;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: 0.3s;
            margin-left: 1rem;

            &:hover {
                background-color: #006989;
            }
        }
    }
`