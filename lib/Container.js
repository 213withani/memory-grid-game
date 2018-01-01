import Game from "./Game";

class Container extends React.Component {
    render() {
        return (
            <div>
                <Game rows={5} columns={5} numberOfCellsToMemorize={6}/>
            </div>
        );
    }
}
export default Container;