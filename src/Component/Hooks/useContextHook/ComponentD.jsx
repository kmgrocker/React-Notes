import React,{Component} from 'react'
import { userContext, channelContext, ratingContext } from '../../../App'

export class ComponentD extends Component {
    // static contextType = ratingContext //! this is also way to consume context but this way we can only consume one context and this is only valid for class
  render(){
    return (
        <div>
            <div>Context result without hook coming from class component</div>
            <channelContext.Consumer>
                {channel=>{
                    return (
                        <userContext.Consumer>
                            {user=>{
                                return (
                                    <ratingContext.Consumer>
                                        {rating=>{
                                            return (
                                                <div>i am <b>{user}</b> my chnnel is <b>{channel}</b> my current rating is <b>{rating} again</b></div>
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

// ComponentD.contextType = ratingContext  //! this ois also valid but we can use latest class static property feature