import React, { useState, useEffect } from 'react'


export const DataFetchById = () => {
  const [post, setPost] = useState(null)
  const [id, setId] = useState(1)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const item = await response.json()
    setPost(item)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <div>
      <input
        type='text'
        value={id}
        onChange={e => setId(e.target.value)}
      />
      {loading ? <h1>Loading...</h1> : <h1>{post.title}</h1>}
    </div>
  )
}
