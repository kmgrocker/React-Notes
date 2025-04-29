import React from 'react';
import { ParentClassComp } from './ClassCompTwo/ParentClassComp';
import { MyComponent } from './createRef/MyComponent';
import { FocusInput } from './createRef/FocusInput';
import { ClassCodeThree } from './ClassCompBasics/ClassCodeThree';
import { HOCContainer } from './HOC/HOCContainer';
export default class ClassContainerComp extends React.Component {
    render() {
        return (
            <div>
                <h1>Container Component</h1>
                 {/* <ParentClassComp/> */}
                 {/* <MyComponent headerText="this is header text"  >
                    this is Ref example 
                 </MyComponent> */}
                 {/* <FocusInput /> */}
                 {/* <ClassCodeThree/> */}
                 <HOCContainer/>
            </div>
        );
    }
}