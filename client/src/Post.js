import React from 'react'

const Post = () => {
  return (
    <div>
        <div className="post">
        <div className="image">
          <img src="https://vitejs.dev/logo-with-shadow.png" alt="Logo" />
        </div>
        <div className="texts">
          <h2>Vite works super</h2>
          <p className="info">
            <a className="author">Vamsi</a>
            <time>2023-06-19 05:14</time>
          </p>
          <p className="summary">
            Next Generation Frontend Tooling. Get ready for a development
            environment that can finally catch up with you.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Post