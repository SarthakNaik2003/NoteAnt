const Note = ({ note, toggleImportance }) => {
    const lable = note.important
        ? "make not important" : "make important"

    return (
        <li className="note">
            {note.content}
            <button className="btn btn-info btn-sm text-right m-2" onClick={toggleImportance}>{lable}</button>
        </li>
    )
}

export default Note