import {h} from 'preact'
import { useQuery, gql } from '@apollo/client'

const GET_PROJECTS = gql`
query{
  getProjects {
    id
    title
  }
}

`

export function Projects(){
    const { loading, error, data } = useQuery(GET_PROJECTS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Errot : {error.message}</p>

    console.log(data.getProjects[0].id)

    return data.getProjects.map(({id, title}) => (
        <div><a href={`/project/${id}`}>{title}</a>{id}</div>
    ))
}