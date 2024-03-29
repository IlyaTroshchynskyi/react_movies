import React from 'react';
import {Fragment} from 'react';
import ReactDOM from 'react-dom';


const Backdrop = (props) => {
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true"
             onClick={props.onClose}>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">

            </div>
        </div>)
};

const ModalOverlay = (props) => {
    return (
        <div className="float-left w-full p-4 items-center fixed z-20">

            <div id='inner'
                 className="relative transform overflow-hidden rounded-lg bg-white  mx-auto
             shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div
                            className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                            </svg>
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Are you
                                sure you want to delete record?</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        onClick={props.onDelete}
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 sm:ml-3 sm:w-auto">
                        Delete
                    </button>
                    <button
                        type="button"
                        onClick={props.onClose}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300 sm:mt-0 sm:w-auto">Cancel
                    </button>
                </div>
            </div
            >
        </div>
    )

};

const portalElement = document.getElementById('delete-confirmation');

const ModalConfirmation = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
            {ReactDOM.createPortal(
                <ModalOverlay onClose={props.onClose} setDeleting={props.setDeleting}
                              onDelete={props.onDelete}>{props.children}
                </ModalOverlay>,
                portalElement
            )}
        </Fragment>
    );
};

export default ModalConfirmation;

