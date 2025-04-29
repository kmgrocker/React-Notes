import React from 'react'
import HoverCounter from "../HOC/HOCOne/HoverCounter"
import ClickCounter  from '../HOC/HOCOne/ClickCounter'
import HOCTwoCompOne  from './HOCTwo/HOCTwoCompOne'
import HOCTwoCompTwo  from './HOCTwo/HOCTwoCompTwo'
import HocThreeCompOne from './HOCThree/HocThreeCompOne'
import HocThreeCompTwo from './HOCThree/HocThreeCompTwo'
import HeroHoc from './HOCChallenge/HeroHoc'


export function HOCContainer(){
    return (
        <>
         {/* <ClickCounter name='clickCount' />
         <HoverCounter /> */}

          <h1 className='m-2'>********** break ******** </h1>

         {/* <HOCTwoCompOne name='first' />
         <HOCTwoCompTwo name='second' variant='two' /> */}

         <h1 className='m-2'>********** break ******** </h1>

         {/* <HocThreeCompOne text='HocThreeCompOne' />
         <HocThreeCompTwo text='HocThreeCompTwo' /> */}

         <HeroHoc name="joker" />
        </>
    )
} 