import Row from "./Row";
import Cell from "./Cell";

class Game extends React.Component { 
    render() { 
        let matrix = [], row; 
        for (let r = 0; r < this.props.rows; r++) { 
            row = []; 
            for (let c = 0; c < this.props.columns; c++) { 
                row.push(`Row: ${r}, Column: ${c}`); 
            } 
            matrix.push(row); 
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