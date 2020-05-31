import React, { useContext } from 'react'
import { userContext, languageContext } from '../App'


export const ComponentF = () => {
  const user = useContext(userContext)
  const language = useContext(languageContext)
  return (
    <div>
      <div>{user.name}: {language}</div>
      {/* <userContext.Consumer>
        {
          user => {
            return (
              <languageContext.Consumer>
                {
                  language => {
                    return <div>{user.name}: {language}</div>
                  }
                }
              </languageContext.Consumer>
            )
          }
        }
      </userContext.Consumer> */}
    </div>
  )
}
