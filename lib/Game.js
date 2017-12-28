import Row from "./Row";
import Cell from "./Cell";
import Footer from "./Footer";

class Game extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            gameState: 'ready'
        };
    }
    componentDidMount() {
        setTimeout(() => this.setState({
            gameState: 'memorize'
        }), 2000);
        setTimeout(() => this.setState({
            gameState: 'recall'
        }), 4000);
    }    
    render() { 
        let matrix = [], row; 

        for (let r = 0; r < this.props.rows; r++) { 
            row = []; 
            for (let c = 0; c < this.props.columns; c++) { 
                row.push(`Row: ${r}, Column: ${c}`); 
            } 
        
        matrix.push(row); 
        <Footer {...this.state} />
    } 
    
    return ( 
        <div className="grid"> 
            {matrix.map((row, rowIndex) => ( 
                <Row key={rowIndex}> 
                    {row.map(cellId => <Cell key={cellId} id={cellId}/>)} 
                </Row> 
            ))} 
        </div> 
    ); 
    } 
} 

export default Game;