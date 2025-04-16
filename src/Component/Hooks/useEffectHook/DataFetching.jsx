import React, { useState, useEffect } from 'react'
// import axios from 'axios'

export function DataFetching() {
	const [post, setPost] = useState({})
	const [id, setId] = useState(1)
	const [idFromButtonClick, setIdFromButtonClick] = useState(1)

	useEffect(() => {
        // let url1 = `https://jsonplaceholder.typicode.com/posts/${id}`
        let url2 = `https://jsonplaceholder.typicode.com/posts/${idFromButtonClick}`
			fetch(url2)
			.then(res => {
                return res.json();
			}).then(data=>{            
                setPost(data)
            }).catch(err => {
				console.log(err)
			})
	}, [idFromButtonClick]) 

    // url1=> id as dependecy (API runs on every charecter type )
    // url2 => idFromButtonClick as dependecy (API runs on click )

    // if we give id as dependency it will automatically update the post since useEffect will render based on id but it will do the API call on every charecter Type in input 

    // ! for this kind of useCase we use Debounce and Dethrottle functionlaity

	const handleClick = () => {
		setIdFromButtonClick(id)
	}

	return (
		<div>
			<input type="text" value={id} onChange={e => setId(e.target.value)} />
			<button type="button" onClick={handleClick}>Fetch Post</button>
			<div>{post.title}</div>
			{/* <ul>
				{posts.map(post => (
          <li key={post.id}>{post.title}</li>
				))}
			</ul> */}
		</div>
	)
}

