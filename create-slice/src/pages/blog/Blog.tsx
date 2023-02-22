import CreatePost from './components/CreatePost'
import PostList from './components/PostList'

export const Blog = () => {
  return (
    <div className='p-5'>
      <CreatePost />
      <PostList />
    </div>
  )
}
