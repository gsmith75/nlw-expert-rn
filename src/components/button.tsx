import { ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps,  Text } from "react-native";

type ButtonProps = TouchableOpacityProps &{
    children: ReactNode;
}

type ButtonTextProps = {
    children: ReactNode;
}

type ButtonIconProps = {
    children: ReactNode;
}

function Button({children, ...rest}: ButtonProps){
    return (
        <TouchableOpacity  className="h-12 bg-lime-400 rounded-md  items-center justify-center flex-row"
        activeOpacity={0.7} {...rest}>
            {children}
            
        </TouchableOpacity>
    )

}

function buttonText({children}: ButtonTextProps){
    return (
        <Text className="text-black font-heading text-base mx-2">{children}</Text>
    )
}

function buttonIcon({children}: ButtonIconProps) {
    return children;
}

Button.Text = buttonText
Button.Icon = buttonIcon

export  { Button }