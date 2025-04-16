import React from 'react'
import { userContext, channelContext, ratingContext } from '../../../App'
import { ComponentD } from './ComponentD'

export const ComponentC = () => {
    // const username = useContext(userContext)
    // const channelname = useContext(channelContext)
    // const rating = useContext(ratingContext)
    return (
        <div>
            <div>Context result without hook this can be used in class component also coming from component c</div>
            <userContext.Consumer>
                {user => {
                    return (
                        <channelContext.Consumer>
                            {channel => {
                                return (
                                    <ratingContext.Consumer>
                                        {
                                            rating => {
                                                return (
                                                    <div>I am <b>{user}</b> our channel is <b>{channel}</b> and our rating is <b>{rating}</b></div>
                                                )
                                            }
                                        }
                                    </ratingContext.Consumer>
                                )
                            }}
                        </channelContext.Consumer>
                    )
                }}
            </userContext.Consumer>
            <ComponentD/>
        </div>
    )
}
