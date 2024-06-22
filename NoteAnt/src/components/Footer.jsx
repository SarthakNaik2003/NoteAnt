import Currency from "./Currency"

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }

    return (
        <div style={footerStyle}>
            <br />
            <em>Note app, Department of Computer Science, University of Sarthak Boss 007 2024</em>
            <Currency />
        </div>
    )
}

export default Footer