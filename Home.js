import "./Home.css";

function Home() {
    return (
        <div className="home-container">
            <h1>Universal Country Database</h1>
            <p>
                This site connects with the REST Countries API. You can filter the countries by region. Upon clicking a country more details are displayed on the right
                
            </p><br></br>
            <h2>Features</h2><br></br>
            <ul>
                <li>Search - browse the REST Countries Database</li>
                <li>Filter - Filter by region</li>
                <li>Detailed view - Click any country for more details</li>
            </ul>
        </div>
    );
}

export default Home;
