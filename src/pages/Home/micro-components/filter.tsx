import React, {useState} from "react";

import { FilterWrapper } from "./style";

interface FilterProps {
    onApply: (filters: any) => void;
    onClear?: () => void;
}

const Filter = ({ onApply, onClear }: FilterProps) => {
    const [filters, setFilters] = useState({
        search: "",
        gender: "all",
        hasMobile: false,
        hasAddress: false,
    });

    const handleChange = (e: any, type: string) => {
        if (type === "hasMobile" || type === "hasAddress") {
            setFilters({ ...filters, [type]: e.target.checked });
            return;
        }

        setFilters({ ...filters, [type]: e.target.value });
    };

    return <FilterWrapper>
        <div className="form-wrapper">
            <div className="search">
                <span>Search Name</span>
                <input 
                    type="text" 
                    placeholder="Search" 
                    value={filters.search}
                    onChange={(e) => { handleChange(e, "search") }}
                />
            </div>

            <div className="select">
                <span>Select Gender</span>
                <select 
                    onChange={(e) => { handleChange(e, "gender") }}
                >
                    <option value="all">All</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>

            <div className="checkbox">
                <input type="checkbox"  onChange={(e) => { handleChange(e, "hasMobile") }} />
                <span>Has Mobile Number</span>
            </div>

            <div className="checkbox">
                <input type="checkbox" onChange={(e) => { handleChange(e, "hasAddress") }} />

                <span>Has Address</span>
            </div>
        </div>

        <div className="button-wrapper">
            <button onClick={() => { onClear && onClear() }} > Cancel </button>
            <button onClick={() => { onApply && onApply( filters )}}>
                Apply
            </button>
        </div>

    </FilterWrapper>;
};

export default Filter;