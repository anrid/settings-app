/** @jsx Inferno */
import Inferno from 'inferno'
import './SideBar.css'

const SideBar = props => (
  <section className='SideBar'>
    <div className='SideBar__Item'><i className='typcn typcn-user-outline' /> Edit Profile</div>
    <div className='SideBar__Item SideBar__Item--Current'><i className='typcn typcn-news' /> Preferences</div>
    <div className='SideBar__Item'><i className='typcn typcn-key-outline' /> Password</div>
    <div className='SideBar__Item'><i className='typcn typcn-plug' /> Connected Accounts</div>

    <div className='SideBar__Divider' />

    <div className='SideBar__Item'><i className='typcn typcn-th-list-outline' /> Orders</div>
    <div className='SideBar__Item'><i className='typcn typcn-credit-card' /> Payment</div>
    <div className='SideBar__Item'><i className='typcn typcn-gift' /> Shipping</div>

    <div className='SideBar__Divider' />

    <div className='SideBar__Item'><i className='typcn typcn-group-outline' /> Credits & Referrals</div>
  </section>
)

export default SideBar
