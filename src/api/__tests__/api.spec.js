// src/api/__tests__/api.spec.js
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { searchCard } from '../api.js'

describe('API Tests', () => {
  let mockAxios

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
  })

  afterEach(() => {
    mockAxios.restore()
  })

  it('should fetch cards', async () => {
    const mockPosts = [{ id: 1, title: 'Test Post' }]
    mockAxios.onGet('https://api.example.com/posts').reply(200, mockPosts)

    const posts = await getPosts()
    expect(posts).toEqual(mockPosts)
  })

  it('should create a post', async () => {
    const newPost = { title: 'New Post' }
    const createdPost = { id: 2, ...newPost }
    mockAxios.onPost('https://api.example.com/posts').reply(201, createdPost)

    const result = await createPost(newPost)
    expect(result).toEqual(createdPost)
  })

  it('should handle errors', async () => {
    mockAxios.onGet('https://api.example.com/posts').reply(500)

    await expect(getPosts()).rejects.toThrow()
  })
})