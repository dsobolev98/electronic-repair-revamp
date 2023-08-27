import React from 'react'
import DecisionData from '@/utils/status/decision.json'
import StatusData from '@/utils/status/status.json'

function StatusDetail({
    DecisionId,
    StatusId
}:{
    DecisionId: number,
    StatusId: number
}) {
    const DecisionIdString: string = DecisionId.toString()
    const StatusIdString: string = StatusId.toString()
    
    const DecisionText = DecisionData[DecisionIdString as keyof typeof DecisionData]?.Description
    const StatusText = StatusData[StatusIdString as keyof typeof StatusData].Description

    return (
        <div>
            <p>{StatusText}</p>
            <p>{DecisionText}</p>
        </div>
    )
}

export default StatusDetail