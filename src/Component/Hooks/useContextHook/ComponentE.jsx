import React, { Component } from 'react'
import { userContext, channelContext, ratingContext } from '../../../App'
export class ComponentE extends Component {
    // static contextType = channelContext
  render() {
    return (
      <div>
        {/* <h3>coming from Component E {this.context}</h3> */}
        <channelContext.Consumer>
                {channel=>{
                    return (
                        <userContext.Consumer>
                            {user=>{
                                return (
                                    <ratingContext.Consumer>
                                        {rating=>{
                                            return (
                                                <div>i am <b>{user}</b> my chnnel is <b>{channel}</b> my current rating is <b>{rating}</b></div>
                                            )
                                        }}
                                    </ratingContext.Consumer>
                                )
                            }}
                        </userContext.Consumer>
                    )
                }}
            </channelContext.Consumer>
      </div>
    )
  }
}

