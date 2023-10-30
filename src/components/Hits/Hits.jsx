export default function Hits({data}) {
    return <div>
        {data.map((item, index) => <div key={index}>
            {item}
        </div>)}
    </div>
}
