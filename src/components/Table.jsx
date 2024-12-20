import styled from 'styled-components'

const StyledTable = styled.table`
    border-radius: 16px 16px 0 0;
    font-family: "Unna", serif;
    flex:1;
    border-spacing: 0;
    border-collapse: separate;
    overflow: hidden;
    margin: 1rem;
`
const TableHeader = styled.th`
    border: solid 1px ${props => props.theme.accent};
    font-weight: 400;
    background-color: ${props => props.theme.accent};
    color: ${props => props.theme.light};
    border:0;
    text-align: left;
    padding: 1rem;
    border-bottom: solid 1px ${props => props.theme.accent};
`

const StyledTableRow = styled.tr`
    &:hover {
        background-color: ${props => props.theme.hover}
    }

`

const TableCell = styled.td`
    padding: 1rem;
    border-bottom: solid 1px ${props => props.theme.accent};
    color: black;
`

export function Table({ children, headers }) {
    return (
        <StyledTable>
            <thead>
                <tr>
                    {headers.map((header) => {
                        return (
                            <TableHeader key={header}>{header}</TableHeader>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </StyledTable>
    )
}

export function TableRow({ headers, data, handleClick }) {

    return (
        <StyledTableRow onClick={handleClick}>
            {headers.map((header) => {
                return (
                    <TableCell key={header}>{data[header]}</TableCell>
                )
            })}
        </StyledTableRow>
    )
}

export function AddNewButton({ handleNew }) {
    return (
        <StyledTableRow className="addnew" onClick={handleNew}>
            <TableCell colSpan="2">Add new...</TableCell>
        </StyledTableRow>
    )
}
