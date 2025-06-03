import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import CreatePost from '../components/CreatePost'
import PostActions from '../components/PostActions'
import DeleteConfirmationModal from '../components/DeleteConfirmationModal'
import EditPostModal from '../components/EditPostModal'

interface Post {
  id: number
  username: string
  created_datetime: string
  title: string
  content: string
}

function Home() {
  const [username, setUsername] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<number | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [postToEdit, setPostToEdit] = useState<Post | null>(null)

  const queryClient = useQueryClient()

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await axios.get('https://dev.codeleap.co.uk/careers/')
      return response.data.results
    },
  })

  const deletePostMutation = useMutation({
    mutationFn: async (postId: number) => {
      await axios.delete(`https://dev.codeleap.co.uk/careers/${postId}/`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setIsDeleteModalOpen(false)
      setPostToDelete(null)
    },
  })

  const updatePostMutation = useMutation({
    mutationFn: async ({ postId, title, content }: { postId: number, title: string, content: string }) => {
      const response = await axios.patch(`https://dev.codeleap.co.uk/careers/${postId}/`, { title, content })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setIsEditModalOpen(false)
      setPostToEdit(null)
    },
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      setIsLoggedIn(true)
    }
  }

  const handleDeleteClick = (postId: number) => {
    setPostToDelete(postId)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (postToDelete !== null) {
      deletePostMutation.mutate(postToDelete)
    }
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setPostToDelete(null)
  }

  const handleEditClick = (post: Post) => {
    setPostToEdit(post)
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = (postId: number, title: string, content: string) => {
    updatePostMutation.mutate({ postId, title, content })
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setPostToEdit(null)
  }

  // Helper function to format date/time
  const formatDateTime = (datetimeString: string) => {
    const date = new Date(datetimeString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) {
        return "now";
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 60 * 24) {
        const hours = Math.floor(diffInMinutes / 60);
        return `${hours} hours ago`;
    } else if (diffInMinutes < 60 * 24 * 7) {
        const days = Math.floor(diffInMinutes / (60 * 24));
        return `${days} days ago`;
    } else {
        // Fallback to locale string if it's older than a week
        return date.toLocaleString();
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="bg-white p-4 rounded-[16px] shadow-lg w-[500px] h-[205px] border border-gray-300">
          <h1 className="text-2xl font-bold mb-4">Welcome to CodeLeap network!</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-base font-normal text-gray-700 mb-2">
                Please enter your username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-[452px] h-[32px] p-2 border border-[#CCCCCC] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John doe"
              />
            </div>
            <div className="flex justify-end w-[452px] ml-auto">
              <button
                type="submit"
                disabled={!username.trim()}
                className={`px-7 py-2 rounded-[8px] text-white font-bold w-[111px] h-[32px] flex items-center justify-center ${username.trim() ? 'bg-[#7695EC] hover:bg-[#8F9FEB]' : 'bg-blue-300 cursor-not-allowed'}`}
              >
                ENTER
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-md overflow-hidden mx-auto">
        {/* Top blue bar inside white container */}
        <header className="w-full bg-codeleap-blue text-white px-9 py-5 text-2xl font-semibold flex items-center">
          CodeLeap Network
        </header>

        <div className="p-6 space-y-6">
            <CreatePost username={username} />

            <main>
              {isLoading ? (
                <div className="text-center">Loading posts...</div>
              ) : (
                <div className="space-y-6">
                  {posts?.map((post) => (
                    <article key={post.id} className="bg-white rounded-[16px] shadow-md overflow-hidden border border-gray-300">
                      <div className="bg-codeleap-blue text-white px-6 py-4 flex justify-between items-center">
                        <h2 className="text-xl font-bold">{post.title}</h2>
                        {post.username === username && (
                           <div className="flex space-x-4 items-center">
                             <PostActions 
                               post={post} 
                               currentUsername={username} 
                               onDeleteClick={handleDeleteClick}
                               onEditClick={handleEditClick}
                             />
                           </div>
                        )}
                      </div>
                      <div className="p-6">
                         <div className="flex justify-between items-center mb-4 text-gray-500 text-sm">
                          <p className="font-bold text-gray-800">@{post.username}</p>
                          <p className="text-gray-500 text-sm">{formatDateTime(post.created_datetime)}</p>
                         </div>
                        <p className="text-gray-700 break-words mt-4">{post.content}</p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </main>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      {/* Edit Post Modal */}
      <EditPostModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveEdit}
        post={postToEdit}
      />
    </div>
  )
}

export default Home 