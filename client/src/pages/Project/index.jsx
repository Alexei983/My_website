import { gql, useQuery } from '@apollo/client';
import {h} from 'preact'
import { useState } from 'preact/hooks'



export function Project(){
    const id = this.props.params.id;
    const GET_ONE_PROJECT = gql`
query{
  getOneProject(id: ${id}) {
    id
    title
  }
}
`
    const {loading, error, data} = useQuery(GET_ONE_PROJECT)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    console.log(data.getOneProject.title)
    return(
        <div>
            <h1>{data.getOneProject.title}</h1>
        </div>
    )
}