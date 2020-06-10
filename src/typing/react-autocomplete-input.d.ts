declare module 'react-autocomplete-input' {
    import { Component } from 'react';
    declare class TextInput extends Component<any> {
        constructor(props: any);
    }

    // This is commented out because I ran into trouble passing down the props of the Component
    // through the TextInput within the type system. There is probably a way to do it but since
    // this is a small personal project I'm not going to take the time.


    // export interface TextInputProps<T> extends T {
    //     Component?: string | ReactNode;
    //     defaultValue ?: string;
    //     disabled?: boolean;
    //     maxOptions?: number;
    //     onRequestOptions ?: () => void;
    //     matchAny?: boolean;
    //     offsetX?: number;
    //     offsetY?: number;
    //     options?: string[];
    //     regex?: RegExp;
    //     requestOnlyIfNoOptions?: boolean;
    //     spaceRemovers?: string[];
    //     // Character which is inserted along with the selected option.
    //     spacer?: string;
    //     trigger?: string;
    //     minChars?: number;
    //     value?: string;
    // }

    export default TextInput;
}