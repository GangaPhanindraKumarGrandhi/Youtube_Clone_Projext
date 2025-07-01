import { createContext,useState } from "react";

const ViewChannelContext = createContext()

export function ViewChannelProvider({children}){
    const [viewChannel,setViewChannel] = useState(false)

    return(
        <ViewChannelContext.Provider value={{viewChannel,setViewChannel}}>
            {children}
        </ViewChannelContext.Provider>
    )

}

export default ViewChannelContext;