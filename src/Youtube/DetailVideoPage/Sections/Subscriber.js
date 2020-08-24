import React, {useEffect, useState} from 'react'
import axios from 'axios'

function Subscriber(props) {
  
    const baseUrl = "http://localhost:5000/subscribe";
    const userTo = props.userTo
    const userFrom = props.userFrom
    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)
    
    const onSubscribe = () => {

        let subscribeVariables = {
            userTo: userTo,
            userFrom: userFrom
        }
        if(Subscribed){
                //when you are subcribed
            axios.post(`${baseUrl}/unSubscribe`, subscribeVariables)
            .then(res => {
                if(res.data.success){
                    setSubscribeNumber(SubscribeNumber - 1)
                    setSubscribed(!Subscribed)
                }else{
                    alert('Failed to unsubscribe')
                }
            })
        }else{
            // not subscribed
            axios.post(`${baseUrl}/subscribe`, subscribeVariables)
            .then(res => {
                if(res.data.success){
                   setSubscribeNumber(SubscribeNumber + 1)
                   setSubscribed(!Subscribed)
                }else{
                    alert('Failed to Subscribe')
                }
            })
        }
    }

    useEffect(() => {
        const subscribeNumberVariable = {
             userTo: userTo,
             userFrom: userFrom
        }
        axios.post(`${baseUrl}/subscribeNumber`, subscribeNumberVariable)
        .then(res => {
            if(res.data.success){
                setSubscribeNumber(res.data.subscribeNumber)
            }else{
                alert('Failed to get Subscriber Number')
            }
        })
        axios.post(`${baseUrl}/subscribed`, subscribeNumberVariable)
            .then(res => {
                if(res.data.success){
                  setSubscribed(res.data.subscribed)
                }else{
                    alert('Failed to get subscribed info')
                }
            })
    }, [])
    return (
        <div>
            <button 
            onClick={onSubscribe}
            style={{color: "white", backgroundColor:`${Subscribed ? '#AAAAAA' : '#CC0000'}`, borderRadius: "4px", padding: "10px 16px", fontWeight: '500', fontSize:"1rem", textTransform:"uppercase"}}>
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscriber
