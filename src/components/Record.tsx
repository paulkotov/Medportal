import * as React from 'react';

interface IRecord{

}

type Props = {
    records: Array< number | string>,
    row: number,
    time: string
};

type State = {
    row: Array< number | string>
};

class Record extends React.PureComponent<Props, State>{
    state: State = {
        row: []
    };


    render(){
        const { records, row, time } = this.props;
        return (
            <tr>
                <td>{time}</td>
                {
                    records.map((record, index) => (
                        <td className={`${row}-${index}`} 
                            key={index} 
                            onClick={(e) => console.log(e.target)} 
                            style={{ cursor: 'pointer' }}
                        >
                            {record}
                        </td>
                    ))
                }
            </tr>
        );    
    }
}

export default Record;