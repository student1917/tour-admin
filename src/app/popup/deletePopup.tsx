
interface DeletePopupProps {
    message: string;
    onConfirm: () => void;
    onClose: () => void;
}


export const DeletePopup = ({message, onConfirm, onClose}: DeletePopupProps) => {

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose}/>
            <div className="bg-white w-[50%] z-1 flex flex-col">
                <div className="flex justify-end p-2">
                    <button onClick={onClose} className="cursor-pointer">
                        <i className="ri-close-line text-lg "></i>
                    </button>    
                </div>
                <span className="block h-px overflow-hidden bg-gray-400 my-4 origin-top scale-y-20"/>
                <div className="flex justify-center mb-6"><i className="ri-delete-bin-line text-5xl text-red-500"></i></div>
                <h4 className="text-center mb-6">{message}</h4>
                <span className="block h-px overflow-hidden bg-gray-400 mb-8 origin-top scale-y-20"/>

                <div id="btn__group" className="flex flex-1 w-[80%] mx-auto justify-between gap-12  mb-8 max-h-16">
                    <button onClick={onClose} className="bg-white border border-[#D0D5DD] text-[#344054] flex flex-1 justify-center items-center font-bold text-2xl py-2  cursor-pointer">Cancel</button>
                    <button onClick={onConfirm} className="bg-red-400 text-white flex flex-1 justify-center items-center font-bold text-2xl py-2 cursor-pointer">Delete</button>

                </div>

            </div>
        </div>
    )
}
