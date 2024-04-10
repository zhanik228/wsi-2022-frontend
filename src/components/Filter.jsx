import Select from "./ui/Select";

const options = [
    {
        name: 'Popularity',
        value: 'popular'
    },
    {
        name: 'Recently Uploaded',
        value: 'uploaddate'
    },
    {
        name: 'Alphabetically',
        value: 'title'
    }
]

const filterDirOptions = [
    {
        name: 'ASC',
        value: 'asc'
    },
    {
        name: 'DESC',
        value: 'desc'
    },
]

const Filter = ({ availableGames, filterBy, setFilterBy, filterDir, setFilterDir }) => {
    return (
        <div className="p-2 sm:flex justify-between gap-5">
            <h1>Available Games: { availableGames }</h1>
            <div className="flex gap-2">
                <Select selectedValue={ filterBy } title="Sort By..." options={ options } setSelected={ setFilterBy } />
                <Select selectedValue={ filterDir } title="Sort Direction..." options={ filterDirOptions } setSelected={ setFilterDir } />
            </div>
        </div>
    );
}

export default Filter;