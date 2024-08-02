import { useQuery } from '@apollo/client'
import { GET_CLIENTS } from '../../graphql/queries'

export default function HomePage() {
    const { data } = useQuery(GET_CLIENTS)

    return (
        <div>
            <h1>Dashboard</h1>
            {data?.getAllClients?.map((d: { id: string }) => d.id)}
        </div>
    )
}
