import { useRef } from 'react';

function Search(props) {

    const searchBox = useRef(null);

    const search = function () {
        props.setSearchQuery(searchBox.current.value)
    }

    const addContact = () => {
        props.addContact();
    }

    return (
        <div>
            <div style={{marginTop: "2%"}} className="input-group ">
                <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-search"></i>
                </span>
                <input ref={searchBox} onKeyUp={search} type="text" className="form-control contacts" placeholder="Type to search in contacts..." />
                <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-person-plus bi-size" onClick={addContact}></i>
                </span>
            </div>
        </div>
    )
}
export default Search