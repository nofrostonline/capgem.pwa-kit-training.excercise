import React from 'react'
import fetch from 'cross-fetch'

import {List, ListItem} from '@chakra-ui/react'
import Link from '../../../../app/components/link'

import { getAppOrigin } from 'pwa-kit-react-sdk/utils/url'

const ContentSearch = ({contentResult}) => {
    if (!contentResult) {
        return <div>Loading...</div>
    }

    const {hits = []} = contentResult
    return (
        <div>
            {hits.length ? (
                <List>
                    {hits.map(({id, name}) => (
                        <Link key={id} to={`/content/${id}`}>
                            <ListItem>{name}</ListItem>
                        </Link>
                    ))}
                </List>
            ) : (
                <div>No Content Items Found!</div>
            )}
        </div>
    )
}

ContentSearch.getTemplateName = () => 'content-search'
ContentSearch.getProps = async () => {
    let contentResult, error
    //Make a call to the URL substituting Key Values from table
    const res = await fetch(
        `${getAppOrigin()}/mobify/proxy/ocapi/s/RefArch//dw/shop/v20_2/content_search?q=about&client_id=bf54d5e5-2349-4cf2-bcba-b9b9feb73733`
    )
    if (res.ok) {
        contentResult = await res.json()
    }
    if (process.env.NODE_ENV !== 'production') {
        console.log(contentResult)
    }
    return {contentResult}
}
export default ContentSearch