/** @jsx Inferno */
import Inferno, { linkEvent } from 'inferno'
import { connect } from 'inferno-redux'
import { setPreference } from '../../actions'
import { languages, timezones, currencies } from './preferenceData'
import './Preferences.css'

const Preferences = props => (
  <section className='Preferences'>
    <div className='Preferences__Header'>Edit Preferences</div>
    <Localization {...props} />
    <Privacy {...props} />
  </section>
)

const Localization = ({ preferences, setPreference }) => (
  <div className='Preferences__Block'>
    <div className='Preferences__Block__Header'>
      Localization
    </div>
    <div className='Preferences__Block__Body'>
      <div className='Preferences__FormLabel'>Language</div>
      <div className='Preferences__FormField'>
        <SelectBox name='language' options={languages} selected={preferences.language} onSelect={setPreference} />
        <div className='Preferences__FormHelp'>
          Interested in helping translate Fancy? <a href='#'>Let us know</a>.
        </div>
      </div>

      <div className='Preferences__FormLabel'>Time zone</div>
      <div className='Preferences__FormField'>
        <SelectBox name='timezone' options={timezones} selected={preferences.timezone} onSelect={setPreference} />
      </div>

      <div className='Preferences__FormLabel'>Currency</div>
      <div className='Preferences__FormField'>
        <SelectBox name='currency' options={currencies} selected={preferences.currency} onSelect={setPreference} />
      </div>
    </div>
  </div>
)

const Privacy = ({ preferences, setPreference }) => (
  <div className='Preferences__Block'>
    <div className='Preferences__Block__Header'>
      Privacy
    </div>
    <div className='Preferences__Block__Body'>
      <div className='Preferences__FormLabel'>Profile visibility</div>
      <div className='Preferences__FormField'>
        <div className='Preferences__FormHelp'>
          Manage who can see your activity, things you fancy, your followers, people you follow or in anyone’s search results.
        </div>
        <Radio name='profileVisibility' value='everyone' checked={preferences.profileVisibility} onSelect={setPreference} />
        <span>Everyone</span>
        <Radio name='profileVisibility' value='private' checked={preferences.profileVisibility} onSelect={setPreference} />
        <span><i className='typcn typcn-lock-closed' /> Private</span>
      </div>
    </div>
  </div>
)

function handleUpdatePreference ({ name, onSelect }, event) {
  // console.log('name:', name, 'event:', event.target.value)
  onSelect(name, event.target.value)
}

const Radio = ({ name, value, checked, onSelect }) => (
  <input type='radio'
    name={name}
    value={value}
    checked={checked === value ? 'checked' : ''}
    onClick={linkEvent({ name, onSelect }, handleUpdatePreference)}
  />
)

const SelectBox = ({ name, options, selected, onSelect }) => (
  <select onChange={linkEvent({ name, onSelect }, handleUpdatePreference)}>
    {options.map(([value, key]) => (
      <option value={value} selected={selected === value ? 'selected' : ''}>{key}</option>
    ))}
  </select>
)

export default connect(
  ({ preferences }) => ({ preferences }),
  { setPreference }
)(Preferences)
