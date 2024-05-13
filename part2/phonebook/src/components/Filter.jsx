const Filter =({searchQuery, handleSearch}) => {
    return (
        <div>
            Search: <input value={searchQuery} onChange={handleSearch} />
        </div>
    )
}


export default Filter