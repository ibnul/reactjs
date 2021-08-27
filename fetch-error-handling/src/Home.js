import { useState, useEffect } from 'react';
import BlogList from './BlogList';

const Home = () => {

    const [blogs, setBlogs] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    // const [name, setName] = useState('mario')

    // const handleDelete = (id) => {
    //     const newBlogs = blogs.filter(blog => blog.id !== id)
    //     setBlogs(newBlogs)
    // }

    useEffect(() => {
        setTimeout( () => {
            fetch('http://localhost:8000/blogs')  
            .then(res=> {
                if ( !res.ok )
                    throw Error('Could not fetch the data for that resource')
                return res.json()
            })    
            .then( (data) => {
                // console.log(data);
                setBlogs(data)
                setIsPending(false)
                setError(null)
            })
            .catch( (err) => {
                setIsPending(false)
                setError(err.message)
                console.log(err.message);
                
            })
        }, 1000)
    }, [])

    return ( 
        <div className="home">
            { error && <div> { error } </div> }
            { isPending && <div>Loading...</div> }
            { blogs && <BlogList blogs = { blogs } title="All Blogs" /> } 
            {/* { blogs && <BlogList blogs = { blogs } title="All Blogs"  handleDelete = { handleDelete }/> }  */}
            {/* <button onClick={() => setName('luigi')}>Change Name</button>
            <p>{ name }</p> */}
            {/* <BlogList blogs = { blogs.filter((blog) => blog.author === 'mario') } title="Mario's Blogs" />  */}
        </div>
     );
}
 
export default Home;