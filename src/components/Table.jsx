import './Table.css'

export function Table({children, headers}) {
    return (
            <table>
                <thead>
                    <tr>
                        {headers.map((header) => {
                            return (
                                <th key={header}>{header}</th>
                            )
                        } )}
                    </tr>
                </thead>
                <tbody>
                        {children}
                </tbody>
            </table>
    )
}

export function TableRow({headers,data, handleClick}) {

    return (
        <tr onClick={handleClick}>
            {headers.map((header) => {
                return (
                    <td key={header}>{data[header]}</td>
                )
            })}
        </tr>
        )
}

export function AddNewButton({handleNew}) {
    return (
        <tr className="addnew" onClick={handleNew}>
            <td colSpan="2">Add new...</td>
        </tr>
    )
}