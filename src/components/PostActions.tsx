import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

interface PostActionsProps {
  post: {
    id: number
    username: string
    title: string
    content: string
    created_datetime?: string
  }
  currentUsername: string
  onDeleteClick: (postId: number) => void;
  onEditClick: (post: { id: number; title: string; content: string, username: string, created_datetime: string }) => void;
}

function PostActions({ post, currentUsername, onDeleteClick, onEditClick }: PostActionsProps) {
  if (post.username !== currentUsername) {
    return null
  }

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => onDeleteClick(post.id)}
        className="text-white hover:text-gray-300 focus:outline-none"
        aria-label="Delete post"
      >
        <svg width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.80087 20.75C1.80087 22.125 2.971 23.25 4.40115 23.25H14.8023C16.2324 23.25 17.4025 22.125 17.4025 20.75V5.75H1.80087V20.75ZM4.99921 11.85L6.83241 10.0875L9.6017 12.7375L12.358 10.0875L14.1912 11.85L11.4349 14.5L14.1912 17.15L12.358 18.9125L9.6017 16.2625L6.84541 18.9125L5.01221 17.15L7.76851 14.5L4.99921 11.85ZM14.1522 2L12.852 0.75H6.35136L5.05122 2H0.500732V4.5H18.7027V2H14.1522Z" fill="white"/>
        </svg>
      </button>
      <button
        onClick={() => onEditClick({ id: post.id, title: post.title, content: post.content, username: post.username, created_datetime: post.created_datetime || '' })}
        className="text-white hover:text-gray-300 focus:outline-none"
        aria-label="Edit post"
      >
        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.101074 18.2663L5.83858 18.2475L18.3615 6.3225C18.853 5.85 19.1234 5.2225 19.1234 4.555C19.1234 3.8875 18.853 3.26 18.3615 2.7875L16.2995 0.805C15.3166 -0.14 13.6017 -0.135 12.6266 0.80125L0.101074 12.7288V18.2663ZM14.4611 2.5725L16.527 4.55125L14.4507 6.52875L12.3887 4.5475L14.4611 2.5725ZM2.70135 13.7713L10.5412 6.305L12.6032 8.2875L4.76467 15.7513L2.70135 15.7575V13.7713Z" fill="white"/>
        </svg>
      </button>
    </div>
  )
}

export default PostActions 