import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

interface CreatePostProps {
  username: string
}

function CreatePost({ username }: CreatePostProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const queryClient = useQueryClient()

  const createPost = useMutation({
    mutationFn: async (newPost: { title: string; content: string; username: string }) => {
      const response = await axios.post('https://dev.codeleap.co.uk/careers/', newPost)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setTitle('')
      setContent('')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && content.trim()) {
      createPost.mutate({ title, content, username })
    } else {
      // Opcional: mostrar um feedback para o usuário
      console.log('Title and content cannot be empty')
    }
  }

  return (
    <div className="bg-white p-6 rounded-[16px] shadow-md mb-8 border border-gray-300">
      <h2 className="text-xl font-bold mb-4">What's on your mind?</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-base font-normal text-gray-700 mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Hello world"
            className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-base font-normal text-gray-700 mb-2">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content here"
            className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!title.trim() || !content.trim()}
            className={`w-[120px] h-[32px] rounded-lg text-white font-bold ${title.trim() && content.trim() ? 'bg-codeleap-blue hover:bg-blue-600' : 'bg-blue-300 cursor-not-allowed'}`}
          >
            CREATE
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost 