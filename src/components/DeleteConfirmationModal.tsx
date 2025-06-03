import React from 'react'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }: DeleteConfirmationModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-[#777777CC] overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div 
        className="bg-white p-6 shadow-xl w-[660px] h-[146px] border border-[#999999] rounded-[16px] flex flex-col justify-between"
      >
        <h3 
          className="text-2xl font-bold whitespace-nowrap"
          style={{
            fontFamily: '',
            fontWeight: 700,
            fontSize: '22px',
            lineHeight: '100%',
            letterSpacing: '0%',
          }}
        >
          Are you sure you want to delete this item?
        </h3>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-400 text-gray-700 font-bold hover:bg-gray-100 focus:outline-none"
            style={{ width: '120px', height: '32px', borderRadius: '8px' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg text-white font-bold hover:bg-red-600 focus:outline-none"
            style={{ width: '120px', height: '32px', borderRadius: '8px', backgroundColor: '#FF5151' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal 