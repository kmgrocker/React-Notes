
import React from 'react'
import UseEffectCompOne from "./useEffectHook/DeepDive/lifecycle/UseEffectCompOne"
import UseEffectCompTwo from "./useEffectHook/DeepDive/lifecycle/UseEffectCompTwo"
import { UsememoCompWithUseMemo } from './useMemoHook/UseMemoCompOne'
import { UseMemoCompWithUseMemoTwo } from './useMemoHook/UseMemoCompOne'
import { UseMemoCompTwo } from './useMemoHook/UseMemoCompTwo'
import { UsememoCompThree } from './useMemoHook/UsememoCompThree'
export const HookContainer = () => {
    return (
        <div>
            {/* <UseEffectCompOne/> */}
            {/* <UseEffectCompTwo/> */}
            {/* <UsememoCompWithUseMemo/> */}
            {/* <UseMemoCompWithUseMemoTwo/> */}
            {/* <UseMemoCompTwo/> */}
            <UsememoCompThree/>
        </div>
    )
}