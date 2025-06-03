import React, { useState, useEffect } from 'react'

interface EditPostModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (postId: number, title: string, content: string) => void
  post: {
    id: number
    title: string
    content: string
  } | null
}

function EditPostModal({ isOpen, onClose, onSave, post }: EditPostModalProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // Update local state when the post prop changes
  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
    } else {
      setTitle('')
      setContent('')
    }
  }, [post])

  const handleSave = () => {
    if (post) {
      onSave(post.id, title, content)
    } else {
      // Handle case where post is null, though button should be disabled
      console.error("Attempted to save with no post selected")
    }
  }

  const handleCancel = () => {
    onClose()
  }

  if (!isOpen || !post) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-[#777777CC] overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="bg-white p-6 shadow-xl w-[500px] border border-[#999999] rounded-[16px] flex flex-col justify-between">
        <h3 
          className="mb-4"
          style={{
            fontFamily: '',
            fontWeight: 700,
            fontSize: '22px',
            lineHeight: '100%',
            letterSpacing: '0%',
          }}
        >
          Edit item
        </h3>
        <div className="flex flex-col space-y-4">
          <div>
            <label htmlFor="edit-title" className="block text-sm font-normal text-gray-700 mb-1">Title</label>
            <input
              type="text"
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-codeleap-blue focus:border-transparent text-sm h-[32px]"
              placeholder="Hello world"
            />
          </div>
          <div>
            <label htmlFor="edit-content" className="block text-sm font-normal text-gray-700 mb-1">Content</label>
            <textarea
              id="edit-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-codeleap-blue focus:border-transparent text-sm h-[74px]"
              placeholder="Content here"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={handleCancel}
            className="px-7 py-2 rounded-[8px] border border-gray-400 text-gray-700 font-bold hover:bg-gray-100 focus:outline-none text-base font-sans w-[120px] h-[32px] flex items-center justify-center"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim()}
            className={`px-7 py-2 rounded-[8px] text-white font-bold focus:outline-none text-base font-sans w-[120px] h-[32px] flex items-center justify-center ${title.trim() && content.trim() ? 'bg-green-500 hover:bg-green-600' : 'bg-green-300 cursor-not-allowed'}`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditPostModal 