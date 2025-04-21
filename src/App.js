import React from 'react'
import './App.css';
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'

import { CounterOne } from './Component/Hooks/useStateHook/CounterOne';
import { CounterTwo } from './Component/Hooks/useStateHook/CounterTwo';
import { UseSateWithObject } from './Component/Hooks/useStateHook/UseSateWithObject';
import {ClassCounter} from './Component/Hooks/useEffectHook/ClassCounter'
import { HookCounter } from './Component/Hooks/useEffectHook/HookCounter';
import { ClassMouse } from './Component/Hooks/useEffectHook/ClassMouse';
import { MouseContainer } from './Component/Hooks/useEffectHook/MouseContainer';
import { HookMouse } from './Component/Hooks/useEffectHook/HookMouse';
import { IntervalClassCounter } from './Component/Hooks/useEffectHook/IntervalClassCounter';
import { IntervalHookCounter } from './Component/Hooks/useEffectHook/IntervalHookCounter';
import { MultipleHooks } from './Component/Hooks/whyWeNeedHook/MultipleHooks';
import { DataFetching } from './Component/Hooks/useEffectHook/DataFetching';
import { ComponentA } from './Component/Hooks/useContextHook/ComponentA';
import MyTestApp from './Component/Hooks/useEffectHook/useEffectHook';
import { ReducerCounterOne } from './Component/Hooks/useReducerHook/ReducerCounterOne';
import { ReducerCounterTwo } from './Component/Hooks/useReducerHook/ReducerCounterTwo';
import { ReducerCounterThree } from './Component/Hooks/useReducerHook/ReducerCounterThree';
import { DataFetchingOne } from './Component/Hooks/useReducerHook/DataFetchingOne';
import { DataFerchingTwo } from './Component/Hooks/useReducerHook/DataFerchingTwo';
import ParentComponent from './Component/Hooks/useCallBackHook/ParentComponent';
import { Input } from './Component/Hooks/useRefHook/Input';
import UseRefWithDebounce from './Component/Hooks/useRefHook/UseRefWithDebounce';
import { ClassRefCounter } from './Component/Hooks/useRefHook/ClassRefCounter';
import { HookRefCounter } from './Component/Hooks/useRefHook/HookRefCounter';
import { FocusInput } from './Component/ClassComponent/createRef/FocusInput';
import FRParent from './Component/ClassComponent/forwardRef/FRParent';
import { CounterOneForCustom } from './Component/Custom Hooks/Counter/CounterOne';
import { CounterTwoForCustom } from './Component/Custom Hooks/Counter/CounterTwo';
import { CounterThree } from './Component/Hooks/useStateHook/CounterThree';
import ProductDerivedState from './Component/Top Level React Concept/Derived State/ProductDerivedState';
import { UseEffectAsync } from './Component/Hooks/useEffectHook/DeepDive/UseEffectAsync';
import { UseEffectTwo } from './Component/Hooks/useEffectHook/DeepDive/dependency types/UseEffectTwo';
import { UseEffectThree } from './Component/Hooks/useEffectHook/DeepDive/Infinite Loop case/UseEffectThree';
import { Posts } from './Component/Hooks/useEffectHook/DeepDive/cleanup function issue/Posts';
import { Home } from './Component/Hooks/useEffectHook/DeepDive/cleanup function issue/Home';
import { UserById } from './Component/Hooks/useEffectHook/DeepDive/cleanup function issue/UserById';
import { LayOutCompOne } from './Component/Hooks/useLayOutEffect/LayOutCompOne';
import { LayOutCompTwo } from './Component/Hooks/useLayOutEffect/LayOutCompTwo';
import { ExampleOne } from './Component/Hooks/useTransition/ExampleOne';

import ClassContainerComp from './Component/ClassComponent/ClassContainerComp';
import ChallengeContainer from './Challenges/ChallengeContainer';


export const userContext = React.createContext();
export const channelContext = React.createContext();
export const ratingContext = React.createContext(5);

channelContext.displayName = 'myChannel'

function App() {
  return (
   <>
   <div className="App">
   
   {/* <ClassContainerComp/> */}


   <ChallengeContainer/>

   {/* <ExampleOne /> */}
   
   {/* Layout Effect Testing  */}

   {/* <LayOutCompOne /> */}

   {/* <LayOutCompTwo /> */}
   </div>
   </>
  );
}

export default App;
