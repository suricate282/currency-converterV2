import './App.css';
import * as React from 'react'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstCurrency: 'RUB',
      secondCurrency: 'EUR',
      firstInputText: '',
      secondInputText: '',
    };
    this.swapCurrencies = this.swapCurrencies.bind(this)
    this.onButtonClick = this.onButtonClick.bind(this)

  }


  swapCurrencies() {
    this.setState((state) => ({
      firstCurrency: state.secondCurrency,
      secondCurrency: state.firstCurrency,
      secondInputText: '',
      errorText: ''
    }))
  }

  onButtonClick() {
    this.setState({
      errorText: ''
    })
    fetch('https://api.coinbase.com/v2/exchange-rates?currency=' + this.state.firstCurrency)
      .then(response => response.json())
      .then(data => {
        let newSecondText = parseFloat(this.state.firstInputText) * data.data.rates[this.state.secondCurrency]
        if (isNaN(newSecondText)) {
          this.setState({
            errorText: 'Error!'
          })
        } else {
          this.setState((state) => ({
            secondInputText: newSecondText
          }))
        }
      });
  }

  render() {
    return (
      <div className='container'>
        <h1>Currency converter</h1>
        <div className='eur-and-rb'>
          <div className='first-currency'>
            {this.state.firstCurrency}
          </div>
          <div
            className="arrows"
            onClick={this.swapCurrencies}
          >
            &#8644;
          </div>

          <div className='second-currency'>
            {this.state.secondCurrency}
          </div>
        </div>
        <div className='inputs'>
          <input
            value={this.state.firstInputText}
            onChange={(e) => { this.setState({ firstInputText: e.target.value }) }}
          />
          <input
            value={this.state.secondInputText}
            onChange={(e) => { this.setState({ secondInputText: e.target.value }) }}
          />
        </div>
        <div
          className='button-div'
          onClick={this.onButtonClick}
        >
          Convert
        </div>
        <div className='errorText'>
          {this.state.errorText}
        </div>
      </div>
    );
  }
}

export default App;
