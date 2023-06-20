import { List, Paper } from '@mui/material'
import { EntryCard } from './EntryCard'
import { useSelector } from 'react-redux'

export const EntryList = ({ status }) => {

    const entries = useSelector(state => state.entries)

    return (
        <Paper sx={{
            height: '100%',
            overflow: 'auto',
            padding: '1px 5px',
            boxShadow:'none'
        }}>
            <List sx={{ opacity: 1, transition: 'all.3s' }}>
                {
                    entries.map((e) => {
                        return e.status === status &&
                            <EntryCard key={e._id} entry={{
                                _id: e._id,
                                description: e.description,
                                createAt: e.createAt,
                                status: e.status,
                            }} />
                    })
                }


            </List>


        </Paper>

    )
}
