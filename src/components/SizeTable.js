
function SizeTable ({sizes, active, handleClick}) {

    return <>
        <div className={`border p-2 m-2 size-box ${active===sizes.us ? 'border-warning bg-warning text-light' : 'border-dark'}`} 
            data-value={sizes.us}
            onClick={(e)=>handleClick(e)}>
        <div className="text-center">{sizes.us}</div><div className="text-center">{sizes.eu}</div>
    </div></>
}

export default SizeTable;