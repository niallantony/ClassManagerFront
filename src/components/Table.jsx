import styled from 'styled-components'

const StyledTableContainer = styled.div`
    flex:1;
`

const StyledTable = styled.table`
    border-radius: 16px 16px 0 0;
    font-family: "Unna", serif;
    border-spacing: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const StyledTableRow = styled.tr`
    &:hover {
        background-color: ${props => props.theme.hover}
    }
`

const TableCell = styled.td`
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 1rem;
    border-bottom: solid 1px ${props => props.theme.accent};
    color: black;
`

export function Table({ children, headers }) {
  return (
    <StyledTableContainer>
      <StyledTable>
        <thead>
          <tr>
            {headers.map((header) => {
              if (Object.keys(header).includes("width")) {
                return (
                  <TableHeader
                    width={header.width}
                    key={header}
                  >
                    {header.name}
                  </TableHeader>
                )
              } else {
                return (
                  <TableHeader key={header.name}>
                    {header.name}
                  </TableHeader>
                )
              }
            })}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </StyledTable>
    </StyledTableContainer>
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

export function AddNewButton({ width = 2, handleNew }) {
  return (
    <StyledTableRow className="addnew" onClick={handleNew}>
      <TableCell colSpan={width}>Add new...</TableCell>
    </StyledTableRow>
  )
}
