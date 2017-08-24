/** @jsx Inferno */
import Inferno from 'inferno'
import './LoadingPage.css'

const LoadingPage = ({ message }) => (
  <section className='LoadingPage'>
    { message }
  </section>
)

export default LoadingPage
