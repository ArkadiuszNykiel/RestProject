
import { useState, useEffect } from "react";
import Country from "./Country"; 
import Loading from "./Loading/Loading";
import "./Countries.css";

function Countries() {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [regionFilter, setRegionFilter] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}`);
            if (!response.ok) throw new Error("Failed to fetch data");

            const result = await response.json();
            setCountries(result);
            setFilteredCountries(result); // Initially set filteredCountries to all fetched countries
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = () => {
        fetchData();
    };

    const handleRegionChange = (e) => {
        const selectedRegion = e.target.value;
        setRegionFilter(selectedRegion);

        // Filter by region
        const filtered = countries.filter(
            (country) => !selectedRegion || country.region === selectedRegion
        );
        setFilteredCountries(filtered);
    };

    const handleCountryClick = (country) => {
        setSelectedCountry(country);
    };

    return (
        <div className="countries-container">
            {/* Left: Search and Countries List */}
            <div className="countries-list-container">
                <h1>Countries</h1>

                {/* Search Input */}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by country"
                />
                <button onClick={handleSearch}>Search</button>

                {/* Region Filter */}
                <select value={regionFilter} onChange={handleRegionChange}>
                    <option value="">All Regions</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Africa">Africa</option>
                    <option value="Oceania">Oceania</option>
                </select>

                {/* Render Filtered Countries */}
                <ul className="countries-list">
                    {isLoading && <Loading />}
                    {filteredCountries.map((country, index) => (
                        <li
                            key={index}
                            onClick={() => handleCountryClick(country)}
                            className="countries-list-item"
                        >
                            <Country param={country} /> {/* Use the Country component */}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right: Selected Country Details */}
            {selectedCountry && (
                <div className="selected-country">
                    <h2>{selectedCountry.name.official}</h2>
                    <img
                        src={selectedCountry.flags.png}
                        alt={`${selectedCountry.name.official} flag`}
                    />
                    <p>
                        <strong>Capital:</strong> {selectedCountry.capital ? selectedCountry.capital[0] : "N/A"}
                    </p>
                    <p>
                        <strong>Currency:</strong>{" "}
                        {selectedCountry.currencies
                            ? Object.values(selectedCountry.currencies)[0].name
                            : "N/A"}
                    </p>
                </div>
            )}
        </div>
    );
}

export default Countries;
