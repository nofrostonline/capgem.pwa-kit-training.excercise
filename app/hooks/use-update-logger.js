import { useEffect } from "react";

export const useUpdateLogger = (value, label='name') => {
    useEffect (() => {
        console.log(label + ' updated to ')
        console.log(value);
    }
     , [value])
}