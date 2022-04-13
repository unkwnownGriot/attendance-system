import React from 'react';
import {Button} from 'react-bootstrap';


type showProps ={
    show:boolean,
    onClose:()=> void,
    title:string,
    children?:JSX.Element|JSX.Element[]|string
}

const ShowModal = ({show,onClose,title,children}:showProps) => {
    if(!show){
        return null
    }
    return (
        <div className='show-modal' onClick={onClose}>
            <div className="modal_content" onClick={(e)=> e.stopPropagation()}>
                <div className="modal_header">
                    <h1 className="modal_title">{title}</h1>
                </div>
                <div className="modal_body">
                    {children}
                </div>
                <div className="modal_footer">
                    <Button variant='secondary'  onClick={onClose}>Close</Button>
                </div>
            </div>
        </div>
    );
};

export default ShowModal;