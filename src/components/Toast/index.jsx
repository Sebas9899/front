import Toast from 'react-bootstrap/Toast';
import check from '../../assets/check.png'
import danger from '../../assets/danger.png'
import info from '../../assets/info.png'

export const ToastAlert = ({ actions, setToggle }) => {

    const handleClose = () => {
        setToggle({
            text: "",
            title: "",
            type: "",
            show: false
        })
    }

    return (
        <Toast bg='light' className='toast-alert' show={actions.show} onClose={handleClose}>
            <Toast.Header>
                <img 
                    src={actions.type === "success" ? check : actions.type === "danger" ? danger : info} 
                    className="rounded me-2" 
                    alt={actions.type} />
                <strong className="me-auto">{actions.title}</strong>
            </Toast.Header>
            <Toast.Body>{actions.text}</Toast.Body>
        </Toast>
    );
}
