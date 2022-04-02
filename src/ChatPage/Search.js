import {useRef} from 'react';

function Search(props){

    const searchBox = useRef(null);

    const search = function(){
        props.setSearchQuery(searchBox.current.value)
    }

    return (
        <div>
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">@</span>
            <input ref={searchBox} onKeyUp={search} type="text" className="form-control contacts" placeholder="Type to search in contacts..."/>
            </div>
        </div>
    )
}
export default Search