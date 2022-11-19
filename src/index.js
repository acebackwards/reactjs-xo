import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

class Board extends React.Component {
    renderSquare(i) {
        return <Square 
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
        />
    }

    render() {
        return (
            <div>
                <div className='board-row'>
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                </div>
            </div>
        )
    }
}

function Square (props) {
    return (
        <button 
        className='square' 
        onClick={props.onClick}
        >
            {props.value}
        </button>
    )
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true
        }
    }

    handleClick(i) {
        const history = this.state.history
        const current = history[history.length - 1]
        const squares = current.squares.slice()
        if (isWinner(squares) || squares[i]) {
            return
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext
        })
    }

    render () {
        const history = this.state.history
        const current = history[history.length - 1]
        const winner = isWinner(current.squares)
        let status
        if (winner) { 
            status = 'Winner is ' + winner
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`
        }

        return (
            <div className='game'>
                <div className='game-board'>
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className='game-info'>
                    <div>{status}</div>
                    <ol>todo...</ol>
                </div>
            </div>
        )
    }
}

function isWinner (squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            console.log(squares[a])
            return squares[a]
        }
    }
    return null
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Game />)