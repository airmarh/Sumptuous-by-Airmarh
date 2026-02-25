import { FaFacebook, FaTwitter, FaInstagram, FaReddit, FaYoutube } from 'react-icons/fa'

const ContactDetails = () => {
  return (
    <section id='contact'>
        <div className='bg3 text-gray-300 p-8 shadow-md space-y-10 text-center md:text-left'>
        
        <div>
            <h3 className='text-3xl font-bold'>Address</h3>
            <p>123, Abc Street, N-axis, Sample City, State, Country</p>
        </div>

        <div>
            <p>Call Us</p>
            <h3 className='text-3xl font-bold'>+0123-456-789</h3>
        </div>

        <div>
            <h3 className='text-3xl font-bold'>Open Time</h3>
            <p>Mon - Fri : 11:00 AM - 10:00 PM</p>
            <p>Sat - Sun : 09:00 AM - 11:00 PM</p>
        </div>

        <div>
            <h3 className='text-lg font-bold mb-2'>Stay Connected</h3>
            <div className='flex gap-4 justify-center md:justify-start'>
            <FaFacebook className='text-4xl text-white'/>
            <FaTwitter className='text-4xl text-white' />
            <FaInstagram className='text-4xl text-white' />
            <FaReddit className='text-4xl text-white' />
            <FaYoutube className='text-4xl text-white' />
            </div>
        </div>

        </div>
    </section>
  )
}

export default ContactDetails
